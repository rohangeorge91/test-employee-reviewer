package com.test.reviewAPI.controller.admin;

import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.test.reviewAPI.db.model.Member;
import com.text.reviewAPI.db.repository.MemberRepository;

@Service
@Path("/admin/users")
public class MemberManagementController {
  
  @Autowired
  private MemberRepository memberRepository;
  
  @GET
  @Produces("application/json")
  @RolesAllowed({"admin"})
  public List<Member> getAll() {
    return memberRepository.findAll(new Sort(Sort.Direction.ASC, "userId"));  
  }

  @GET
  @Produces("application/json")
  @RolesAllowed({"admin"})
  @Path("{id}")
  public Member get(@PathParam("id") String userId) {
    return memberRepository.getOne(userId);
  }
  
  @POST
  @Produces("application/json")
  @RolesAllowed({"admin"})
  public Member create(Member member) {
    return memberRepository.saveAndFlush(member);
  }

  @PUT
  @Produces("application/json")
  @RolesAllowed({"admin"})
  public Member update(Member member) {
    return memberRepository.saveAndFlush(member);
  }
  
  @DELETE
  @RolesAllowed({"admin"})
  @Path("{id}")
  public void delete(@PathParam("id") String memberId) {
    Member member = memberRepository.getOne(memberId);
    memberRepository.delete(member);
  }
}
