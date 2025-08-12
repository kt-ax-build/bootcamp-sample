package com.kt.hackathon.be.application.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kt.hackathon.be.application.model.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

  @Query("SELECT t FROM Team t WHERE t.name = :teamName")
  Optional<Team> findByName(@Param("teamName") String teamName);

  @Query(
      "SELECT CASE WHEN COUNT(t) > 0 THEN true ELSE false END FROM Team t WHERE t.name = :teamName")
  boolean existsByName(@Param("teamName") String teamName);
}
