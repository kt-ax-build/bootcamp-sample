package com.kt.hackathon.be.application.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "idea_infos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdeaInfo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "title", nullable = false)
  private String title;

  @Column(name = "problem", nullable = false, length = 300)
  private String problem;

  @Column(name = "solution", nullable = false, length = 500)
  private String solution;

  @Column(name = "technology_stack")
  private String technologyStack;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "application_id")
  private HackathonApplication application;

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
