package com.kt.hackathon.be.application.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "teams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Team {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "team_name", nullable = false, unique = true)
  private String teamName;

  @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JsonManagedReference
  private List<TeamMember> members;

  @OneToOne(mappedBy = "team", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JsonBackReference
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
