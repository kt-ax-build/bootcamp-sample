package com.kt.hackathon.be.application.dto;

import java.time.LocalDateTime;

import com.kt.hackathon.be.application.model.HackathonApplication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationResponseDto {

  private Long id;
  private TeamDto teamInfo;
  private IdeaDto ideaInfo;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private HackathonApplication.ApplicationStatus status;
}
