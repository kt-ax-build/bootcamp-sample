package com.kt.hackathon.be.application.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "team_members")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamMember {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "team_id", nullable = false)
  private Long teamId;

  @Column(name = "name", nullable = false, length = 100)
  private String name;

  @Column(name = "email", nullable = false, length = 255)
  private String email;

  @Column(name = "department", nullable = false, length = 100)
  private String department;

  @Column(name = "position", length = 100)
  private String position;

  @Column(name = "is_leader", nullable = false)
  private Boolean isLeader;

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
}
