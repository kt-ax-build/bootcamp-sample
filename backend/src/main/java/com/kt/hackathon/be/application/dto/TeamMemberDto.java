package com.kt.hackathon.be.application.dto;

import jakarta.validation.constraints.Email;
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
public class TeamMemberDto {

  private Long id;

  @NotBlank(message = "이름은 필수입니다")
  @Size(min = 2, max = 20, message = "이름은 2자 이상 20자 이하여야 합니다")
  private String name;

  @NotBlank(message = "이메일은 필수입니다")
  @Email(message = "올바른 이메일 형식이 아닙니다")
  private String email;

  @NotBlank(message = "소속 부서는 필수입니다")
  @Size(max = 100, message = "소속 부서는 100자 이하여야 합니다")
  private String department;

  @Size(max = 100, message = "직급/직책은 100자 이하여야 합니다")
  private String position;

  private Boolean isLeader;
}
