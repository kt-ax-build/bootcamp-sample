package com.kt.hackathon.be.application.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
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

  private TeamMemberRequestDto createSampleRequest(String teamName, int memberCount) {
    List<TeamMemberRequestDto.TeamMemberDto> members = new ArrayList<>();
    for (int i = 1; i <= memberCount; i++) {
      members.add(
          TeamMemberRequestDto.TeamMemberDto.builder()
              .name("Member" + i)
              .email("member" + i + "@example.com")
              .phone("010-0000-000" + i)
              .role("DEV")
              .department("R&D")
              .position("Engineer")
              .isLeader(i == 1)
              .build());
    }

    return TeamMemberRequestDto.builder()
        .teamName(teamName)
        .teamSize("3")
        .teamDescription("Sample team")
        .ideaTitle("Idea Title")
        .ideaDescription("Idea Description")
        .problemStatement("Problem")
        .solutionApproach("Solution")
        .techStack("Java, Spring")
        .members(members)
        .build();
  }

  @Test
  @DisplayName("TC-BE-001: create - 새 팀 생성, app 저장 확인")
  void createApplication_shouldCreateNewTeamAndSaveApplication() {
    // given
    TeamMemberRequestDto request = createSampleRequest("AI개발팀", 2);
    when(teamRepository.findByTeamName("AI개발팀")).thenReturn(Optional.empty());

    ArgumentCaptor<Team> teamCaptor = ArgumentCaptor.forClass(Team.class);
    when(teamRepository.save(teamCaptor.capture()))
        .thenAnswer(
            invocation -> {
              Team t = invocation.getArgument(0);
              t.setId(1L);
              return t;
            });

    ArgumentCaptor<HackathonApplication> appCaptor =
        ArgumentCaptor.forClass(HackathonApplication.class);
    when(applicationRepository.save(appCaptor.capture()))
        .thenAnswer(
            invocation -> {
              HackathonApplication app = invocation.getArgument(0);
              app.setId(100L);
              return app;
            });

    // when
    HackathonApplication saved = hackathonService.createApplication(request);

    // then
    assertNotNull(saved.getId());
    verify(teamRepository, times(1)).save(any(Team.class));
    verify(applicationRepository, times(1)).save(any(HackathonApplication.class));

    Team savedTeam = teamCaptor.getValue();
    assertEquals("AI개발팀", savedTeam.getTeamName());

    HackathonApplication savedApp = appCaptor.getValue();
    assertEquals("Idea Title", savedApp.getIdeaTitle());
    assertNotNull(savedApp.getTeam());
    assertNotNull(savedApp.getTeam().getMembers());
    assertEquals(2, savedApp.getTeam().getMembers().size());
  }

  @Test
  @DisplayName("TC-BE-002: create - 기존 팀 재사용(팀 save 미호출)")
  void createApplication_shouldReuseExistingTeam() {
    // given
    Team existingTeam = Team.builder().id(7L).teamName("AI개발팀").members(new ArrayList<>()).build();
    when(teamRepository.findByTeamName("AI개발팀")).thenReturn(Optional.of(existingTeam));

    ArgumentCaptor<HackathonApplication> appCaptor =
        ArgumentCaptor.forClass(HackathonApplication.class);
    when(applicationRepository.save(appCaptor.capture()))
        .thenAnswer(invocation -> invocation.getArgument(0));

    TeamMemberRequestDto request = createSampleRequest("AI개발팀", 1);

    // when
    hackathonService.createApplication(request);

    // then
    verify(teamRepository, never()).save(any());
    verify(applicationRepository, times(1)).save(any());
    assertSame(existingTeam, appCaptor.getValue().getTeam());
  }

  @Test
  @DisplayName("TC-BE-003: create - members=null → 빈 리스트 허용")
  void createApplication_shouldAllowNullMembers() {
    // given
    Team existingTeam = Team.builder().id(1L).teamName("AI개발팀").build();
    when(teamRepository.findByTeamName("AI개발팀")).thenReturn(Optional.of(existingTeam));
    when(applicationRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

    TeamMemberRequestDto request = createSampleRequest("AI개발팀", 0);
    request.setMembers(null);

    // when
    HackathonApplication saved = hackathonService.createApplication(request);

    // then
    assertNotNull(saved);
    assertNotNull(saved.getTeam());
    assertNotNull(saved.getTeam().getMembers());
    assertEquals(0, saved.getTeam().getMembers().size());
  }

  @Test
  @DisplayName("TC-BE-004: list - teamName → findByTeamTeamName 호출")
  void getApplications_shouldUseFindByTeamTeamName() {
    // given
    List<HackathonApplication> list = new ArrayList<>();
    list.add(
        HackathonApplication.builder()
            .team(Team.builder().members(new ArrayList<>()).build())
            .build());
    when(applicationRepository.findByTeamTeamName("AI개발팀")).thenReturn(list);

    // when
    List<HackathonApplication> result = hackathonService.getApplications(" AI개발팀 ", null);

    // then
    assertEquals(1, result.size());
    verify(applicationRepository).findByTeamTeamName("AI개발팀");
    verify(applicationRepository, never()).findAll();
  }

  @Test
  @DisplayName("TC-BE-005: list - memberName(이름) → findByTeamMembersName 호출")
  void getApplications_shouldUseFindByTeamMembersName() {
    // given
    List<HackathonApplication> list = new ArrayList<>();
    list.add(
        HackathonApplication.builder()
            .team(Team.builder().members(new ArrayList<>()).build())
            .build());
    when(applicationRepository.findByTeamMembersName("김개발")).thenReturn(list);

    // when
    List<HackathonApplication> result = hackathonService.getApplications(null, " 김개발 ");

    // then
    assertEquals(1, result.size());
    verify(applicationRepository).findByTeamMembersName("김개발");
    verify(applicationRepository, never()).findAll();
  }

  @Test
  @DisplayName("TC-BE-006: list - memberName(이메일) → findByTeamMembersEmail 호출")
  void getApplications_shouldUseFindByTeamMembersEmail() {
    // given
    List<HackathonApplication> list = new ArrayList<>();
    list.add(
        HackathonApplication.builder()
            .team(Team.builder().members(new ArrayList<>()).build())
            .build());
    when(applicationRepository.findByTeamMembersEmail("dev@example.com")).thenReturn(list);

    // when
    List<HackathonApplication> result = hackathonService.getApplications(null, " dev@example.com ");

    // then
    assertEquals(1, result.size());
    verify(applicationRepository).findByTeamMembersEmail("dev@example.com");
    verify(applicationRepository, never()).findAll();
  }

  @Test
  @DisplayName("TC-BE-007: list - 필터 없음 → findAll 호출")
  void getApplications_shouldUseFindAllWhenNoFilters() {
    // given
    List<HackathonApplication> list = new ArrayList<>();
    list.add(
        HackathonApplication.builder()
            .team(Team.builder().members(new ArrayList<>()).build())
            .build());
    when(applicationRepository.findAll()).thenReturn(list);

    // when
    List<HackathonApplication> result = hackathonService.getApplications(null, null);

    // then
    assertEquals(1, result.size());
    verify(applicationRepository).findAll();
  }

  @Test
  @DisplayName("TC-BE-008: list - 공백 문자열 → 전체 조회(findAll)")
  void getApplications_shouldFallbackToFindAllOnBlankStrings() {
    // given
    when(applicationRepository.findAll()).thenReturn(new ArrayList<>());

    // when
    List<HackathonApplication> result = hackathonService.getApplications("   ", "   ");

    // then
    assertNotNull(result);
    verify(applicationRepository).findAll();
  }

  @Test
  @DisplayName("TC-BE-009: list - 예외 발생 → 빈 리스트 반환")
  void getApplications_shouldReturnEmptyListOnException() {
    // given
    when(applicationRepository.findAll()).thenThrow(new RuntimeException("DB error"));

    // when
    List<HackathonApplication> result = hackathonService.getApplications(null, null);

    // then
    assertNotNull(result);
    assertTrue(result.isEmpty());
  }

  @Test
  @DisplayName("TC-BE-010: get - 존재하는 ID")
  void getApplication_shouldReturnWhenExists() {
    // given
    HackathonApplication app = HackathonApplication.builder().id(10L).build();
    when(applicationRepository.findById(10L)).thenReturn(Optional.of(app));

    // when
    HackathonApplication result = hackathonService.getApplication(10L);

    // then
    assertEquals(10L, result.getId());
  }

  @Test
  @DisplayName("TC-BE-011: get - 미존재 ID → RuntimeException")
  void getApplication_shouldThrowWhenNotExists() {
    // given
    when(applicationRepository.findById(99L)).thenReturn(Optional.empty());

    // when / then
    RuntimeException ex =
        assertThrows(RuntimeException.class, () -> hackathonService.getApplication(99L));
    assertTrue(ex.getMessage().contains("99"));
  }

  @Test
  @DisplayName("TC-BE-012: update - teamName 제공 시 기존 팀 재사용, 팀원 교체")
  void updateApplication_shouldReuseTeamAndReplaceMembersWhenTeamNameProvided() {
    // given existing app
    Team originalTeam = Team.builder().id(1L).teamName("AI개발팀").members(new ArrayList<>()).build();
    HackathonApplication app = HackathonApplication.builder().id(5L).team(originalTeam).build();
    when(applicationRepository.findById(5L)).thenReturn(Optional.of(app));

    // existing team to reuse
    Team existingTeam = Team.builder().id(2L).teamName("AI개발팀").members(new ArrayList<>()).build();
    when(teamRepository.findByTeamName("AI개발팀")).thenReturn(Optional.of(existingTeam));

    ArgumentCaptor<HackathonApplication> appCaptor =
        ArgumentCaptor.forClass(HackathonApplication.class);
    when(applicationRepository.save(appCaptor.capture()))
        .thenAnswer(invocation -> invocation.getArgument(0));

    TeamMemberRequestDto request = createSampleRequest("AI개발팀", 3);

    // when
    HackathonApplication updated = hackathonService.updateApplication(5L, request);

    // then
    verify(teamRepository, never()).save(any());
    HackathonApplication savedApp = appCaptor.getValue();
    assertSame(existingTeam, savedApp.getTeam());
    assertNotNull(savedApp.getTeam().getMembers());
    assertEquals(3, savedApp.getTeam().getMembers().size());
    assertEquals(updated, savedApp);
  }

  @Test
  @DisplayName("TC-BE-013: update - teamName 미제공 시 구성/팀원만 갱신")
  void updateApplication_shouldUpdateTeamFieldsAndMembersWhenNoTeamName() {
    // given
    List<TeamMember> oldMembers = new ArrayList<>();
    oldMembers.add(TeamMember.builder().name("Old").email("old@example.com").build());
    Team team = Team.builder().id(1L).teamName("AI개발팀").teamSize("2").members(oldMembers).build();
    HackathonApplication app = HackathonApplication.builder().id(5L).team(team).build();
    when(applicationRepository.findById(5L)).thenReturn(Optional.of(app));

    ArgumentCaptor<HackathonApplication> appCaptor =
        ArgumentCaptor.forClass(HackathonApplication.class);
    when(applicationRepository.save(appCaptor.capture()))
        .thenAnswer(invocation -> invocation.getArgument(0));

    TeamMemberRequestDto request =
        TeamMemberRequestDto.builder()
            .teamSize("10")
            .teamDescription("updated desc")
            .members(
                List.of(
                    TeamMemberRequestDto.TeamMemberDto.builder()
                        .name("N1")
                        .email("n1@example.com")
                        .build(),
                    TeamMemberRequestDto.TeamMemberDto.builder()
                        .name("N2")
                        .email("n2@example.com")
                        .build()))
            .ideaTitle("NewTitle")
            .ideaDescription("NewDesc")
            .problemStatement("NewProblem")
            .solutionApproach("NewSolution")
            .techStack("NewStack")
            .build();

    // when
    HackathonApplication updated = hackathonService.updateApplication(5L, request);

    // then
    HackathonApplication savedApp = appCaptor.getValue();
    assertSame(team, savedApp.getTeam());
    assertEquals("10", savedApp.getTeam().getTeamSize());
    assertEquals("updated desc", savedApp.getTeam().getTeamDescription());
    assertEquals(2, savedApp.getTeam().getMembers().size());
    assertEquals("NewTitle", savedApp.getIdeaTitle());
    assertEquals("NewDesc", savedApp.getIdeaDescription());
    assertEquals("NewProblem", savedApp.getProblemStatement());
    assertEquals("NewSolution", savedApp.getSolutionApproach());
    assertEquals("NewStack", savedApp.getTechStack());
    assertEquals(updated, savedApp);
  }

  @Test
  @DisplayName("TC-BE-014: delete - deleteById 호출")
  void deleteApplication_shouldInvokeDeleteById() {
    // when
    hackathonService.deleteApplication(77L);

    // then
    verify(applicationRepository).deleteById(77L);
  }
}
