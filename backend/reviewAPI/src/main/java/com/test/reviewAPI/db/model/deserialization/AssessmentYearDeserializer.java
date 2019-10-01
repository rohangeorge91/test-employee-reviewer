package com.test.reviewAPI.db.model.deserialization;

import java.io.IOException;
import org.springframework.boot.jackson.JsonComponent;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.test.reviewAPI.db.model.AssessmentYear;

@JsonComponent
public class AssessmentYearDeserializer extends StdDeserializer<AssessmentYear> {

  private static final long serialVersionUID = 1L;

  public AssessmentYearDeserializer() { 
    this(null); 
  } 
  
  public AssessmentYearDeserializer(Class<?> vc) { 
      super(vc); 
  }
  
  @Override
  public AssessmentYear deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
      JsonNode node = jp.getCodec().readTree(jp);
      AssessmentYear assessmentYear = new AssessmentYear();
      assessmentYear.setYear(node.get("year").textValue());
      
      return assessmentYear;
  }
}
