package com.kt.hackathon.be.application.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hackathon_applications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HackathonApplication {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "team_id", nullable = false)
  private Long teamId;

  @Column(name = "idea_title", nullable = false, length = 200)
  private String ideaTitle;

  @Column(name = "problem_description", nullable = false, columnDefinition = "TEXT")
  private String problemDescription;

  @Column(name = "solution_approach", nullable = false, columnDefinition = "TEXT")
  private String solutionApproach;

  @Column(name = "tech_stack", columnDefinition = "TEXT")
  private String techStack;

  @Column(name = "status", nullable = false, length = 20)
  @Enumerated(EnumType.STRING)
  private ApplicationStatus status;

  @Column(name = "first_create_datetime", nullable = false)
  private LocalDateTime firstCreateDatetime;

  @Column(name = "first_create_uid", nullable = false, length = 100)
  private String firstCreateUid;

  @Column(name = "first_create_uid_ip", nullable = false, length = 45)
  private String firstCreateUidIp;

  @Column(name = "last_update_datetime", nullable = false)
  private LocalDateTime lastUpdateDatetime;

  @Column(name = "last_update_uid", nullable = false, length = 100)
  private String lastUpdateUid;

  @Column(name = "last_update_uid_ip", nullable = false, length = 45)
  private String lastUpdateUidIp;

  public enum ApplicationStatus {
    DRAFT, // 임시저장
    SUBMITTED, // 제출완료
    REVIEWING, // 심사중
    APPROVED, // 승인
    REJECTED // 거절
  }
}
