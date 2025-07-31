package com.kt.hackathon.be.application.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kt.hackathon.be.application.model.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
  Optional<Team> findByTeamName(String teamName);
}
