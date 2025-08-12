package com.kt.hackathon.be.application.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.kt.hackathon.be.application.dto.CommonResponseDto;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

  /** 유효성 검사 실패 예외 처리 */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<CommonResponseDto<Map<String, String>>> handleValidationExceptions(
      MethodArgumentNotValidException ex) {

    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult()
        .getAllErrors()
        .forEach(
            (error) -> {
              String fieldName = ((FieldError) error).getField();
              String errorMessage = error.getDefaultMessage();
              errors.put(fieldName, errorMessage);
            });

    log.warn("유효성 검사 실패: {}", errors);

    return ResponseEntity.badRequest()
        .body(CommonResponseDto.error("400", "입력 데이터 유효성 검사에 실패했습니다."));
  }

  /** IllegalArgumentException 처리 */
  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<CommonResponseDto<Void>> handleIllegalArgumentException(
      IllegalArgumentException ex) {

    log.warn("잘못된 요청: {}", ex.getMessage());

    return ResponseEntity.badRequest().body(CommonResponseDto.error("400", ex.getMessage()));
  }

  /** 일반적인 예외 처리 */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<CommonResponseDto<Void>> handleGeneralException(Exception ex) {

    log.error("예상치 못한 오류 발생: {}", ex.getMessage(), ex);

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(CommonResponseDto.error("500", "서버 내부 오류가 발생했습니다."));
  }
}
