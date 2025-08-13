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
  public ResponseEntity<?> getApplications(
      @RequestParam(required = false) String teamName,
      @RequestParam(required = false) String memberName) {
    try {
      List<HackathonApplication> applications =
          hackathonService.getApplications(teamName, memberName);
      return ResponseEntity.ok(applications);
    } catch (IllegalArgumentException e) {
      // 잘못된 검색 조건인 경우 400 에러
      return ResponseEntity.badRequest()
          .body(Map.of("error", "검색 조건이 올바르지 않습니다.", "details", e.getMessage()));
    } catch (Exception e) {
      System.err.println("Error in getApplications: " + e.getMessage());
      e.printStackTrace();
      return ResponseEntity.status(500)
          .body(Map.of("error", "조회 중 오류가 발생했습니다.", "details", e.getMessage()));
    }
  }

  @GetMapping("/applications/{id}")
  @Operation(summary = "해커톤 애플리케이션 상세 조회", description = "특정 해커톤 애플리케이션을 조회합니다.")
  public ResponseEntity<HackathonApplication> getApplication(@PathVariable Long id) {
    try {
      HackathonApplication application = hackathonService.getApplication(id);
      return ResponseEntity.ok(application);
    } catch (Exception e) {
      return ResponseEntity.notFound().build();
    }
  }

  @PutMapping("/applications/{id}")
  @Operation(summary = "해커톤 애플리케이션 수정", description = "해커톤 애플리케이션을 수정합니다.")
  public ResponseEntity<HackathonApplication> updateApplication(
      @PathVariable Long id, @RequestBody TeamMemberRequestDto request) {
    try {
      HackathonApplication application = hackathonService.updateApplication(id, request);
      return ResponseEntity.ok(application);
    } catch (Exception e) {
      return ResponseEntity.status(500).build();
    }
  }

  @DeleteMapping("/applications/{id}")
  @Operation(summary = "해커톤 애플리케이션 삭제", description = "해커톤 애플리케이션을 삭제합니다.")
  public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
    try {
      hackathonService.deleteApplication(id);
      return ResponseEntity.noContent().build();
    } catch (Exception e) {
      return ResponseEntity.status(500).build();
    }
  }
}
