package com.test.reviewAPI.interceptor;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.ws.rs.ext.Provider;
import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import org.glassfish.jersey.internal.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import com.text.reviewAPI.db.repository.MemberRepository;

@Provider
public class UserInterceptor implements ContainerRequestFilter {

  private static final String AUTHORIZATION_PROPERTY = "Authorization";
  private static final String AUTHENTICATION_SCHEME = "Basic";
  
  private static final Map<String, String> errorMap = Collections.singletonMap("message", "You cannot access this resource");
  
  @Context
  private ResourceInfo resourceInfo;
  
  @Autowired
  private MemberRepository memberRepository;

  /** If the response is successful then it add the system latency which was recorded. */
  @Override
  public void filter(ContainerRequestContext requestContext) throws IOException {
    Method method = resourceInfo.getResourceMethod();
    //Access denied for all
    if (method.isAnnotationPresent(DenyAll.class)) {
        requestContext.abortWith(Response.status(Response.Status.FORBIDDEN)
          .entity(errorMap).build());
        return;
    }
    //Access allowed for all
    if (method.isAnnotationPresent(PermitAll.class)) {
      return;
    }
    //Access custom role.
    if (method.isAnnotationPresent(RolesAllowed.class)) {
      final MultivaluedMap<String, String> headers = requestContext.getHeaders();
      
      //Fetch authorization header
      final List<String> authorization = headers.get(AUTHORIZATION_PROPERTY);
        
      //If no authorization information present; block access
      if (authorization == null || authorization.isEmpty()) {
          requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
            .entity(errorMap).build());
          return;
      }
      
      // simple validation password are not consider because that would involving hashing the password on the database
      // instead of storing raw-text and I am avoid this for now. But production needs a validation using hashed password.
      final String encodedUserId = authorization.get(0).replaceFirst(AUTHENTICATION_SCHEME + " ", "");
      String userId = new String(Base64.decode(encodedUserId.getBytes()));
  
      // if user not found handle it.
      if (!memberRepository.existsById(userId)) {
        requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
            .entity(errorMap).build());
          return;
      }
  
      String userRole = memberRepository.getOne(userId).getMemberRole().getRole();
      RolesAllowed rolesAnnotation = method.getAnnotation(RolesAllowed.class);
      Set<String> rolesSet = new HashSet<String>(Arrays.asList(rolesAnnotation.value()));
      if (!rolesSet.contains(userRole)) {
        requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
          .entity(errorMap).build());
        return;
      }
    }
  }
}
