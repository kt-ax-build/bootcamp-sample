package com.kt.hackathon.be.application.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.kt.hackathon.be.application.dto.TeamMemberRequestDto;
import com.kt.hackathon.be.application.model.HackathonApplication;
import com.kt.hackathon.be.application.model.Team;
import com.kt.hackathon.be.application.model.TeamMember;
import com.kt.hackathon.be.application.repository.HackathonApplicationRepository;
import com.kt.hackathon.be.application.repository.TeamRepository;

@ExtendWith(MockitoExtension.class)
class HackathonServiceTest {

  @Mock private HackathonApplicationRepository applicationRepository;

  @Mock private TeamRepository teamRepository;

  @InjectMocks private HackathonService hackathonService;

  private TeamMemberRequestDto.TeamMemberDto memberDto;
  private TeamMemberRequestDto requestDto;
  private Team team;
  private TeamMember member;
  private HackathonApplication application;

  @BeforeEach
  void setUp() {
    // 팀원 DTO 설정
    memberDto =
        TeamMemberRequestDto.TeamMemberDto.builder()
            .name("김개발")
            .email("kim@test.com")
            .phone("010-1234-5678")
            .role("개발자")
            .department("개발팀")
            .position("팀원")
            .isLeader(true)
            .build();

    // 요청 DTO 설정
    requestDto =
        TeamMemberRequestDto.builder()
            .teamName("테스트팀")
            .teamSize("3")
            .teamDescription("테스트용 팀")
            .ideaTitle("AI 챗봇")
            .ideaDescription("AI 기반 고객 서비스 챗봇")
            .problemStatement("고객 문의 응답 시간이 오래 걸림")
            .solutionApproach("AI 챗봇으로 24시간 응답")
            .techStack("Python, TensorFlow, React")
            .members(Arrays.asList(memberDto))
            .build();

    // 팀 설정
    team = Team.builder().id(1L).teamName("테스트팀").teamSize("3").teamDescription("테스트용 팀").build();

    // 팀원 설정
    member =
        TeamMember.builder()
            .id(1L)
            .name("김개발")
            .email("kim@test.com")
            .phone("010-1234-5678")
            .role("개발자")
            .department("개발팀")
            .position("팀원")
            .isLeader(true)
            .team(team)
            .build();

    team.setMembers(new ArrayList<>(Arrays.asList(member)));

    // 애플리케이션 설정
    application =
        HackathonApplication.builder()
            .id(1L)
            .team(team)
            .ideaTitle("AI 챗봇")
            .ideaDescription("AI 기반 고객 서비스 챗봇")
            .problemStatement("고객 문의 응답 시간이 오래 걸림")
            .solutionApproach("AI 챗봇으로 24시간 응답")
            .techStack("Python, TensorFlow, React")
            .status(HackathonApplication.ApplicationStatus.PENDING)
            .build();
  }

  @Test
  @DisplayName("TC-BE-001: create - 새 팀 생성, app 저장 확인")
  void createApplication_NewTeam_Success() {
    // Given
    when(teamRepository.findByTeamName("테스트팀")).thenReturn(Optional.empty());
    when(teamRepository.save(any(Team.class))).thenReturn(team);
    when(applicationRepository.save(any(HackathonApplication.class))).thenReturn(application);

    // When
    HackathonApplication result = hackathonService.createApplication(requestDto);

    // Then
    assertNotNull(result);
    assertEquals("AI 챗봇", result.getIdeaTitle());
    assertEquals("AI 기반 고객 서비스 챗봇", result.getIdeaDescription());
    assertEquals(HackathonApplication.ApplicationStatus.PENDING, result.getStatus());
    assertNotNull(result.getTeam());
    assertEquals("테스트팀", result.getTeam().getTeamName());

    verify(teamRepository).findByTeamName("테스트팀");
    verify(teamRepository).save(any(Team.class));
    verify(applicationRepository).save(any(HackathonApplication.class));
  }

  @Test
  @DisplayName("TC-BE-002: create - 기존 팀 재사용(팀 save 미호출)")
  void createApplication_ExistingTeam_ReuseTeam() {
    // Given
    when(teamRepository.findByTeamName("테스트팀")).thenReturn(Optional.of(team));
    when(applicationRepository.save(any(HackathonApplication.class))).thenReturn(application);

    // When
    HackathonApplication result = hackathonService.createApplication(requestDto);

    // Then
    assertNotNull(result);
    assertEquals("테스트팀", result.getTeam().getTeamName());

    verify(teamRepository).findByTeamName("테스트팀");
    verify(teamRepository, never()).save(any(Team.class));
    verify(applicationRepository).save(any(HackathonApplication.class));
  }

  @Test
  @DisplayName("TC-BE-003: create - members=null → 빈 리스트 허용")
  void createApplication_MembersNull_EmptyListAllowed() {
    // Given
    requestDto.setMembers(null);
    when(teamRepository.findByTeamName("테스트팀")).thenReturn(Optional.empty());
    when(teamRepository.save(any(Team.class))).thenReturn(team);
    when(applicationRepository.save(any(HackathonApplication.class))).thenReturn(application);

    // When
    HackathonApplication result = hackathonService.createApplication(requestDto);

    // Then
    assertNotNull(result);
    assertNotNull(result.getTeam());
    assertTrue(result.getTeam().getMembers().isEmpty());

    verify(teamRepository).findByTeamName("테스트팀");
    verify(teamRepository).save(any(Team.class));
    verify(applicationRepository).save(any(HackathonApplication.class));
  }

  @Test
  @DisplayName("TC-BE-004: list - teamName → findByTeamTeamName")
  void getApplications_ByTeamName_CallsFindByTeamTeamName() {
    // Given
    List<HackathonApplication> expectedApplications = Arrays.asList(application);
    when(applicationRepository.findByTeamTeamName("테스트팀")).thenReturn(expectedApplications);

    // When
    List<HackathonApplication> result = hackathonService.getApplications("테스트팀", null);

    // Then
    assertNotNull(result);
    assertEquals(1, result.size());
    assertEquals("테스트팀", result.get(0).getTeam().getTeamName());

    verify(applicationRepository).findByTeamTeamName("테스트팀");
    verify(applicationRepository, never()).findByTeamMembersName(anyString());
    verify(applicationRepository, never()).findByTeamMembersEmail(anyString());
    verify(applicationRepository, never()).findAll();
  }

  @Test
  @DisplayName("TC-BE-005: list - memberName(이름) → findByTeamMembersName")
  void getApplications_ByMemberName_CallsFindByTeamMembersName() {
    // Given
    List<HackathonApplication> expectedApplications = Arrays.asList(application);
    when(applicationRepository.findByTeamMembersName("김개발")).thenReturn(expectedApplications);

    // When
    List<HackathonApplication> result = hackathonService.getApplications(null, "김개발");

    // Then
    assertNotNull(result);
    assertEquals(1, result.size());

    verify(applicationRepository, never()).findByTeamTeamName(anyString());
    verify(applicationRepository).findByTeamMembersName("김개발");
    verify(applicationRepository, never()).findByTeamMembersEmail(anyString());
    verify(applicationRepository, never()).findAll();
  }

  @Test
  @DisplayName("TC-BE-006: list - memberName(이메일) → findByTeamMembersEmail")
  void getApplications_ByMemberEmail_CallsFindByTeamMembersEmail() {
    // Given
    List<HackathonApplication> expectedApplications = Arrays.asList(application);
    when(applicationRepository.findByTeamMembersEmail("kim@test.com"))
        .thenReturn(expectedApplications);

    // When
    List<HackathonApplication> result = hackathonService.getApplications(null, "kim@test.com");

    // Then
    assertNotNull(result);
    assertEquals(1, result.size());

    verify(applicationRepository, never()).findByTeamTeamName(anyString());
    verify(applicationRepository, never()).findByTeamMembersName(anyString());
    verify(applicationRepository).findByTeamMembersEmail("kim@test.com");
    verify(applicationRepository, never()).findAll();
  }

  @Test
  @DisplayName("TC-BE-007: list - 필터 없음 → findAll")
  void getApplications_NoFilter_CallsFindAll() {
    // Given
    List<HackathonApplication> expectedApplications = Arrays.asList(application);
    when(applicationRepository.findAll()).thenReturn(expectedApplications);

    // When
    List<HackathonApplication> result = hackathonService.getApplications(null, null);

    // Then
    assertNotNull(result);
    assertEquals(1, result.size());

    verify(applicationRepository, never()).findByTeamTeamName(anyString());
    verify(applicationRepository, never()).findByTeamMembersName(anyString());
    verify(applicationRepository, never()).findByTeamMembersEmail(anyString());
    verify(applicationRepository).findAll();
  }

  @Test
  @DisplayName("TC-BE-008: list - 공백 문자열 → 전체 조회")
  void getApplications_EmptyString_CallsFindAll() {
    // Given
    List<HackathonApplication> expectedApplications = Arrays.asList(application);
    when(applicationRepository.findAll()).thenReturn(expectedApplications);

    // When
    List<HackathonApplication> result = hackathonService.getApplications("   ", "   ");

    // Then
    assertNotNull(result);
    assertEquals(1, result.size());

    verify(applicationRepository, never()).findByTeamTeamName(anyString());
    verify(applicationRepository, never()).findByTeamMembersName(anyString());
    verify(applicationRepository, never()).findByTeamMembersEmail(anyString());
    verify(applicationRepository).findAll();
  }

  @Test
  @DisplayName("TC-BE-009: list - 예외 발생 → 빈 리스트")
  void getApplications_Exception_ReturnsEmptyList() {
    // Given
    when(applicationRepository.findAll()).thenThrow(new RuntimeException("Database error"));

    // When
    List<HackathonApplication> result = hackathonService.getApplications(null, null);

    // Then
    assertNotNull(result);
    assertTrue(result.isEmpty());

    verify(applicationRepository).findAll();
  }

  @Test
  @DisplayName("TC-BE-010: get - 존재하는 ID")
  void getApplication_ExistingId_ReturnsApplication() {
    // Given
    when(applicationRepository.findById(1L)).thenReturn(Optional.of(application));

    // When
    HackathonApplication result = hackathonService.getApplication(1L);

    // Then
    assertNotNull(result);
    assertEquals(1L, result.getId());
    assertEquals("AI 챗봇", result.getIdeaTitle());

    verify(applicationRepository).findById(1L);
  }

  @Test
  @DisplayName("TC-BE-011: get - 미존재 ID → RuntimeException")
  void getApplication_NonExistingId_ThrowsRuntimeException() {
    // Given
    when(applicationRepository.findById(999L)).thenReturn(Optional.empty());

    // When & Then
    RuntimeException exception =
        assertThrows(
            RuntimeException.class,
            () -> {
              hackathonService.getApplication(999L);
            });

    assertEquals("Application not found with id: 999", exception.getMessage());
    verify(applicationRepository).findById(999L);
  }

  @Test
  @DisplayName("TC-BE-012: update - teamName 제공 시 기존 팀 재사용, 팀원 교체")
  void updateApplication_WithTeamName_ReuseExistingTeam() {
    // Given
    Team existingTeam = Team.builder().id(2L).teamName("기존팀").build();
    when(applicationRepository.findById(1L)).thenReturn(Optional.of(application));
    when(teamRepository.findByTeamName("기존팀")).thenReturn(Optional.of(existingTeam));
    when(applicationRepository.save(any(HackathonApplication.class))).thenReturn(application);

    TeamMemberRequestDto updateRequest =
        TeamMemberRequestDto.builder()
            .teamName("기존팀")
            .ideaTitle("수정된 아이디어")
            .members(Arrays.asList(memberDto))
            .build();

    // When
    HackathonApplication result = hackathonService.updateApplication(1L, updateRequest);

    // Then
    assertNotNull(result);
    verify(teamRepository).findByTeamName("기존팀");
    verify(teamRepository, never()).save(any(Team.class));
    verify(applicationRepository).save(any(HackathonApplication.class));
  }

  @Test
  @DisplayName("TC-BE-013: update - teamName 미제공 시 구성/팀원만 갱신")
  void updateApplication_WithoutTeamName_UpdateOnlyTeamInfo() {
    // Given
    when(applicationRepository.findById(1L)).thenReturn(Optional.of(application));
    when(applicationRepository.save(any(HackathonApplication.class))).thenReturn(application);

    TeamMemberRequestDto updateRequest =
        TeamMemberRequestDto.builder()
            .teamSize("5")
            .teamDescription("수정된 팀 설명")
            .ideaTitle("수정된 아이디어")
            .members(Arrays.asList(memberDto))
            .build();

    // When
    HackathonApplication result = hackathonService.updateApplication(1L, updateRequest);

    // Then
    assertNotNull(result);
    verify(teamRepository, never()).findByTeamName(anyString());
    verify(teamRepository, never()).save(any(Team.class));
    verify(applicationRepository).save(any(HackathonApplication.class));
  }

  @Test
  @DisplayName("TC-BE-014: delete - deleteById 호출")
  void deleteApplication_CallsDeleteById() {
    // Given
    doNothing().when(applicationRepository).deleteById(1L);

    // When
    hackathonService.deleteApplication(1L);

    // Then
    verify(applicationRepository).deleteById(1L);
  }
}
