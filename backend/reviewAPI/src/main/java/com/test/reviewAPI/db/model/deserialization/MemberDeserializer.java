package com.test.reviewAPI.db.model.deserialization;

import java.io.IOException;
import org.springframework.boot.jackson.JsonComponent;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.test.reviewAPI.db.model.Member;
import com.test.reviewAPI.db.model.MemberRole;

@JsonComponent
public class MemberDeserializer extends StdDeserializer<Member> {

  private static final long serialVersionUID = 1L;

  public MemberDeserializer() { 
    this(null); 
  } 
  
  public MemberDeserializer(Class<?> vc) { 
      super(vc); 
  }
  
  @Override
  public Member deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
      JsonNode node = jp.getCodec().readTree(jp);
      Member member = new Member();
      MemberRole role = new MemberRole();
      role.setRole(node.get("role").textValue());
      
      member.setMemberRole(role);
      member.setName(node.get("name").textValue());
      member.setUserId(node.get("userId").textValue());
      
      return member;
  }
}
