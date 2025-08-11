# Story 3: 신청 확인 기능 구현

## 📋 Story 정보

- **Story 제목**: 신청 확인 기능 구현
- **기능 범위**: Full-Stack
- **Estimation**: 8
- **초과/미만 사유**: 기본 8점 유지 (표준적인 폼 입력 및 파일 업로드 기능)
- **실제 Story Point**: 8
- **우선순위**: Medium
- **의존성**: Story 2 (팀 정보 입력 완료 후)

## 🎯 Story 문장

"사용자로서, 나는 참가 신청한 내용을 조회하고 수정 할수 있다."

## ✅ Acceptance Criteria

### 1. 신청 확인 섹션
- **Given** 메인페이지에 접속해서
- **When** 사용자가 페이지를 스크롤하면 
- **Then** 신청 및 접수 섹션 다음에 신청 확인 섹션이 표시된다:
  - 신청 조회
  - 신청 조회 안내
  - 상세내용은 피그마 참고 : https://www.figma.com/design/SklE8qQCS7NQ668BIKi3cB/%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84-%EC%8B%9C%EC%95%88--%EA%B3%B5%EC%9C%A0%EC%9A%A9-?node-id=1-419&m=dev
  
### 2. 신청 조회 하기
- **Given** 신청 확인 섹션에서
- **When** 팀명 또는 이메일을 입력하고 조회하기 버튼을 누르면
- **Then** 참가 신청한 내용이 표시된다.

## 🎨 UI/UX 요구사항

### 폼 디자인
- **레이아웃**: 섹션별 카드 형태로 구분
- **입력 필드**: Material-UI TextField


## 🔧 기술 요구사항

### Frontend 기술 스택
- **React 18.3** + **TypeScript 5.6**
- **Material-UI 6.3**: 폼 컴포넌트
- **React Hook Form**: 폼 상태 관리
- **Yup**: 유효성 검사 스키마
- **Axios**: API 통신

### Backend 기술 스택
- **Spring Boot 3.2.0**
- **Spring Validation**: 서버 사이드 유효성 검사
- **JPA/Hibernate**: 데이터베이스 연동
- **RESTful API**: 엔드포인트

### API 엔드포인트
```typescript
// 신청 생성
POST /api/hackathon/v1/applications

// 신청 목록 조회
GET /api/hackathon/v1/applications

// 신청 상세 조회
GET /api/hackathon/v1/applications/{id}

// 신청 수정
PUT /api/hackathon/v1/applications/{id}

// 신청 삭제
DELETE /api/hackathon/v1/applications/{id}
```

## 📋 개발 체크리스트

### Frontend
- [ ] 신청 확인 섹션 구현
- [ ] 신청 조회 폼 구현
- [ ] 조회하기 버튼 구현
- [ ] 조회 시 신청정보 표시 구현
- [ ] 신청 조회 안내 구현

### Backend
- [ ] 신청 정보 조회 API 구현


## 🔗 관련 문서
- [피그마 디자인](https://www.figma.com/design/SklE8qQCS7NQ668BIKi3cB/%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84-%EC%8B%9C%EC%95%88--%EA%B3%B5%EC%9C%A0%EC%9A%A9-?node-id=1-419&m=dev)
- [아키텍처 가이드](../.cursor/rules/mdcRules.md)
- [초기소스](../_backup/AI%20해커톤%20웹사이트/)
- [피그마 전체 디자인 캡쳐](../_backup/1920w_default.png)
- [데이터베이스 스키마](../.cursor/rules/DATABASE_SCHEMA.md)


---

**작성일**: 2025년 8월
**작성자**: AX Build TF
**버전**: 1.0
**상태**: Ready for Development
