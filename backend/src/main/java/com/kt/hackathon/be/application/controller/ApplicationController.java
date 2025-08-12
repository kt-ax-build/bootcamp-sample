package com.kt.hackathon.be.application.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kt.hackathon.be.application.dto.*;
import com.kt.hackathon.be.application.service.ApplicationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/hackathon/v1/applications")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Application", description = "해커톤 신청 및 접수 API")
public class ApplicationController {

  private final ApplicationService applicationService;

  /** 팀명 중복 확인 */
  @GetMapping("/check-team-name")
  @Operation(summary = "팀명 중복 확인", description = "입력된 팀명의 사용 가능 여부를 확인합니다.")
  public ResponseEntity<CommonResponseDto<TeamNameCheckResponseDto>> checkTeamName(
      @Parameter(description = "확인할 팀명") @RequestParam String teamName) {

    try {
      TeamNameCheckResponseDto result = applicationService.checkTeamName(teamName);
      return ResponseEntity.ok(CommonResponseDto.success(result));
    } catch (Exception e) {
      log.error("팀명 중복 확인 실패: {}", e.getMessage(), e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(CommonResponseDto.error("500", "팀명 중복 확인 중 오류가 발생했습니다."));
    }
  }

  /** 신청 생성 */
  @PostMapping
  @Operation(summary = "신청 생성", description = "새로운 해커톤 신청을 생성합니다.")
  public ResponseEntity<CommonResponseDto<ApplicationResponseDto>> createApplication(
      @Parameter(description = "신청 정보") @Valid @RequestBody ApplicationRequestDto requestDto) {

    try {
      ApplicationResponseDto result = applicationService.createApplication(requestDto);
      return ResponseEntity.status(HttpStatus.CREATED)
          .body(CommonResponseDto.success(result, "201"));
    } catch (IllegalArgumentException e) {
      log.warn("신청 생성 실패 (잘못된 요청): {}", e.getMessage());
      return ResponseEntity.badRequest().body(CommonResponseDto.error("400", e.getMessage()));
    } catch (Exception e) {
      log.error("신청 생성 실패: {}", e.getMessage(), e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(CommonResponseDto.error("500", "신청 생성 중 오류가 발생했습니다."));
    }
  }

  /** 신청 목록 조회 */
  @GetMapping
  @Operation(summary = "신청 목록 조회", description = "모든 해커톤 신청 목록을 조회합니다.")
  public ResponseEntity<CommonResponseDto<List<ApplicationResponseDto>>> getApplications() {

    try {
      List<ApplicationResponseDto> result = applicationService.getApplications();
      return ResponseEntity.ok(CommonResponseDto.success(result));
    } catch (Exception e) {
      log.error("신청 목록 조회 실패: {}", e.getMessage(), e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(CommonResponseDto.error("500", "신청 목록 조회 중 오류가 발생했습니다."));
    }
  }

  /** 신청 상세 조회 */
  @GetMapping("/{id}")
  @Operation(summary = "신청 상세 조회", description = "특정 해커톤 신청의 상세 정보를 조회합니다.")
  public ResponseEntity<CommonResponseDto<ApplicationResponseDto>> getApplication(
      @Parameter(description = "신청 ID") @PathVariable Long id) {

    try {
      ApplicationResponseDto result = applicationService.getApplication(id);
      return ResponseEntity.ok(CommonResponseDto.success(result));
    } catch (IllegalArgumentException e) {
      log.warn("신청 상세 조회 실패 (찾을 수 없음): {}", e.getMessage());
      return ResponseEntity.notFound().build();
    } catch (Exception e) {
      log.error("신청 상세 조회 실패: {}", e.getMessage(), e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(CommonResponseDto.error("500", "신청 상세 조회 중 오류가 발생했습니다."));
    }
  }

  /** 신청 수정 */
  @PutMapping("/{id}")
  @Operation(summary = "신청 수정", description = "기존 해커톤 신청 정보를 수정합니다.")
  public ResponseEntity<CommonResponseDto<ApplicationResponseDto>> updateApplication(
      @Parameter(description = "신청 ID") @PathVariable Long id,
      @Parameter(description = "수정할 신청 정보") @Valid @RequestBody ApplicationRequestDto requestDto) {

    try {
      ApplicationResponseDto result = applicationService.updateApplication(id, requestDto);
      return ResponseEntity.ok(CommonResponseDto.success(result));
    } catch (IllegalArgumentException e) {
      log.warn("신청 수정 실패 (잘못된 요청): {}", e.getMessage());
      return ResponseEntity.badRequest().body(CommonResponseDto.error("400", e.getMessage()));
    } catch (Exception e) {
      log.error("신청 수정 실패: {}", e.getMessage(), e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(CommonResponseDto.error("500", "신청 수정 중 오류가 발생했습니다."));
    }
  }

  /** 신청 삭제 */
  @DeleteMapping("/{id}")
  @Operation(summary = "신청 삭제", description = "기존 해커톤 신청을 삭제합니다.")
  public ResponseEntity<CommonResponseDto<Void>> deleteApplication(
      @Parameter(description = "신청 ID") @PathVariable Long id) {

    try {
      applicationService.deleteApplication(id);
      return ResponseEntity.noContent().build();
    } catch (IllegalArgumentException e) {
      log.warn("신청 삭제 실패 (찾을 수 없음): {}", e.getMessage());
      return ResponseEntity.notFound().build();
    } catch (Exception e) {
      log.error("신청 삭제 실패: {}", e.getMessage(), e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(CommonResponseDto.error("500", "신청 삭제 중 오류가 발생했습니다."));
    }
  }
}
