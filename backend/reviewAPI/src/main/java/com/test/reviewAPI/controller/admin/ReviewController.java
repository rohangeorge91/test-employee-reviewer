package com.test.reviewAPI.controller.admin;

import java.io.IOException;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.reviewAPI.db.model.ReviewAssessment;
import com.text.reviewAPI.db.repository.ReviewAssessmentRepository;

@Service
@Path("/admin/reviews")
public class ReviewController {
  @Autowired
  private ReviewAssessmentRepository reviewAssessmentRepository;
  
  @Qualifier("nestedMapper")
  @Autowired
  private ObjectMapper nestedMapper;
  
  @GET
  @Produces("application/json")
  @RolesAllowed({"admin"})
  public JsonNode getAll() throws IOException {
    List<ReviewAssessment> reviews = reviewAssessmentRepository.findAll(new Sort(Sort.Direction.ASC, "id"));
    String jsonString = nestedMapper.writeValueAsString(reviews);
    return nestedMapper.readTree(jsonString);  
  }
}
