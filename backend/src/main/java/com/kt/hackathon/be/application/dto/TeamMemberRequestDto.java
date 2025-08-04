package com.kt.hackathon.be.application.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamMemberRequestDto {

  private String teamName;
  private String teamSize;
  private String teamDescription;
  private String ideaTitle;
  private String ideaDescription;
  private String problemStatement;
  private String solutionApproach;
  private String techStack;

  // 팀원 정보를 배열로 관리
  private List<TeamMemberDto> members;

  @Getter
  @Setter
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class TeamMemberDto {
    private String name;
    private String email;
    private String phone;
    private String role;
    private String department;
    private String position;
    private Boolean isLeader;
  }
}
