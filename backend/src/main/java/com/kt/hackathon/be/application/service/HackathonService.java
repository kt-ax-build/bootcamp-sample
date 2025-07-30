package com.kt.hackathon.be.application.service;

import com.kt.hackathon.be.application.dto.TeamMemberRequestDto;
import com.kt.hackathon.be.application.model.HackathonApplication;
import com.kt.hackathon.be.application.model.Team;
import com.kt.hackathon.be.application.model.TeamMember;
import com.kt.hackathon.be.application.repository.HackathonApplicationRepository;
import com.kt.hackathon.be.application.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class HackathonService {

    private final HackathonApplicationRepository applicationRepository;
    private final TeamRepository teamRepository;

    public HackathonApplication createApplication(TeamMemberRequestDto request) {
        // 팀 생성 또는 기존 팀 조회
        Team team = teamRepository.findByTeamName(request.getTeamName())
                .orElseGet(() -> {
                    Team newTeam = Team.builder()
                            .teamName(request.getTeamName())
                            .firstCreateDatetime(java.time.LocalDateTime.now().toString())
                            .firstCreateUid("system")
                            .firstCreateUidIp("127.0.0.1")
                            .lastUpdateDatetime(java.time.LocalDateTime.now().toString())
                            .lastUpdateUid("system")
                            .lastUpdateUidIp("127.0.0.1")
                            .build();
                    return teamRepository.save(newTeam);
                });

        // 해커톤 애플리케이션 생성
        HackathonApplication application = HackathonApplication.builder()
                .team(team)
                .ideaTitle(request.getIdeaTitle())
                .ideaDescription(request.getIdeaDescription())
                .status(HackathonApplication.ApplicationStatus.PENDING)
                .firstCreateDatetime(java.time.LocalDateTime.now().toString())
                .firstCreateUid("system")
                .firstCreateUidIp("127.0.0.1")
                .lastUpdateDatetime(java.time.LocalDateTime.now().toString())
                .lastUpdateUid("system")
                .lastUpdateUidIp("127.0.0.1")
                .build();

        return applicationRepository.save(application);
    }

    @Transactional(readOnly = true)
    public List<HackathonApplication> getApplications(String teamName, String memberName) {
        try {
            if (teamName != null && !teamName.trim().isEmpty()) {
                return applicationRepository.findByTeamTeamName(teamName.trim());
            } else if (memberName != null && !memberName.trim().isEmpty()) {
                return applicationRepository.findByTeamMembersName(memberName.trim());
            } else {
                return applicationRepository.findAll();
            }
        } catch (Exception e) {
            // 로그 출력
            System.err.println("Error in getApplications: " + e.getMessage());
            // 빈 리스트 반환
            return List.of();
        }
    }

    @Transactional(readOnly = true)
    public HackathonApplication getApplication(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));
    }

    public HackathonApplication updateApplication(Long id, TeamMemberRequestDto request) {
        HackathonApplication application = getApplication(id);
        
        // 팀 정보 업데이트
        if (request.getTeamName() != null) {
            Team team = teamRepository.findByTeamName(request.getTeamName())
                    .orElseGet(() -> {
                        Team newTeam = Team.builder()
                                .teamName(request.getTeamName())
                                .build();
                        return teamRepository.save(newTeam);
                    });
            application.setTeam(team);
        }

        // 아이디어 정보 업데이트
        if (request.getIdeaTitle() != null) {
            application.setIdeaTitle(request.getIdeaTitle());
        }
        if (request.getIdeaDescription() != null) {
            application.setIdeaDescription(request.getIdeaDescription());
        }

        return applicationRepository.save(application);
    }

    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
} 