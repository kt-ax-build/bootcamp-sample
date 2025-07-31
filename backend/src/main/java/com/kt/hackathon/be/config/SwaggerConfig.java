package com.kt.hackathon.be.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

  @Bean
  public OpenAPI openAPI() {
    return new OpenAPI()
        .info(
            new Info()
                .title("Hackathon API")
                .description("해커톤 애플리케이션 관리 API")
                .version("1.0.0")
                .contact(new Contact().name("KT Hackathon Team").email("hackathon@kt.com")));
  }
}
