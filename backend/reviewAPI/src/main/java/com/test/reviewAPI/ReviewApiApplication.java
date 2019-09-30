package com.test.reviewAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.text.reviewAPI.db.repository")
public class ReviewApiApplication {

  public static void main(String[] args) {
    SpringApplication.run(ReviewApiApplication.class, args);
  }

}
