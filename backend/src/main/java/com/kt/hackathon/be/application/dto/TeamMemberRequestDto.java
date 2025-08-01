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
  private String memberName;
  private String email;
  private String phone;
  private String role;
  private String ideaTitle;
  private String ideaDescription;
  private String department;
  private String position;
  private Boolean isLeader;

  // 추가 팀원 정보를 위한 필드들
  private List<TeamMemberDto> additionalMembers;
  private String problemStatement;
  private String solutionApproach;
  private String techStack;

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
