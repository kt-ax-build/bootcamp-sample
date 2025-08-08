# AI Agentic Boot Camp 프론트엔드 테스트 시나리오

## 📋 프로젝트 정보
- **프로젝트명**: AI Agentic Boot Camp 해커톤 신청 사이트
- **테스트 환경**: React 19 + TypeScript + Vite + Material-UI
- **테스트 도구**: Jest (단위), Cypress (스모크)
- **상태관리**: Zustand (HackathonStore)
- **HTTP 클라이언트**: Axios

---

## 🧪 TC-UNIT (단위 테스트 시나리오)

### TC-UNIT-001: HackathonService.createApplication 테스트
- **목적**: 신청서 생성 API 호출 기능 검증
- **검증 항목**: 
  - 올바른 데이터로 API 호출 성공
  - 응답 데이터 형식 검증
  - 에러 처리 검증
- **도구**: Jest + React Testing Library

### TC-UNIT-002: HackathonService.getApplications 테스트
- **목적**: 신청서 목록 조회 API 호출 기능 검증
- **검증 항목**: 
  - 파라미터 없이 조회 성공
  - 검색 파라미터로 조회 성공
  - 400 에러 처리 (잘못된 검색 조건)
  - 404 에러 처리 (데이터 없음)
  - 기타 에러 처리
- **도구**: Jest + React Testing Library

### TC-UNIT-003: HackathonService.getApplication 테스트
- **목적**: 개별 신청서 조회 API 호출 기능 검증
- **검증 항목**: 
  - 올바른 ID로 조회 성공
  - 응답 데이터 형식 검증
  - 에러 처리 검증
- **도구**: Jest + React Testing Library

### TC-UNIT-004: HackathonService.updateApplication 테스트
- **목적**: 신청서 수정 API 호출 기능 검증
- **검증 항목**: 
  - 올바른 데이터로 수정 성공
  - 응답 데이터 형식 검증
  - 에러 처리 검증
- **도구**: Jest + React Testing Library

### TC-UNIT-005: HackathonService.deleteApplication 테스트
- **목적**: 신청서 삭제 API 호출 기능 검증
- **검증 항목**: 
  - 올바른 ID로 삭제 성공
  - 에러 처리 검증
- **도구**: Jest + React Testing Library

### TC-UNIT-006: HackathonStore 상태 관리 테스트
- **목적**: Zustand 스토어 상태 관리 기능 검증
- **검증 항목**: 
  - 초기 상태 설정
  - 로딩 상태 변경
  - 에러 상태 설정
  - 애플리케이션 목록 설정
  - 현재 애플리케이션 설정
- **도구**: Jest + React Testing Library

### TC-UNIT-007: HackathonStore API 액션 테스트
- **목적**: 스토어의 API 액션 기능 검증
- **검증 항목**: 
  - createApplication 액션 성공/실패
  - getApplications 액션 성공/실패
  - getApplication 액션 성공/실패
  - updateApplication 액션 성공/실패
  - deleteApplication 액션 성공/실패
- **도구**: Jest + React Testing Library

### TC-UNIT-008: HackathonStore 팀 관리 테스트
- **목적**: 팀 멤버 관리 기능 검증
- **검증 항목**: 
  - 팀 멤버 추가
  - 팀 멤버 삭제
  - 팀 멤버 수정
  - 팀 정보 업데이트
- **도구**: Jest + React Testing Library

### TC-UNIT-009: RegistrationSection 컴포넌트 렌더링 테스트
- **목적**: 신청서 등록 컴포넌트 렌더링 검증
- **검증 항목**: 
  - 컴포넌트 정상 렌더링
  - 폼 필드 존재 확인
  - 버튼 존재 확인
  - 초기 상태 검증
- **도구**: Jest + React Testing Library

### TC-UNIT-010: RegistrationSection 폼 입력 테스트
- **목적**: 신청서 등록 폼 입력 기능 검증
- **검증 항목**: 
  - 팀명 입력 처리
  - 아이디어 제목 입력 처리
  - 아이디어 설명 입력 처리
  - 팀 멤버 정보 입력 처리
  - 폼 유효성 검증
- **도구**: Jest + React Testing Library

### TC-UNIT-011: RegistrationSection 팀 멤버 관리 테스트
- **목적**: 팀 멤버 추가/삭제 기능 검증
- **검증 항목**: 
  - 팀 멤버 추가 버튼 동작
  - 팀 멤버 삭제 버튼 동작
  - 멤버 정보 입력 처리
  - 멤버 정보 수정 처리
- **도구**: Jest + React Testing Library

### TC-UNIT-012: RegistrationSection 폼 제출 테스트
- **목적**: 신청서 제출 기능 검증
- **검증 항목**: 
  - 폼 유효성 검증 성공 시 제출
  - 폼 유효성 검증 실패 시 에러 표시
  - 제출 중 로딩 상태 표시
  - 제출 성공 시 성공 메시지 표시
  - 제출 실패 시 에러 메시지 표시
- **도구**: Jest + React Testing Library

### TC-UNIT-013: Axios 인터셉터/설정 테스트(현 구현 기준)
- 목적: Axios 설정 및 인터셉터 등록 검증
- 검증 항목:
  - 타임아웃/헤더/baseURL 설정 검증
  - 요청/응답 인터셉터 등록 여부 확인
- 도구: Jest

---

## 🔄 TC-MODULE (모듈 테스트 시나리오)

### TC-MODULE-001: HackathonService API 모킹 테스트
- **목적**: API 호출 로직과 에러 처리 검증
- **검증 항목**: 
  - createApplication API 호출 성공/실패 시나리오
  - getApplications API 호출 성공/실패 시나리오
  - getApplication API 호출 성공/실패 시나리오
  - updateApplication API 호출 성공/실패 시나리오
  - deleteApplication API 호출 성공/실패 시나리오
  - 네트워크 에러 처리
- **도구**: Cypress Intercept

### TC-MODULE-002: HackathonStore API 연동 테스트
- **목적**: 스토어와 API 서비스 연동 검증
- **검증 항목**: 
  - API 호출 시 로딩 상태 변경
  - API 성공 시 상태 업데이트
  - API 실패 시 에러 상태 설정
  - 상태 초기화 기능
- **도구**: Cypress Intercept

### TC-MODULE-003: RegistrationSection API 연동 테스트
- **목적**: 신청서 등록 폼과 API 연동 검증
- **검증 항목**: 
  - 폼 제출 시 API 호출
  - API 성공 시 성공 메시지 표시
  - API 실패 시 에러 메시지 표시
  - 로딩 상태 표시
- **도구**: Cypress Intercept

### TC-MODULE-004: ConfirmationSection API 연동 테스트
- **목적**: 신청서 검색과 API 연동 검증
- **검증 항목**: 
  - 검색 시 API 호출
  - 검색 결과 표시
  - 검색 결과 없음 처리
  - 검색 에러 처리
  - 이메일로 검색
- **도구**: Cypress Intercept

---

## 🎯 TC-SMOKE (스모크 테스트 시나리오)

### TC-SMOKE-001: 해커톤 신청서 등록 플로우 테스트
**Given** 사용자가 해커톤 신청 페이지에 접속
**When** 팀 정보와 아이디어 정보를 입력하고 제출
**Then** 신청서가 성공적으로 등록되고 성공 메시지가 표시됨

**검증 세부사항**:
- 네비게이션을 통해 등록 섹션으로 이동
- 팀명 입력 필드에 유효한 팀명 입력
- 아이디어 제목 입력 필드에 아이디어 제목 입력
- 아이디어 설명 입력 필드에 아이디어 설명 입력
- 팀 멤버 정보 입력 (이름, 이메일, 역할 등)
- 추가 팀 멤버 추가 기능 사용
- 폼 제출 버튼 클릭
- 성공 메시지 확인
- 로딩 상태 표시 확인

### TC-SMOKE-002: 해커톤 신청서 검색 플로우 테스트
**Given** 사용자가 신청서 확인 페이지에 접속
**When** 팀명으로 신청서를 검색
**Then** 해당 팀의 신청서 정보가 표시됨

**검증 세부사항**:
- 네비게이션을 통해 확인 섹션으로 이동
- 검색 폼에 팀명 입력
- 검색 버튼 클릭
- 검색 결과 표시 확인
- 신청서 상세 정보 확인 (팀 정보, 아이디어 정보 등)

### TC-SMOKE-003: 해커톤 신청서 멤버명 검색 플로우 테스트
**Given** 사용자가 신청서 확인 페이지에 접속
**When** 멤버명으로 신청서를 검색
**Then** 해당 멤버가 포함된 팀의 신청서 정보가 표시됨

**검증 세부사항**:
- 네비게이션을 통해 확인 섹션으로 이동
- 검색 폼에 멤버명 입력
- 검색 버튼 클릭
- 검색 결과 표시 확인
- 해당 멤버가 포함된 팀 정보 확인

### TC-SMOKE-004: 해커톤 신청서 검색 결과 없음 테스트
**Given** 사용자가 신청서 확인 페이지에 접속
**When** 존재하지 않는 팀명으로 검색
**Then** 검색 결과 없음 메시지가 표시됨

**검증 세부사항**:
- 네비게이션을 통해 확인 섹션으로 이동
- 검색 폼에 존재하지 않는 팀명 입력
- 검색 버튼 클릭
- 검색 결과 없음 메시지 확인

### TC-SMOKE-005: 해커톤 신청서 폼 유효성 검증 테스트
**Given** 사용자가 해커톤 신청 페이지에 접속
**When** 필수 필드를 비워두고 제출
**Then** 유효성 검증 에러 메시지가 표시됨

**검증 세부사항**:
- 네비게이션을 통해 등록 섹션으로 이동
- 팀명 필드를 비워둠
- 아이디어 제목 필드를 비워둠
- 폼 제출 버튼 클릭
- 유효성 검증 에러 메시지 확인
- 필수 필드 하이라이트 확인

### TC-SMOKE-006: 해커톤 신청서 팀 멤버 관리 테스트
**Given** 사용자가 해커톤 신청 페이지에 접속
**When** 팀 멤버를 추가하고 삭제
**Then** 팀 멤버 목록이 올바르게 업데이트됨

**검증 세부사항**:
- 네비게이션을 통해 등록 섹션으로 이동
- 팀 멤버 추가 버튼 클릭
- 새 멤버 정보 입력 (이름, 이메일, 역할)
- 추가된 멤버 확인
- 멤버 삭제 버튼 클릭
- 삭제된 멤버 확인

### TC-SMOKE-007: 해커톤 신청서 네비게이션 테스트
**Given** 사용자가 해커톤 신청 사이트에 접속
**When** 네비게이션 메뉴를 클릭
**Then** 해당 섹션으로 스크롤되어 이동됨

**검증 세부사항**:
- 메인 페이지 로드
- 소개 메뉴 클릭
- 소개 섹션으로 스크롤 확인
- 참가 안내 메뉴 클릭
- 참가 안내 섹션으로 스크롤 확인
- 신청서 등록 메뉴 클릭
- 신청서 등록 섹션으로 스크롤 확인
- 신청서 확인 메뉴 클릭
- 신청서 확인 섹션으로 스크롤 확인

### TC-SMOKE-008: 해커톤 신청서 API 에러 처리 테스트
**Given** 사용자가 해커톤 신청 페이지에 접속
**When** 서버 에러가 발생하는 상황에서 폼 제출
**Then** 적절한 에러 메시지가 표시됨

**검증 세부사항**:
- 네비게이션을 통해 등록 섹션으로 이동
- 유효한 폼 데이터 입력
- 서버 에러 상황 시뮬레이션
- 폼 제출 버튼 클릭
- 에러 메시지 표시 확인
- 에러 상태에서 폼 재시도 가능 확인

---

## 📊 테스트 우선순위

### 높은 우선순위 (핵심 기능)
- TC-UNIT-001 ~ TC-UNIT-005: HackathonService API 호출 테스트
- TC-UNIT-006 ~ TC-UNIT-008: HackathonStore 상태 관리 테스트
- TC-UNIT-009 ~ TC-UNIT-012: RegistrationSection 폼 기능 테스트
- TC-MODULE-001 ~ TC-MODULE-004: API 연동 모듈 테스트
 - TC-SMOKE-001 ~ TC-SMOKE-002: 핵심 사용자 플로우 테스트

### 중간 우선순위 (사용자 경험)
- TC-UNIT-015 ~ TC-UNIT-017: UI 컴포넌트 테스트
- TC-UNIT-013: Axios 인터셉터/설정 테스트(현 구현 기준)
 - TC-SMOKE-003 ~ TC-SMOKE-006: 부가 기능 테스트
 - TC-SMOKE-007: 네비게이션 테스트

### 낮은 우선순위 (부가 기능)
 - TC-SMOKE-008: 에러 처리 테스트

---

## 📝 테스트 실행 순서

1. **단위 테스트 실행** (Jest)
   - TC-UNIT-001 ~ TC-UNIT-013

2. **모듈 테스트 실행** (Cypress Intercept)
   - TC-MODULE-001 ~ TC-MODULE-004

3. **스모크 테스트 실행** (Cypress)
   - TC-SMOKE-001 ~ TC-SMOKE-008

---

## ✅ 테스트 완료 기준

- **단위 테스트**: 모든 TC-UNIT 시나리오 통과
- **모듈 테스트**: 모든 TC-MODULE 시나리오 통과
- **스모크 테스트**: 모든 TC-SMOKE 시나리오 통과
- **타입 체크**: TypeScript 컴파일 오류 없음

---

## 📈 성공 지표

- **단위 테스트 커버리지**: [목표 없음 - 프론트엔드 제외]
- **모듈 테스트 통과율**: 100%
- **스모크 테스트 통과율**: 100%
- **타입 안정성**: TypeScript 오류 0개
- **성능 점수**: Lighthouse 90점 이상

---



## 📋 테스트 데이터

### 테스트용 신청서 데이터
```typescript
const mockApplication = {
  id: 1,
  team: {
    id: 1,
    teamName: "테스트팀",
    members: [
      {
        id: 1,
        name: "홍길동",
        email: "hong@test.com",
        phone: "010-1234-5678",
        role: "팀장",
        department: "개발팀",
        position: "개발자",
        isLeader: true
      }
    ]
  },
  ideaTitle: "AI 기반 해커톤 관리 시스템",
  ideaDescription: "해커톤 참가자들의 아이디어를 효율적으로 관리하는 시스템",
  problemStatement: "기존 해커톤 관리의 비효율성",
  solutionApproach: "AI 기술을 활용한 자동화",
  techStack: "React, TypeScript, Spring Boot, PostgreSQL",
  status: "PENDING",
  firstCreateDatetime: "2024-01-01T00:00:00Z",
  lastUpdateDatetime: "2024-01-01T00:00:00Z"
};
```

---

## ⚠️ 주의사항

- 실제 구현되지 않은 기능은 절대 포함하지 않음
- 전략 문서의 교육 환경 특성을 정확히 반영
- 접근성, 성능, 반응형 테스트는 제외
- 인증 관련 기능이 없으므로 제외
- 커버리지 목표는 백엔드만, 프론트엔드는 제외
- 테스트 환경 설정 코드는 포함하지 않음

 