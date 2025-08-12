package com.kt.hackathon.be.application.dto;

import java.util.List;

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
public class TeamDto {

  private Long id;

  @NotBlank(message = "팀명은 필수입니다")
  @Size(max = 100, message = "팀명은 100자 이하여야 합니다")
  private String name;

  @NotBlank(message = "팀 구성은 필수입니다")
  @Size(max = 50, message = "팀 구성은 50자 이하여야 합니다")
  private String composition;

  @NotBlank(message = "팀 소개는 필수입니다")
  @Size(max = 1000, message = "팀 소개는 1000자 이하여야 합니다")
  private String description;

  private List<TeamMemberDto> teamMembers;
}
