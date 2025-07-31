package com.kt.hackathon.be.application.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "team_members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamMember {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "email", nullable = false)
  private String email;

  @Column(name = "phone")
  private String phone;

  @Column(name = "role")
  private String role;

  @Column(name = "department")
  private String department;

  @Column(name = "position")
  private String position;

  @Column(name = "is_leader")
  private Boolean isLeader;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "team_id")
  private Team team;

  @Column(name = "first_create_datetime")
  private String firstCreateDatetime;

  @Column(name = "first_create_uid")
  private String firstCreateUid;

  @Column(name = "first_create_uid_ip")
  private String firstCreateUidIp;

  @Column(name = "last_update_datetime")
  private String lastUpdateDatetime;

  @Column(name = "last_update_uid")
  private String lastUpdateUid;

  @Column(name = "last_update_uid_ip")
  private String lastUpdateUidIp;
}
