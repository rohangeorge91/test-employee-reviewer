package com.test.reviewAPI.controller.admin;

import java.io.Serializable;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.test.reviewAPI.db.model.Member;
import com.text.reviewAPI.db.repository.MemberRepository;

@Service
@Path("/login/user")
public class LoginController {

  @Autowired
  private MemberRepository memberRepository;

  @GET
  @Produces("application/json")
  @Path("{id}")
  public Map<String, Serializable> get(@PathParam("id") String userId) {
    Member member = memberRepository.getOne(userId);
    Map<String, Serializable> responseMap = new HashMap<String, Serializable>();
    responseMap.put("logged", true);
    responseMap.put("role", member.getMemberRole().getRole());
    return responseMap;
  }
}
