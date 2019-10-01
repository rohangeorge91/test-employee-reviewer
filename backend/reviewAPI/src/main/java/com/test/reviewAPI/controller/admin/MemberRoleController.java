package com.test.reviewAPI.controller.admin;

import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.test.reviewAPI.db.model.MemberRole;
import com.text.reviewAPI.db.repository.MemberRoleRepository;

@Service
@Path("/admin/role")
public class MemberRoleController {

  @Autowired
  private MemberRoleRepository memberRoleRepository;
  
  @GET
  @Produces("application/json")
  public List<MemberRole> getAll() {
    return memberRoleRepository.findAll(new Sort(Sort.Direction.ASC, "role"));
  }
}
