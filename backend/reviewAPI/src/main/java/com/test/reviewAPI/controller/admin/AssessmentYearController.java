package com.test.reviewAPI.controller.admin;

import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.test.reviewAPI.db.model.AssessmentYear;
import com.text.reviewAPI.db.repository.AssessmentYearRepository;

@Service
@Path("/admin/year")
public class AssessmentYearController {

  @Autowired
  private AssessmentYearRepository assessmentYearRepository;
  
  @GET
  @Produces("application/json")
  public List<AssessmentYear> getAll() {
    return assessmentYearRepository.findAll(new Sort(Sort.Direction.ASC, "year"));
  }
}
