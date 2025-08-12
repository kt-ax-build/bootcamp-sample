package com.kt.hackathon.be.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommonResponseDto<T> {

  private Boolean successOrNot;
  private String statusCode;
  private T data;

  public static <T> CommonResponseDto<T> success(T data) {
    return CommonResponseDto.<T>builder().successOrNot(true).statusCode("200").data(data).build();
  }

  public static <T> CommonResponseDto<T> success(T data, String statusCode) {
    return CommonResponseDto.<T>builder()
        .successOrNot(true)
        .statusCode(statusCode)
        .data(data)
        .build();
  }

  public static <T> CommonResponseDto<T> error(String statusCode, String message) {
    return CommonResponseDto.<T>builder()
        .successOrNot(false)
        .statusCode(statusCode)
        .data(null)
        .build();
  }
}
