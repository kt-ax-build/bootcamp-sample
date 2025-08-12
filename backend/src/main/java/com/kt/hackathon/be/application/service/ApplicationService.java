package com.kt.hackathon.be.application.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kt.hackathon.be.application.dto.*;
import com.kt.hackathon.be.application.model.HackathonApplication;
import com.kt.hackathon.be.application.model.Team;
import com.kt.hackathon.be.application.model.TeamMember;
import com.kt.hackathon.be.application.repository.HackathonApplicationRepository;
import com.kt.hackathon.be.application.repository.TeamMemberRepository;
import com.kt.hackathon.be.application.repository.TeamRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(rollbackFor = Exception.class)
public class ApplicationService {

  private final TeamRepository teamRepository;
  private final TeamMemberRepository teamMemberRepository;
  private final HackathonApplicationRepository applicationRepository;

  /** 팀명 중복 확인 */
  @Transactional(readOnly = true)
  public TeamNameCheckResponseDto checkTeamName(String teamName) {
    boolean exists = teamRepository.existsByName(teamName);

    if (exists) {
      return TeamNameCheckResponseDto.builder()
          .isAvailable(false)
          .message("이미 사용 중인 팀명입니다.")
          .build();
    } else {
      return TeamNameCheckResponseDto.builder().isAvailable(true).message("사용 가능한 팀명입니다.").build();
    }
  }

  /** 신청 생성 */
  public ApplicationResponseDto createApplication(ApplicationRequestDto requestDto) {
    // 팀명 중복 확인
    if (teamRepository.existsByName(requestDto.getTeamInfo().getName())) {
      throw new IllegalArgumentException("이미 사용 중인 팀명입니다.");
    }

    // 팀 정보 저장
    Team team =
        Team.builder()
            .name(requestDto.getTeamInfo().getName())
            .composition(requestDto.getTeamInfo().getComposition())
            .description(requestDto.getTeamInfo().getDescription())
            .firstCreateDatetime(LocalDateTime.now())
            .firstCreateUid("SYSTEM")
            .firstCreateUidIp("127.0.0.1")
            .lastUpdateDatetime(LocalDateTime.now())
            .lastUpdateUid("SYSTEM")
            .lastUpdateUidIp("127.0.0.1")
            .build();

    Team savedTeam = teamRepository.save(team);

    // 팀원 정보 저장
    List<TeamMember> teamMembers =
        requestDto.getTeamMembers().stream()
            .map(
                memberDto ->
                    TeamMember.builder()
                        .teamId(savedTeam.getId())
                        .name(memberDto.getName())
                        .email(memberDto.getEmail())
                        .department(memberDto.getDepartment())
                        .position(memberDto.getPosition())
                        .isLeader(memberDto.getIsLeader())
                        .firstCreateDatetime(LocalDateTime.now())
                        .firstCreateUid("SYSTEM")
                        .firstCreateUidIp("127.0.0.1")
                        .lastUpdateDatetime(LocalDateTime.now())
                        .lastUpdateUid("SYSTEM")
                        .lastUpdateUidIp("127.0.0.1")
                        .build())
            .collect(Collectors.toList());

    teamMemberRepository.saveAll(teamMembers);

    // 해커톤 신청 정보 저장
    HackathonApplication application =
        HackathonApplication.builder()
            .teamId(savedTeam.getId())
            .ideaTitle(requestDto.getIdeaInfo().getTitle())
            .problemDescription(requestDto.getIdeaInfo().getProblem())
            .solutionApproach(requestDto.getIdeaInfo().getSolution())
            .techStack(requestDto.getIdeaInfo().getTechStack())
            .status(HackathonApplication.ApplicationStatus.SUBMITTED)
            .firstCreateDatetime(LocalDateTime.now())
            .firstCreateUid("SYSTEM")
            .firstCreateUidIp("127.0.0.1")
            .lastUpdateDatetime(LocalDateTime.now())
            .lastUpdateUid("SYSTEM")
            .lastUpdateUidIp("127.0.0.1")
            .build();

    HackathonApplication savedApplication = applicationRepository.save(application);

    // 응답 DTO 생성
    return ApplicationResponseDto.builder()
        .id(savedApplication.getId())
        .teamInfo(
            TeamDto.builder()
                .id(savedTeam.getId())
                .name(savedTeam.getName())
                .composition(savedTeam.getComposition())
                .description(savedTeam.getDescription())
                .teamMembers(
                    teamMembers.stream()
                        .map(
                            member ->
                                TeamMemberDto.builder()
                                    .id(member.getId())
                                    .name(member.getName())
                                    .email(member.getEmail())
                                    .department(member.getDepartment())
                                    .position(member.getPosition())
                                    .isLeader(member.getIsLeader())
                                    .build())
                        .collect(Collectors.toList()))
                .build())
        .ideaInfo(
            IdeaDto.builder()
                .id(savedApplication.getId())
                .title(savedApplication.getIdeaTitle())
                .problem(savedApplication.getProblemDescription())
                .solution(savedApplication.getSolutionApproach())
                .techStack(savedApplication.getTechStack())
                .build())
        .createdAt(savedApplication.getFirstCreateDatetime())
        .updatedAt(savedApplication.getLastUpdateDatetime())
        .status(savedApplication.getStatus())
        .build();
  }

  /** 신청 목록 조회 */
  @Transactional(readOnly = true)
  public List<ApplicationResponseDto> getApplications() {
    List<HackathonApplication> applications = applicationRepository.findAllOrderByCreatedAtDesc();

    return applications.stream().map(this::convertToResponseDto).collect(Collectors.toList());
  }

  /** 신청 상세 조회 */
  @Transactional(readOnly = true)
  public ApplicationResponseDto getApplication(Long id) {
    HackathonApplication application =
        applicationRepository
            .findById(id)
            .orElseThrow(() -> new IllegalArgumentException("신청 정보를 찾을 수 없습니다."));

    return convertToResponseDto(application);
  }

  /** 신청 수정 */
  public ApplicationResponseDto updateApplication(Long id, ApplicationRequestDto requestDto) {
    HackathonApplication application =
        applicationRepository
            .findById(id)
            .orElseThrow(() -> new IllegalArgumentException("신청 정보를 찾을 수 없습니다."));

    // 팀 정보 수정
    Team team =
        teamRepository
            .findById(application.getTeamId())
            .orElseThrow(() -> new IllegalArgumentException("팀 정보를 찾을 수 없습니다."));

    team.setName(requestDto.getTeamInfo().getName());
    team.setComposition(requestDto.getTeamInfo().getComposition());
    team.setDescription(requestDto.getTeamInfo().getDescription());
    team.setLastUpdateDatetime(LocalDateTime.now());
    team.setLastUpdateUid("SYSTEM");
    team.setLastUpdateUidIp("127.0.0.1");

    teamRepository.save(team);

    // 기존 팀원 정보 삭제
    teamMemberRepository.deleteByTeamId(team.getId());

    // 새로운 팀원 정보 저장
    List<TeamMember> teamMembers =
        requestDto.getTeamMembers().stream()
            .map(
                memberDto ->
                    TeamMember.builder()
                        .teamId(team.getId())
                        .name(memberDto.getName())
                        .email(memberDto.getEmail())
                        .department(memberDto.getDepartment())
                        .position(memberDto.getPosition())
                        .isLeader(memberDto.getIsLeader())
                        .firstCreateDatetime(LocalDateTime.now())
                        .firstCreateUid("SYSTEM")
                        .firstCreateUidIp("127.0.0.1")
                        .lastUpdateDatetime(LocalDateTime.now())
                        .lastUpdateUid("SYSTEM")
                        .lastUpdateUidIp("127.0.0.1")
                        .build())
            .collect(Collectors.toList());

    teamMemberRepository.saveAll(teamMembers);

    // 해커톤 신청 정보 수정
    application.setIdeaTitle(requestDto.getIdeaInfo().getTitle());
    application.setProblemDescription(requestDto.getIdeaInfo().getProblem());
    application.setSolutionApproach(requestDto.getIdeaInfo().getSolution());
    application.setTechStack(requestDto.getIdeaInfo().getTechStack());
    application.setLastUpdateDatetime(LocalDateTime.now());
    application.setLastUpdateUid("SYSTEM");
    application.setLastUpdateUidIp("127.0.0.1");

    HackathonApplication savedApplication = applicationRepository.save(application);

    return convertToResponseDto(savedApplication);
  }

  /** 신청 삭제 */
  public void deleteApplication(Long id) {
    HackathonApplication application =
        applicationRepository
            .findById(id)
            .orElseThrow(() -> new IllegalArgumentException("신청 정보를 찾을 수 없습니다."));

    // 팀원 정보 삭제
    teamMemberRepository.deleteByTeamId(application.getTeamId());

    // 신청 정보 삭제
    applicationRepository.delete(application);

    // 팀 정보 삭제
    teamRepository.deleteById(application.getTeamId());
  }

  /** Entity를 Response DTO로 변환 */
  private ApplicationResponseDto convertToResponseDto(HackathonApplication application) {
    Team team =
        teamRepository
            .findById(application.getTeamId())
            .orElseThrow(() -> new IllegalArgumentException("팀 정보를 찾을 수 없습니다."));

    List<TeamMember> teamMembers =
        teamMemberRepository.findByTeamIdOrderByIsLeaderDescIdAsc(team.getId());

    return ApplicationResponseDto.builder()
        .id(application.getId())
        .teamInfo(
            TeamDto.builder()
                .id(team.getId())
                .name(team.getName())
                .composition(team.getComposition())
                .description(team.getDescription())
                .teamMembers(
                    teamMembers.stream()
                        .map(
                            member ->
                                TeamMemberDto.builder()
                                    .id(member.getId())
                                    .name(member.getName())
                                    .email(member.getEmail())
                                    .department(member.getDepartment())
                                    .position(member.getPosition())
                                    .isLeader(member.getIsLeader())
                                    .build())
                        .collect(Collectors.toList()))
                .build())
        .ideaInfo(
            IdeaDto.builder()
                .id(application.getId())
                .title(application.getIdeaTitle())
                .problem(application.getProblemDescription())
                .solution(application.getSolutionApproach())
                .techStack(application.getTechStack())
                .build())
        .createdAt(application.getFirstCreateDatetime())
        .updatedAt(application.getLastUpdateDatetime())
        .status(application.getStatus())
        .build();
  }
}
