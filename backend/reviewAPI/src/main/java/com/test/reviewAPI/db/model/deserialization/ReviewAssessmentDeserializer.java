package com.test.reviewAPI.db.model.deserialization;

import java.io.IOException;
import org.springframework.boot.jackson.JsonComponent;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.test.reviewAPI.db.model.AssessmentYear;
import com.test.reviewAPI.db.model.Member;
import com.test.reviewAPI.db.model.ReviewAssessment;

@JsonComponent
public class ReviewAssessmentDeserializer extends StdDeserializer<ReviewAssessment> {

  private static final long serialVersionUID = 1L;

  public ReviewAssessmentDeserializer() { 
    this(null); 
  } 
  
  public ReviewAssessmentDeserializer(Class<?> vc) { 
      super(vc); 
  }
  
  @Override
  public ReviewAssessment deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
      JsonNode node = jp.getCodec().readTree(jp);
      ReviewAssessment reviewAssessment = new ReviewAssessment();
      
      reviewAssessment.setId(node.get("id").longValue());
      
      Member reviewee = new Member();
      reviewee.setUserId(node.get("reviewee").get("userId").textValue());
      
      Member reviewer = new Member();
      reviewer.setUserId(node.get("reviewer").get("userId").textValue());
      
      reviewAssessment.setMember1(reviewee);
      reviewAssessment.setMember2(reviewer);
      
      AssessmentYear year = new AssessmentYear();
      
      year.setYear(node.get("assessmentYear").textValue());
      reviewAssessment.setAssessmentYearBean(year);
      
      reviewAssessment.setSummary(node.get("summary").textValue());
      return reviewAssessment;
  }
}
