package com.kt.hackathon.be;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.kt.hackathon.be.application.dto.TeamMemberRequestDto;
import com.kt.hackathon.be.application.model.HackathonApplication;
import com.kt.hackathon.be.application.model.Team;
import com.kt.hackathon.be.application.repository.HackathonApplicationRepository;
import com.kt.hackathon.be.application.repository.TeamRepository;
import com.kt.hackathon.be.application.service.HackathonService;

@ExtendWith(MockitoExtension.class)
class HackathonServiceTest {

  @Mock private TeamRepository teamRepository;

  @Mock private HackathonApplicationRepository applicationRepository;

  @InjectMocks private HackathonService hackathonService;

  private TeamMemberRequestDto requestDto;
  private Team team;
  private HackathonApplication application;

  @BeforeEach
  void setUp() {
    // 팀원 정보 생성
    TeamMemberRequestDto.TeamMemberDto leaderDto =
        TeamMemberRequestDto.TeamMemberDto.builder()
            .name("홍길동")
            .email("hong@test.com")
            .phone("010-1234-5678")
            .role("팀장")
            .department("개발팀")
            .position("개발자")
            .isLeader(true)
            .build();

    TeamMemberRequestDto.TeamMemberDto memberDto =
        TeamMemberRequestDto.TeamMemberDto.builder()
            .name("김철수")
            .email("kim@test.com")
            .phone("010-2345-6789")
            .role("개발자")
            .department("개발팀")
            .position("개발자")
            .isLeader(false)
            .build();

    requestDto =
        TeamMemberRequestDto.builder()
            .teamName("테스트팀")
            .teamSize("2")
            .teamDescription("AI 개발 전문팀")
            .ideaTitle("AI 챗봇")
            .ideaDescription("AI 기반 고객 서비스 챗봇")
            .problemStatement("고객 문의 응답 지연 문제")
            .solutionApproach("AI 기술을 활용한 자동 응답 시스템")
            .techStack("Python, TensorFlow, React")
            .members(List.of(leaderDto, memberDto))
            .build();

    team =
        Team.builder().id(1L).teamName("테스트팀").teamSize("2").teamDescription("AI 개발 전문팀").build();

    application =
        HackathonApplication.builder()
            .id(1L)
            .team(team)
            .ideaTitle("AI 챗봇")
            .ideaDescription("AI 기반 고객 서비스 챗봇")
            .problemStatement("고객 문의 응답 지연 문제")
            .solutionApproach("AI 기술을 활용한 자동 응답 시스템")
            .techStack("Python, TensorFlow, React")
            .status(HackathonApplication.ApplicationStatus.PENDING)
            .build();
  }

  @Test
  void createApplication_새로운팀으로생성_성공() {
    // given
    when(teamRepository.findByTeamName("테스트팀")).thenReturn(Optional.empty());
    when(teamRepository.save(any(Team.class))).thenReturn(team);
    when(applicationRepository.save(any(HackathonApplication.class))).thenReturn(application);

    // when
    HackathonApplication result = hackathonService.createApplication(requestDto);

    // then
    assertNotNull(result);
    assertEquals("테스트팀", result.getTeam().getTeamName());
    assertEquals("AI 챗봇", result.getIdeaTitle());
    assertEquals("고객 문의 응답 지연 문제", result.getProblemStatement());
    assertEquals("AI 기술을 활용한 자동 응답 시스템", result.getSolutionApproach());
    assertEquals("Python, TensorFlow, React", result.getTechStack());
    assertEquals(HackathonApplication.ApplicationStatus.PENDING, result.getStatus());

    verify(teamRepository).findByTeamName("테스트팀");
    verify(teamRepository).save(any(Team.class));
    verify(applicationRepository).save(any(HackathonApplication.class));
  }

  @Test
  void createApplication_기존팀으로생성_성공() {
    // given
    when(teamRepository.findByTeamName("테스트팀")).thenReturn(Optional.of(team));
    when(applicationRepository.save(any(HackathonApplication.class))).thenReturn(application);

    // when
    HackathonApplication result = hackathonService.createApplication(requestDto);

    // then
    assertNotNull(result);
    assertEquals("테스트팀", result.getTeam().getTeamName());

    verify(teamRepository).findByTeamName("테스트팀");
    verify(teamRepository, never()).save(any(Team.class));
    verify(applicationRepository).save(any(HackathonApplication.class));
  }

  @Test
  void getApplications_팀명으로조회_성공() {
    // given
    List<HackathonApplication> applications = List.of(application);
    when(applicationRepository.findByTeamTeamName("테스트팀")).thenReturn(applications);

    // when
    List<HackathonApplication> result = hackathonService.getApplications("테스트팀", null);

    // then
    assertNotNull(result);
    assertEquals(1, result.size());
    assertEquals("테스트팀", result.get(0).getTeam().getTeamName());

    verify(applicationRepository).findByTeamTeamName("테스트팀");
  }

  @Test
  void getApplications_전체조회_성공() {
    // given
    List<HackathonApplication> applications = List.of(application);
    when(applicationRepository.findAll()).thenReturn(applications);

    // when
    List<HackathonApplication> result = hackathonService.getApplications(null, null);

    // then
    assertNotNull(result);
    assertEquals(1, result.size());

    verify(applicationRepository).findAll();
  }

  @Test
  void getApplication_존재하는애플리케이션조회_성공() {
    // given
    when(applicationRepository.findById(1L)).thenReturn(Optional.of(application));

    // when
    HackathonApplication result = hackathonService.getApplication(1L);

    // then
    assertNotNull(result);
    assertEquals(1L, result.getId());

    verify(applicationRepository).findById(1L);
  }

  @Test
  void getApplication_존재하지않는애플리케이션조회_예외발생() {
    // given
    when(applicationRepository.findById(999L)).thenReturn(Optional.empty());

    // when & then
    RuntimeException exception =
        assertThrows(RuntimeException.class, () -> hackathonService.getApplication(999L));

    assertEquals("Application not found with id: 999", exception.getMessage());
    verify(applicationRepository).findById(999L);
  }

  @Test
  void getApplications_멤버명으로조회_성공() {
    // given
    List<HackathonApplication> applications = List.of(application);
    when(applicationRepository.findByTeamMembersName("김개발")).thenReturn(applications);

    // when
    List<HackathonApplication> result = hackathonService.getApplications(null, "김개발");

    // then
    assertNotNull(result);
    assertEquals(1, result.size());

    verify(applicationRepository).findByTeamMembersName("김개발");
  }

  @Test
  void getApplications_조회중예외발생_빈리스트반환() {
    // given
    when(applicationRepository.findByTeamTeamName("테스트팀"))
        .thenThrow(new RuntimeException("Database error"));

    // when
    List<HackathonApplication> result = hackathonService.getApplications("테스트팀", null);

    // then
    assertNotNull(result);
    assertTrue(result.isEmpty());

    verify(applicationRepository).findByTeamTeamName("테스트팀");
  }

  @Test
  void updateApplication_아이디어정보수정_성공() {
    // given
    TeamMemberRequestDto updateDto =
        TeamMemberRequestDto.builder()
            .ideaTitle("수정된 아이디어")
            .ideaDescription("수정된 설명")
            .problemStatement("수정된 문제")
            .solutionApproach("수정된 해결방법")
            .techStack("수정된 기술스택")
            .build();

    when(applicationRepository.findById(1L)).thenReturn(Optional.of(application));
    when(applicationRepository.save(any(HackathonApplication.class))).thenReturn(application);

    // when
    HackathonApplication result = hackathonService.updateApplication(1L, updateDto);

    // then
    assertNotNull(result);
    assertEquals("수정된 아이디어", result.getIdeaTitle());
    assertEquals("수정된 설명", result.getIdeaDescription());
    assertEquals("수정된 문제", result.getProblemStatement());
    assertEquals("수정된 해결방법", result.getSolutionApproach());
    assertEquals("수정된 기술스택", result.getTechStack());

    verify(applicationRepository).findById(1L);
    verify(applicationRepository).save(any(HackathonApplication.class));
  }

  @Test
  void updateApplication_팀명변경_성공() {
    // given
    TeamMemberRequestDto updateDto =
        TeamMemberRequestDto.builder()
            .teamName("새로운팀명")
            .teamSize("3")
            .teamDescription("새로운 팀 설명")
            .build();

    Team newTeam =
        Team.builder().id(2L).teamName("새로운팀명").teamSize("3").teamDescription("새로운 팀 설명").build();

    when(applicationRepository.findById(1L)).thenReturn(Optional.of(application));
    when(teamRepository.findByTeamName("새로운팀명")).thenReturn(Optional.empty());
    when(teamRepository.save(any(Team.class))).thenReturn(newTeam);
    when(applicationRepository.save(any(HackathonApplication.class))).thenReturn(application);

    // when
    HackathonApplication result = hackathonService.updateApplication(1L, updateDto);

    // then
    assertNotNull(result);

    verify(applicationRepository).findById(1L);
    verify(teamRepository).findByTeamName("새로운팀명");
    verify(teamRepository).save(any(Team.class));
    verify(applicationRepository).save(any(HackathonApplication.class));
  }

  @Test
  void updateApplication_존재하지않는애플리케이션수정_예외발생() {
    // given
    TeamMemberRequestDto updateDto = TeamMemberRequestDto.builder().ideaTitle("수정된 아이디어").build();

    when(applicationRepository.findById(999L)).thenReturn(Optional.empty());

    // when & then
    RuntimeException exception =
        assertThrows(
            RuntimeException.class, () -> hackathonService.updateApplication(999L, updateDto));

    assertEquals("Application not found with id: 999", exception.getMessage());
    verify(applicationRepository).findById(999L);
  }

  @Test
  void deleteApplication_애플리케이션삭제_성공() {
    // given
    doNothing().when(applicationRepository).deleteById(1L);

    // when
    hackathonService.deleteApplication(1L);

    // then
    verify(applicationRepository).deleteById(1L);
  }
}
