package com.kt.hackathon.be.application.dto;

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
}
