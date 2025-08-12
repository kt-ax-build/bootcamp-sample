package com.kt.hackathon.be.application.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kt.hackathon.be.application.model.TeamMember;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {

  @Query(
      "SELECT tm FROM TeamMember tm WHERE tm.teamId = :teamId ORDER BY tm.isLeader DESC, tm.id ASC")
  List<TeamMember> findByTeamIdOrderByIsLeaderDescIdAsc(@Param("teamId") Long teamId);

  @Query("SELECT tm FROM TeamMember tm WHERE tm.teamId = :teamId AND tm.isLeader = true")
  Optional<TeamMember> findLeaderByTeamId(@Param("teamId") Long teamId);

  @Modifying
  @Query("DELETE FROM TeamMember tm WHERE tm.teamId = :teamId")
  void deleteByTeamId(@Param("teamId") Long teamId);
}
