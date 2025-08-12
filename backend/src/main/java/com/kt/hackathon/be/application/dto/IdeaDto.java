package com.kt.hackathon.be.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IdeaDto {

  private Long id;

  @NotBlank(message = "아이디어 제목은 필수입니다")
  @Size(max = 200, message = "아이디어 제목은 200자 이하여야 합니다")
  private String title;

  @NotBlank(message = "해결하고자 하는 문제는 필수입니다")
  @Size(max = 300, message = "해결하고자 하는 문제는 300자 이하여야 합니다")
  private String problem;

  @NotBlank(message = "솔루션 접근 방법은 필수입니다")
  @Size(max = 500, message = "솔루션 접근 방법은 500자 이하여야 합니다")
  private String solution;

  @Size(max = 500, message = "기술스택은 500자 이하여야 합니다")
  private String techStack;
}
