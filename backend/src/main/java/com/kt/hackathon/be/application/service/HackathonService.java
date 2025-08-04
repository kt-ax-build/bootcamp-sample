package com.kt.hackathon.be.application.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kt.hackathon.be.application.dto.TeamMemberRequestDto;
import com.kt.hackathon.be.application.model.HackathonApplication;
import com.kt.hackathon.be.application.model.Team;
import com.kt.hackathon.be.application.model.TeamMember;
import com.kt.hackathon.be.application.repository.HackathonApplicationRepository;
import com.kt.hackathon.be.application.repository.TeamRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class HackathonService {

  private final HackathonApplicationRepository applicationRepository;
  private final TeamRepository teamRepository;

  public HackathonApplication createApplication(TeamMemberRequestDto request) {
    // 팀 생성 또는 기존 팀 조회
    Team team =
        teamRepository
            .findByTeamName(request.getTeamName())
            .orElseGet(
                () -> {
                  Team newTeam =
                      Team.builder()
                          .teamName(request.getTeamName())
                          .teamSize(request.getTeamSize())
                          .teamDescription(request.getTeamDescription())
                          .firstCreateDatetime(LocalDateTime.now().toString())
                          .firstCreateUid("system")
                          .firstCreateUidIp("127.0.0.1")
                          .lastUpdateDatetime(LocalDateTime.now().toString())
                          .lastUpdateUid("system")
                          .lastUpdateUidIp("127.0.0.1")
                          .build();
                  return teamRepository.save(newTeam);
                });

    // 팀원 정보 생성
    List<TeamMember> members = new ArrayList<>();

    if (request.getMembers() != null) {
      for (TeamMemberRequestDto.TeamMemberDto memberDto : request.getMembers()) {
        TeamMember member =
            TeamMember.builder()
                .name(memberDto.getName())
                .email(memberDto.getEmail())
                .phone(memberDto.getPhone())
                .role(memberDto.getRole())
                .department(memberDto.getDepartment())
                .position(memberDto.getPosition())
                .isLeader(memberDto.getIsLeader() != null ? memberDto.getIsLeader() : false)
                .team(team)
                .firstCreateDatetime(LocalDateTime.now().toString())
                .firstCreateUid("system")
                .firstCreateUidIp("127.0.0.1")
                .lastUpdateDatetime(LocalDateTime.now().toString())
                .lastUpdateUid("system")
                .lastUpdateUidIp("127.0.0.1")
                .build();
        members.add(member);
      }
    }

    // 팀에 팀원 정보 설정
    team.setMembers(members);

    // 해커톤 애플리케이션 생성
    HackathonApplication application =
        HackathonApplication.builder()
            .team(team)
            .ideaTitle(request.getIdeaTitle())
            .ideaDescription(request.getIdeaDescription())
            .problemStatement(request.getProblemStatement())
            .solutionApproach(request.getSolutionApproach())
            .techStack(request.getTechStack())
            .status(HackathonApplication.ApplicationStatus.PENDING)
            .firstCreateDatetime(LocalDateTime.now().toString())
            .firstCreateUid("system")
            .firstCreateUidIp("127.0.0.1")
            .lastUpdateDatetime(LocalDateTime.now().toString())
            .lastUpdateUid("system")
            .lastUpdateUidIp("127.0.0.1")
            .build();

    return applicationRepository.save(application);
  }

  @Transactional(readOnly = true)
  public List<HackathonApplication> getApplications(String teamName, String memberName) {
    try {
      List<HackathonApplication> applications;
      if (teamName != null && !teamName.trim().isEmpty()) {
        applications = applicationRepository.findByTeamTeamName(teamName.trim());
      } else if (memberName != null && !memberName.trim().isEmpty()) {
        // 이메일 형식인지 확인
        if (memberName.contains("@")) {
          applications = applicationRepository.findByTeamMembersEmail(memberName.trim());
        } else {
          applications = applicationRepository.findByTeamMembersName(memberName.trim());
        }
      } else {
        applications = applicationRepository.findAll();
      }

      // 팀 정보를 명시적으로 로드
      for (HackathonApplication application : applications) {
        if (application.getTeam() != null) {
          // 팀 정보 로드
          application.getTeam().getTeamName();
          // 팀원 정보 로드
          if (application.getTeam().getMembers() != null) {
            application.getTeam().getMembers().size();
          }
        }
      }

      return applications;
    } catch (Exception e) {
      // 로그 출력
      System.err.println("Error in getApplications: " + e.getMessage());
      e.printStackTrace();
      // 빈 리스트 반환
      return List.of();
    }
  }

  @Transactional(readOnly = true)
  public HackathonApplication getApplication(Long id) {
    return applicationRepository
        .findById(id)
        .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));
  }

  public HackathonApplication updateApplication(Long id, TeamMemberRequestDto request) {
    HackathonApplication application = getApplication(id);

    // 팀 정보 업데이트
    if (request.getTeamName() != null) {
      Team team =
          teamRepository
              .findByTeamName(request.getTeamName())
              .orElseGet(
                  () -> {
                    Team newTeam =
                        Team.builder()
                            .teamName(request.getTeamName())
                            .teamSize(request.getTeamSize())
                            .teamDescription(request.getTeamDescription())
                            .build();
                    return teamRepository.save(newTeam);
                  });

      // 기존 팀원 정보 제거
      if (team.getMembers() != null) {
        team.getMembers().clear();
      }

      // 새로운 팀원 정보 추가
      if (request.getMembers() != null && !request.getMembers().isEmpty()) {
        System.out.println("팀원 정보 업데이트 - 팀원 수: " + request.getMembers().size());
        List<TeamMember> newMembers =
            request.getMembers().stream()
                .map(
                    memberDto -> {
                      System.out.println(
                          "팀원 정보: " + memberDto.getName() + " (" + memberDto.getEmail() + ")");
                      return TeamMember.builder()
                          .name(memberDto.getName())
                          .email(memberDto.getEmail())
                          .phone(memberDto.getPhone())
                          .role(memberDto.getRole())
                          .department(memberDto.getDepartment())
                          .position(memberDto.getPosition())
                          .isLeader(
                              memberDto.getIsLeader() != null ? memberDto.getIsLeader() : false)
                          .team(team)
                          .firstCreateDatetime(LocalDateTime.now().toString())
                          .firstCreateUid("system")
                          .firstCreateUidIp("127.0.0.1")
                          .lastUpdateDatetime(LocalDateTime.now().toString())
                          .lastUpdateUid("system")
                          .lastUpdateUidIp("127.0.0.1")
                          .build();
                    })
                .collect(Collectors.toList());

        team.setMembers(newMembers);
        System.out.println("팀원 정보 설정 완료 - 팀원 수: " + newMembers.size());
      }

      application.setTeam(team);
    } else {
      // 팀명이 변경되지 않았지만 팀 구성 정보나 팀원 정보를 업데이트하는 경우
      Team team = application.getTeam();
      if (team != null) {
        // 팀 구성 정보 업데이트
        if (request.getTeamSize() != null) {
          team.setTeamSize(request.getTeamSize());
        }
        if (request.getTeamDescription() != null) {
          team.setTeamDescription(request.getTeamDescription());
        }

        // 팀원 정보 업데이트
        if (request.getMembers() != null && !request.getMembers().isEmpty()) {
          // 기존 팀원 정보 제거
          if (team.getMembers() != null) {
            team.getMembers().clear();
          }

          // 새로운 팀원 정보 추가
          List<TeamMember> newMembers =
              request.getMembers().stream()
                  .map(
                      memberDto ->
                          TeamMember.builder()
                              .name(memberDto.getName())
                              .email(memberDto.getEmail())
                              .phone(memberDto.getPhone())
                              .role(memberDto.getRole())
                              .department(memberDto.getDepartment())
                              .position(memberDto.getPosition())
                              .isLeader(
                                  memberDto.getIsLeader() != null ? memberDto.getIsLeader() : false)
                              .team(team)
                              .firstCreateDatetime(LocalDateTime.now().toString())
                              .firstCreateUid("system")
                              .firstCreateUidIp("127.0.0.1")
                              .lastUpdateDatetime(LocalDateTime.now().toString())
                              .lastUpdateUid("system")
                              .lastUpdateUidIp("127.0.0.1")
                              .build())
                  .collect(Collectors.toList());

          team.setMembers(newMembers);
        }
      }
    }

    // 아이디어 정보 업데이트
    if (request.getIdeaTitle() != null) {
      application.setIdeaTitle(request.getIdeaTitle());
    }
    if (request.getIdeaDescription() != null) {
      application.setIdeaDescription(request.getIdeaDescription());
    }
    if (request.getProblemStatement() != null) {
      application.setProblemStatement(request.getProblemStatement());
    }
    if (request.getSolutionApproach() != null) {
      application.setSolutionApproach(request.getSolutionApproach());
    }
    if (request.getTechStack() != null) {
      application.setTechStack(request.getTechStack());
    }

    return applicationRepository.save(application);
  }

  public void deleteApplication(Long id) {
    applicationRepository.deleteById(id);
  }
}
