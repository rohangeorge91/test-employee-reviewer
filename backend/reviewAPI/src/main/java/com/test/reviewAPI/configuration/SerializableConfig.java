package com.test.reviewAPI.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.test.reviewAPI.db.model.Member;
import com.test.reviewAPI.db.model.deserialization.MemberDeserializer;
import com.test.reviewAPI.db.model.serialization.MemberSerializer;

@Configuration
public class SerializableConfig {
  private static final ObjectMapper mapper = new ObjectMapper();
  
  @Bean("flatMapper")
  public ObjectMapper getSimpleObjectMapper() {
    SimpleModule module = new SimpleModule();
    module.addSerializer(Member.class, new MemberSerializer());
    module.addDeserializer(Member.class, new MemberDeserializer());
    mapper.registerModule(module);
    
    return mapper;
  }
}
