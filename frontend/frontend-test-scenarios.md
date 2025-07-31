# AI Agentic Boot Camp 프론트엔드 테스트 시나리오

## 📋 프로젝트 정보
- **프로젝트명**: AI Agentic Boot Camp 해커톤 신청 사이트
- **테스트 환경**: React + TypeScript + Vite
- **테스트 도구**: Jest (단위), Cypress (E2E)


---

## 🧪 TC-UNIT (단위 테스트 시나리오)

### TC-UNIT-001: App 컴포넌트 렌더링 테스트
- **목적**: App 컴포넌트가 모든 주요 섹션을 올바르게 렌더링하는지 확인
- **검증 항목**: Navigation, IntroSection, ParticipationSection, RegistrationSection, ConfirmationSection 렌더링
- **도구**: Jest + React Testing Library

### TC-UNIT-002: Navigation 컴포넌트 네비게이션 기능 테스트
- **목적**: 네비게이션 링크 클릭 시 해당 섹션으로 스크롤되는지 확인
- **검증 항목**: 로고 클릭, 참가하기 버튼 클릭, 스크롤 위치에 따른 활성 섹션 변경
- **도구**: Jest + React Testing Library

### TC-UNIT-003: RegistrationSection 폼 유효성 검증 테스트
- **목적**: 폼 입력 시 유효성 검증이 올바르게 동작하는지 확인
- **검증 항목**: 필수 필드 검증, 이메일 형식 검증, 팀명 중복 확인
- **도구**: Jest + React Testing Library

### TC-UNIT-004: RegistrationSection 팀원 관리 기능 테스트
- **목적**: 팀원 추가/삭제 기능이 올바르게 동작하는지 확인
- **검증 항목**: addMember, removeMember 함수 동작, 상태 업데이트
- **도구**: Jest + React Testing Library

### TC-UNIT-005: RegistrationSection 폼 제출 테스트
- **목적**: 폼 제출 시 API 호출과 응답 처리가 올바르게 동작하는지 확인
- **검증 항목**: HackathonService.createApplication 호출, 성공/실패 메시지 표시
- **도구**: Jest + React Testing Library

### TC-UNIT-006: ConfirmationSection 검색 기능 테스트
- **목적**: 검색 기능이 올바르게 동작하는지 확인
- **검증 항목**: 검색 조건 입력, API 호출, 결과 표시, 오류 처리
- **도구**: Jest + React Testing Library

### TC-UNIT-007: HackathonService API 메서드 테스트
- **목적**: 각 API 메서드가 올바른 엔드포인트를 호출하는지 확인
- **검증 항목**: createApplication, getApplications, getApplication, updateApplication, deleteApplication
- **도구**: Jest + Mock

### TC-UNIT-008: HackathonService 오류 처리 테스트
- **목적**: API 오류 시 적절한 에러 메시지를 반환하는지 확인
- **검증 항목**: 400, 404, 기타 오류 상황 처리
- **도구**: Jest + Mock

---

## 🔄 TC-MODULE (모듈 테스트 시나리오)

### TC-MODULE-001: 신청서 생성 API 모킹 테스트
- **목적**: 신청서 생성 API 호출 시뮬레이션 및 응답 처리 확인
- **검증 항목**: POST /api/hackathon/v1/applications 호출, 성공 응답 처리
- **도구**: Cypress Intercept

### TC-MODULE-002: 신청서 조회 API 모킹 테스트
- **목적**: 신청서 조회 API 호출 시뮬레이션 및 응답 처리 확인
- **검증 항목**: GET /api/hackathon/v1/applications 호출, 결과 표시
- **도구**: Cypress Intercept

### TC-MODULE-003: API 오류 상황 모킹 테스트
- **목적**: API 오류 상황에서의 UI 동작 확인
- **검증 항목**: 400, 500 오류 응답 처리, 오류 메시지 표시
- **도구**: Cypress Intercept

### TC-MODULE-004: HackathonService 성공 시나리오 테스트
- **목적**: 서비스 계층의 성공적인 API 호출 시 응답 처리 확인
- **검증 항목**: createApplication, getApplications 성공 시나리오
- **도구**: Cypress Intercept

### TC-MODULE-005: HackathonService 실패 시나리오 테스트
- **목적**: 서비스 계층의 실패한 API 호출 시 에러 처리 확인
- **검증 항목**: createApplication, getApplications 실패 시나리오
- **도구**: Cypress Intercept

---

## 🎯 TC-E2E (E2E 테스트 시나리오)

### TC-E2E-001: 전체 신청 플로우 테스트
**Given** 사용자가 해커톤 신청 페이지에 접속한다  
**When** 사용자가 팀 정보와 아이디어 정보를 입력하고 제출한다  
**Then** 신청서가 성공적으로 제출되고 성공 메시지가 표시된다

### TC-E2E-002: 신청서 조회 플로우 테스트
**Given** 사용자가 신청서 조회 페이지에 접속한다  
**When** 사용자가 팀명을 입력하고 검색한다  
**Then** 해당 팀의 신청서 정보가 표시된다

### TC-E2E-003: 팀원 관리 플로우 테스트
**Given** 사용자가 신청서 작성 페이지에 접속한다  
**When** 사용자가 팀원 추가 버튼을 클릭하고 새 팀원 정보를 입력한다  
**Then** 새로운 팀원 카드가 추가되고 정보가 올바르게 저장된다

### TC-E2E-004: 폼 유효성 검증 플로우 테스트
**Given** 사용자가 신청서 작성 페이지에 접속한다  
**When** 사용자가 필수 필드를 비워두고 제출을 시도한다  
**Then** 유효성 검증 오류 메시지가 표시되고 제출이 차단된다

### TC-E2E-005: 네비게이션 플로우 테스트
**Given** 사용자가 메인 페이지에 접속한다  
**When** 사용자가 네비게이션 메뉴의 각 섹션 링크를 클릭한다  
**Then** 해당 섹션으로 스크롤되고 활성 상태가 변경된다

### TC-E2E-006: 오류 처리 플로우 테스트
**Given** 네트워크 오류나 서버 오류 상황이 발생한다  
**When** 사용자가 신청서 제출이나 조회를 시도한다  
**Then** 적절한 오류 메시지가 표시되고 사용자에게 안내가 제공된다

---

## 📊 테스트 우선순위

### 높은 우선순위 (핵심 기능)
- **TC-UNIT-003**: 폼 유효성 검증 (필수)
- **TC-UNIT-005**: 폼 제출 기능 (필수)
- **TC-UNIT-006**: 검색 기능 (필수)
- **TC-MODULE-001**: 신청서 생성 API (필수)
- **TC-MODULE-002**: 신청서 조회 API (필수)
- **TC-E2E-001**: 전체 신청 플로우 (필수)
- **TC-E2E-002**: 신청서 조회 플로우 (필수)

### 중간 우선순위 (사용자 경험)
- **TC-UNIT-002**: 네비게이션 기능 (중요)
- **TC-UNIT-004**: 팀원 관리 기능 (중요)
- **TC-UNIT-007**: API 메서드 테스트 (중요)
- **TC-MODULE-003**: API 오류 처리 (중요)
- **TC-MODULE-004**: 서비스 성공 시나리오 (중요)
- **TC-E2E-003**: 팀원 관리 플로우 (중요)
- **TC-E2E-004**: 폼 유효성 검증 플로우 (중요)
- **TC-E2E-005**: 네비게이션 플로우 (중요)

### 낮은 우선순위 (부가 기능)
- **TC-UNIT-001**: App 컴포넌트 렌더링 (선택)
- **TC-UNIT-008**: 서비스 오류 처리 (선택)
- **TC-MODULE-005**: 서비스 실패 시나리오 (선택)
- **TC-E2E-006**: 오류 처리 플로우 (선택)

---

## 📝 테스트 실행 순서

1. **단위 테스트 실행** (Jest)
   - TC-UNIT-001 ~ TC-UNIT-008

2. **모듈 테스트 실행** (Cypress Intercept)
   - TC-MODULE-001 ~ TC-MODULE-005

3. **E2E 테스트 실행** (Cypress)
   - TC-E2E-001 ~ TC-E2E-006

---

## ✅ 테스트 완료 기준

- **단위 테스트**: 모든 TC-UNIT 시나리오 통과
- **모듈 테스트**: 모든 TC-MODULE 시나리오 통과
- **E2E 테스트**: 모든 TC-E2E 시나리오 통과

 