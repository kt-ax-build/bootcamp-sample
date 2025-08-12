package com.kt.hackathon.be.application.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kt.hackathon.be.application.model.HackathonApplication;

@Repository
public interface HackathonApplicationRepository extends JpaRepository<HackathonApplication, Long> {

  @Query("SELECT ha FROM HackathonApplication ha WHERE ha.teamId = :teamId")
  Optional<HackathonApplication> findByTeamId(@Param("teamId") Long teamId);

  @Query("SELECT ha FROM HackathonApplication ha ORDER BY ha.firstCreateDatetime DESC")
  List<HackathonApplication> findAllOrderByCreatedAtDesc();

  @Query(
      "SELECT ha FROM HackathonApplication ha WHERE ha.status = :status ORDER BY ha.firstCreateDatetime DESC")
  List<HackathonApplication> findByStatusOrderByCreatedAtDesc(
      @Param("status") HackathonApplication.ApplicationStatus status);
}
