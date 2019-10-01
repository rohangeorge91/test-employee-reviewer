package com.test.reviewAPI.db.model.serialization;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.test.reviewAPI.db.model.ReviewAssessment;

public class ReviewAssessmentSerializer extends StdSerializer<ReviewAssessment> {

  private static final long serialVersionUID = 1L;

  public ReviewAssessmentSerializer() {
    this(null);
  }

  public ReviewAssessmentSerializer(Class<ReviewAssessment> t) {
    super(t);
  }

  @Override
  public void serialize(ReviewAssessment value, JsonGenerator jgen, SerializerProvider provider)
      throws IOException, JsonProcessingException {

    jgen.writeStartObject();
    jgen.writeNumberField("id", value.getId());

    Map<String, String> reviewee = new HashMap<String, String>();
    reviewee.put("userId", value.getMember1().getUserId());
    reviewee.put("name", value.getMember1().getName());

    jgen.writeObjectField("reviewee", reviewee);

    Map<String, String> reviewer = new HashMap<String, String>();
    reviewer.put("userId", value.getMember2().getUserId());
    reviewer.put("name", value.getMember2().getName());

    jgen.writeObjectField("reviewer", reviewer);

    jgen.writeStringField("assessmentYear", value.getAssessmentYearBean().getYear());
    jgen.writeStringField("summary", value.getSummary());

    jgen.writeEndObject();

  }

}
