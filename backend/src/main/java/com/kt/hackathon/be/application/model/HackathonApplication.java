package com.kt.hackathon.be.application.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "hackathon_applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HackathonApplication {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "team_id")
  @JsonBackReference
  private Team team;

  @Column(name = "idea_title")
  private String ideaTitle;

  @Column(name = "idea_description", columnDefinition = "TEXT")
  private String ideaDescription;

  @Enumerated(EnumType.STRING)
  @Column(name = "status")
  private ApplicationStatus status;

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

  public enum ApplicationStatus {
    PENDING,
    APPROVED,
    REJECTED
  }
}
