package com.kt.hackathon.be.application.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "teams")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Team {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name", nullable = false, length = 100, unique = true)
  private String name;

  @Column(name = "composition", nullable = false, length = 50)
  private String composition;

  @Column(name = "description", nullable = false, columnDefinition = "TEXT")
  private String description;

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
