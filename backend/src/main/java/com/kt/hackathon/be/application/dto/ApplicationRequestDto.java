package com.kt.hackathon.be.application.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequestDto {

  @Valid
  @NotNull(message = "팀 정보는 필수입니다")
  private TeamDto teamInfo;

  @Valid
  @NotNull(message = "팀원 정보는 필수입니다")
  @Size(min = 1, max = 4, message = "팀원은 1명 이상 4명 이하여야 합니다")
  private List<TeamMemberDto> teamMembers;

  @Valid
  @NotNull(message = "아이디어 정보는 필수입니다")
  private IdeaDto ideaInfo;
}
