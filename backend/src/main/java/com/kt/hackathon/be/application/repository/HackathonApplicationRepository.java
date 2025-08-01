package com.kt.hackathon.be.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kt.hackathon.be.application.model.HackathonApplication;

@Repository
public interface HackathonApplicationRepository extends JpaRepository<HackathonApplication, Long> {

  @Query("SELECT ha FROM HackathonApplication ha WHERE ha.team.teamName = :teamName")
  List<HackathonApplication> findByTeamTeamName(@Param("teamName") String teamName);

  @Query(
      "SELECT ha FROM HackathonApplication ha JOIN ha.team t JOIN t.members tm WHERE tm.name = :memberName")
  List<HackathonApplication> findByTeamMembersName(@Param("memberName") String memberName);

  @Query(
      "SELECT ha FROM HackathonApplication ha JOIN ha.team t JOIN t.members tm WHERE tm.email = :memberEmail")
  List<HackathonApplication> findByTeamMembersEmail(@Param("memberEmail") String memberEmail);

  @Query(
      "SELECT ha FROM HackathonApplication ha JOIN ha.team t JOIN t.members tm WHERE t.teamName = :teamName AND tm.name = :memberName")
  List<HackathonApplication> findByTeamTeamNameAndTeamMembersName(
      @Param("teamName") String teamName, @Param("memberName") String memberName);
}
