## Story: 헤커톤 접수사이트 테스트 코드 작성

### 📋 Story 정보
- **Story 제목**: 헤커톤 접수사이트 테스트 코드 작성
- **기능 범위**: Full-Stack Test (Backend + Frontend)
- **Estimation**: 5
- **초과/미만 사유**: 기존 기능 위 테스트 자산 구축 중심
- **실제 Story Point**: 5
- **우선순위**: High
- **의존성**: BE/FE 기본 기능 구현 완료

### 🎯 Story 문장
“QA/개발자로서, 나는 헤커톤 접수사이트의 핵심 플로우를 유니트/모듈/스모크 테스트로 자동 검증하고 싶다. 그래야 회귀 시 안정적으로 품질을 보장할 수 있다.”

### ✅ Acceptance Criteria
- **Backend 단위 테스트**: 14개 통과 (서비스 로직/예외 포함)
- **Postman 컬렉션**: 17개 API 테스트 통과
- **Frontend 유니트 테스트**: TC-UNIT-001~013 통과
- **Frontend 모듈 테스트**: TC-MODULE-001~004 통과
- **Frontend 스모크 테스트**: TC-SMOKE-001~007 통과 (검색은 사전 시딩)

### 🧪 테스트 케이스
- **단위 테스트**
  - **Backend (JUnit/Mockito)**: 생성/목록/단건/수정/삭제, 팀 재사용/멤버 교체, 예외 시 빈 리스트
  - **Frontend (Jest/RTL)**:
    - Service API 호출: TC-UNIT-001~005
    - Store 상태/액션/팀 관리: TC-UNIT-006~008
    - RegistrationSection 렌더/입력/팀원 관리/제출 성공: TC-UNIT-009~012
    - Axios 설정: TC-UNIT-013
- **통합(API)**
  - Postman(Newman): 생성/조회(전체·팀명·멤버명)/단건/수정(팀명 제공/미제공)/삭제/엣지
- **E2E (Cypress)**
  - 스모크(실 호출): TC-SMOKE-001~007
  - 모듈(Intercept): TC-MODULE-001~004

### 📋 개발 체크리스트
- **Backend**
  - [ ] 단위 테스트 14개 작성/통과
  - [ ] Postman 컬렉션 17개 통과
- **Frontend**
  - [ ] 유니트 테스트 TC-UNIT-001~013 작성/통과
  - [ ] 모듈 테스트 TC-MODULE-001~004 작성/통과
  - [ ] 스모크 테스트 TC-SMOKE-001~007 작성/통과(검색 시딩 포함)
- **실행/환경**
  - [ ] FE 유니트: npm run test
  - [ ] 모듈: npm run test:module (FE dev 서버 필요)
  - [ ] 스모크: npm run test:smoke (FE/BE 서버 필요)
  - [ ] Newman: npm run test:api:cli

### 🔗 관련 문서
- `mdc_backend_test_generation_compact.md`
- `mdc_frontend_test_generation_compact.md`
- `Hackathon_API.postman_environment.json`
- `vite.config.ts`

