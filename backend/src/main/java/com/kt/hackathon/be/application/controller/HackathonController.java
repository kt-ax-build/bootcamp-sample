package com.kt.hackathon.be.application.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kt.hackathon.be.application.dto.TeamMemberRequestDto;
import com.kt.hackathon.be.application.model.HackathonApplication;
import com.kt.hackathon.be.application.service.HackathonService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/hackathon/v1")
@RequiredArgsConstructor
@Tag(name = "Hackathon", description = "해커톤 애플리케이션 관리 API")
public class HackathonController {

  private final HackathonService hackathonService;

  @PostMapping("/applications")
  @Operation(summary = "해커톤 애플리케이션 생성", description = "새로운 해커톤 애플리케이션을 생성합니다.")
  public ResponseEntity<?> createApplication(@RequestBody TeamMemberRequestDto request) {
    try {
      HackathonApplication application = hackathonService.createApplication(request);
      return ResponseEntity.ok(application);
    } catch (Exception e) {
      return ResponseEntity.status(500)
          .body(Map.of("error", e.getMessage(), "details", e.toString()));
    }
  }

  @GetMapping("/applications")
  @Operation(summary = "해커톤 애플리케이션 조회", description = "해커톤 애플리케이션 목록을 조회합니다.")
  public ResponseEntity<List<HackathonApplication>> getApplications(
      @RequestParam(required = false) String teamName,
      @RequestParam(required = false) String memberName) {
    List<HackathonApplication> applications =
        hackathonService.getApplications(teamName, memberName);
    return ResponseEntity.ok(applications);
  }

  @GetMapping("/applications/{id}")
  @Operation(summary = "해커톤 애플리케이션 상세 조회", description = "특정 해커톤 애플리케이션을 조회합니다.")
  public ResponseEntity<HackathonApplication> getApplication(@PathVariable Long id) {
    HackathonApplication application = hackathonService.getApplication(id);
    return ResponseEntity.ok(application);
  }

  @PutMapping("/applications/{id}")
  @Operation(summary = "해커톤 애플리케이션 수정", description = "해커톤 애플리케이션을 수정합니다.")
  public ResponseEntity<HackathonApplication> updateApplication(
      @PathVariable Long id, @RequestBody TeamMemberRequestDto request) {
    HackathonApplication application = hackathonService.updateApplication(id, request);
    return ResponseEntity.ok(application);
  }

  @DeleteMapping("/applications/{id}")
  @Operation(summary = "해커톤 애플리케이션 삭제", description = "해커톤 애플리케이션을 삭제합니다.")
  public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
    hackathonService.deleteApplication(id);
    return ResponseEntity.noContent().build();
  }
}
