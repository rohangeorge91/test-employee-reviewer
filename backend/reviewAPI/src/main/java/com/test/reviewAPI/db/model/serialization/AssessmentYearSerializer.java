package com.test.reviewAPI.db.model.serialization;

import java.io.IOException;
import org.springframework.boot.jackson.JsonComponent;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.test.reviewAPI.db.model.AssessmentYear;

@JsonComponent
public class AssessmentYearSerializer extends StdSerializer<AssessmentYear> {

  private static final long serialVersionUID = 1L;

  public AssessmentYearSerializer() {
    this(null);
  }
  
  public AssessmentYearSerializer(Class<AssessmentYear> t) {
    super(t);
  }

  @Override
  public void serialize(AssessmentYear value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {

      jgen.writeStartObject();
      jgen.writeStringField("year", value.getYear());
      
      jgen.writeEndObject();
  }

}
