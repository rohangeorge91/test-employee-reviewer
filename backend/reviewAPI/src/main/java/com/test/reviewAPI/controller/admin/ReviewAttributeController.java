package com.test.reviewAPI.controller.admin;

import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
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
import com.test.reviewAPI.db.model.ReviewAssessment;
import com.text.reviewAPI.db.repository.ReviewAttributeRepository;

@Service
@Path("/admin/review/attributes")
public class ReviewAttributeController {
  @Autowired
  private ReviewAttributeRepository reviewAttributeRepository;
  
  @GET
  @Produces("application/json")
  @RolesAllowed({"admin"})
  public List<ReviewAssessment> getAll() {
    return reviewAttributeRepository.findAll(new Sort(Sort.Direction.ASC, "name"));  
  }

  @GET
  @Produces("application/json")
  @RolesAllowed({"admin"})
  @Path("{id}")
  public ReviewAssessment get(@PathParam("id") String name) {
    return reviewAttributeRepository.getOne(name);
  }
  
  @POST
  @Consumes("application/json")
  @Produces("application/json")
  @RolesAllowed({"admin"})
  public ReviewAssessment create(ReviewAssessment reviewAssessment) {
    return reviewAttributeRepository.saveAndFlush(reviewAssessment);
  }

  @PUT
  @Consumes("application/json")
  @Produces("application/json")
  @RolesAllowed({"admin"})
  public ReviewAssessment update(ReviewAssessment reviewAssessment) {
    return reviewAttributeRepository.saveAndFlush(reviewAssessment);
  }
  
  @DELETE
  @RolesAllowed({"admin"})
  @Path("{id}")
  public void delete(@PathParam("id") String name) {
    ReviewAssessment reviewAssessment = reviewAttributeRepository.getOne(name);
    reviewAttributeRepository.delete(reviewAssessment);
  }
}
