package com.test.reviewAPI.db.model.serialization;

import java.io.IOException;
import org.springframework.boot.jackson.JsonComponent;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.test.reviewAPI.db.model.Member;

@JsonComponent
public class MemberSerializer extends StdSerializer<Member> {

  private static final long serialVersionUID = 1L;

  public MemberSerializer() {
    this(null);
  }
  
  public MemberSerializer(Class<Member> t) {
    super(t);
  }

  @Override
  public void serialize(Member value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {

      jgen.writeStartObject();
      jgen.writeStringField("userId", value.getUserId());
      jgen.writeStringField("name", value.getName());
      jgen.writeStringField("role", value.getMemberRole().getRole());
      
      jgen.writeEndObject();
  }

}
