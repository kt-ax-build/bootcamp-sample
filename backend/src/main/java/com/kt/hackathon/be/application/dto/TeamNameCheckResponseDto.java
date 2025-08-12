package com.kt.hackathon.be.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamNameCheckResponseDto {

  private Boolean isAvailable;
  private String message;
}
