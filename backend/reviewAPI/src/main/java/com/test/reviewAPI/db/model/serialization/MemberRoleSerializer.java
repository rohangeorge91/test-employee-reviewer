package com.test.reviewAPI.db.model.serialization;

import java.io.IOException;
import org.springframework.boot.jackson.JsonComponent;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.test.reviewAPI.db.model.MemberRole;

@JsonComponent
public class MemberRoleSerializer extends StdSerializer<MemberRole> {

  private static final long serialVersionUID = 1L;

  public MemberRoleSerializer() {
    this(null);
  }
  
  public MemberRoleSerializer(Class<MemberRole> t) {
    super(t);
  }

  @Override
  public void serialize(MemberRole value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {

      jgen.writeStartObject();
      jgen.writeStringField("role", value.getRole());
      
      jgen.writeEndObject();
  }

}
