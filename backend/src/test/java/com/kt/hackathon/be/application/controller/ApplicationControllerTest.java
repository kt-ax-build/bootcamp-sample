package com.kt.hackathon.be.application.controller;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.kt.hackathon.be.application.dto.*;
import com.kt.hackathon.be.application.model.HackathonApplication;
import com.kt.hackathon.be.application.service.ApplicationService;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(ApplicationController.class)
class ApplicationControllerTest {

  @Autowired private MockMvc mockMvc;

  @MockBean private ApplicationService applicationService;

  @Autowired private ObjectMapper objectMapper;

  private ApplicationRequestDto requestDto;
  private ApplicationResponseDto responseDto;
  private TeamNameCheckResponseDto teamNameCheckResponseDto;

  @BeforeEach
  void setUp() {
    // 팀원 정보 생성
    TeamMemberDto teamMemberDto =
        TeamMemberDto.builder()
            .name("홍길동")
            .email("hong@example.com")
            .department("개발팀")
            .position("개발자")
            .isLeader(true)
            .build();

    // 팀 정보 생성
    TeamDto teamDto =
        TeamDto.builder()
            .name("AI 팀")
            .composition("2명")
            .description("AI 개발에 열정을 가진 팀입니다.")
            .teamMembers(Arrays.asList(teamMemberDto))
            .build();

    // 아이디어 정보 생성
    IdeaDto ideaDto =
        IdeaDto.builder()
            .title("AI 기반 일정 관리 시스템")
            .problem("바쁜 현대인들의 효율적인 일정 관리를 위한 솔루션이 필요합니다.")
            .solution("AI를 활용하여 사용자의 패턴을 학습하고 최적의 일정을 제안하는 시스템을 개발합니다.")
            .techStack("Python, TensorFlow, React, Node.js")
            .build();

    // 요청 DTO 생성
    requestDto =
        ApplicationRequestDto.builder()
            .teamInfo(teamDto)
            .teamMembers(Arrays.asList(teamMemberDto))
            .ideaInfo(ideaDto)
            .build();

    // 응답 DTO 생성
    responseDto =
        ApplicationResponseDto.builder()
            .id(1L)
            .teamInfo(teamDto)
            .ideaInfo(ideaDto)
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .status(HackathonApplication.ApplicationStatus.SUBMITTED)
            .build();

    // 팀명 중복 확인 응답 DTO 생성
    teamNameCheckResponseDto =
        TeamNameCheckResponseDto.builder().isAvailable(true).message("사용 가능한 팀명입니다.").build();
  }

  @Test
  void checkTeamName_ShouldReturnSuccess() throws Exception {
    when(applicationService.checkTeamName("AI 팀")).thenReturn(teamNameCheckResponseDto);

    mockMvc
        .perform(get("/api/hackathon/v1/applications/check-team-name").param("teamName", "AI 팀"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.successOrNot").value(true))
        .andExpect(jsonPath("$.statusCode").value("200"))
        .andExpect(jsonPath("$.data.isAvailable").value(true))
        .andExpect(jsonPath("$.data.message").value("사용 가능한 팀명입니다."));
  }

  @Test
  void createApplication_ShouldReturnCreated() throws Exception {
    when(applicationService.createApplication(any(ApplicationRequestDto.class)))
        .thenReturn(responseDto);

    mockMvc
        .perform(
            post("/api/hackathon/v1/applications")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDto)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.successOrNot").value(true))
        .andExpect(jsonPath("$.statusCode").value("201"))
        .andExpect(jsonPath("$.data.id").value(1))
        .andExpect(jsonPath("$.data.teamInfo.name").value("AI 팀"))
        .andExpect(jsonPath("$.data.ideaInfo.title").value("AI 기반 일정 관리 시스템"));
  }

  @Test
  void getApplications_ShouldReturnList() throws Exception {
    List<ApplicationResponseDto> applications = Arrays.asList(responseDto);
    when(applicationService.getApplications()).thenReturn(applications);

    mockMvc
        .perform(get("/api/hackathon/v1/applications"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.successOrNot").value(true))
        .andExpect(jsonPath("$.statusCode").value("200"))
        .andExpect(jsonPath("$.data").isArray())
        .andExpect(jsonPath("$.data[0].id").value(1));
  }

  @Test
  void getApplication_ShouldReturnApplication() throws Exception {
    when(applicationService.getApplication(1L)).thenReturn(responseDto);

    mockMvc
        .perform(get("/api/hackathon/v1/applications/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.successOrNot").value(true))
        .andExpect(jsonPath("$.statusCode").value("200"))
        .andExpect(jsonPath("$.data.id").value(1));
  }

  @Test
  void updateApplication_ShouldReturnUpdated() throws Exception {
    when(applicationService.updateApplication(eq(1L), any(ApplicationRequestDto.class)))
        .thenReturn(responseDto);

    mockMvc
        .perform(
            put("/api/hackathon/v1/applications/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.successOrNot").value(true))
        .andExpect(jsonPath("$.statusCode").value("200"))
        .andExpect(jsonPath("$.data.id").value(1));
  }

  @Test
  void deleteApplication_ShouldReturnNoContent() throws Exception {
    mockMvc.perform(delete("/api/hackathon/v1/applications/1")).andExpect(status().isNoContent());
  }

  @Test
  void createApplication_WithInvalidData_ShouldReturnBadRequest() throws Exception {
    // 잘못된 요청 데이터 (팀명이 비어있음)
    ApplicationRequestDto invalidRequest =
        ApplicationRequestDto.builder()
            .teamInfo(
                TeamDto.builder()
                    .name("") // 빈 팀명
                    .composition("2명")
                    .description("팀 설명")
                    .teamMembers(Arrays.asList())
                    .build())
            .teamMembers(Arrays.asList())
            .ideaInfo(IdeaDto.builder().title("").problem("").solution("").build())
            .build();

    mockMvc
        .perform(
            post("/api/hackathon/v1/applications")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
        .andExpect(status().isBadRequest());
  }
}
