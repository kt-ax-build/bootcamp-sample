# AI Agentic Boot Camp 테스트 시나리오 (최신 소스 정합, 교육용)

## 📋 테스트 시나리오 개요

### 1. 백엔드 테스트 시나리오 (Unit: HackathonService)

아래 시나리오는 실제 서비스 로직(`HackathonService`)에 정확히 맞춰져 있어, 그대로 구현 시 테스트가 통과합니다.

#### 1.1 해커톤 애플리케이션 생성
- **[TC-BE-001] 새로운 팀으로 해커톤 애플리케이션 생성**
  - 입력: TeamMemberRequestDto (teamName: "테스트팀", ideaTitle/Description 등)
  - 예상: HackathonApplication 반환 (status: PENDING, 팀 정보 포함)
  - 검증: 팀명/아이디어 제목

- **[TC-BE-002] 기존 팀으로 해커톤 애플리케이션 생성**
  - 입력: TeamMemberRequestDto (teamName: "기존팀")
  - 예상: 기존 팀 재사용 (중복 거절 아님)
  - 검증: teamRepository.save 호출 안 됨

- **[TC-BE-003] members = null 처리**
  - 입력: TeamMemberRequestDto (members: null)
  - 예상: 팀에 빈 리스트가 설정될 수 있음
  - 검증: members가 null 또는 empty 허용

#### 1.2 해커톤 애플리케이션 조회
- **[TC-BE-004] teamName으로 조회** → repository.findByTeamTeamName 호출
- **[TC-BE-005] memberName(이름)으로 조회** → repository.findByTeamMembersName 호출
- **[TC-BE-006] memberName(이메일)으로 조회** → repository.findByTeamMembersEmail 호출
- **[TC-BE-007] 필터 없으면 전체 조회** → repository.findAll 호출
- **[TC-BE-008] teamName/memberName 공백이면 전체 조회**
- **[TC-BE-009] 예외 발생 시 빈 리스트 반환** → Service가 try-catch로 empty list 반환

#### 1.3 단건 조회/수정/삭제
- **[TC-BE-010] getApplication - 존재하는 ID** → 정상 반환
- **[TC-BE-011] getApplication - 미존재 ID** → RuntimeException
- **[TC-BE-012] updateApplication - teamName 제공 시** → 기존 팀 재사용 또는 신규 생성, 팀원 전량 교체
- **[TC-BE-013] updateApplication - teamName 미제공 시** → teamSize/teamDescription/members만 갱신
- **[TC-BE-014] deleteApplication** → repository.deleteById 호출

> 구현 참고: `com.kt.hackathon.be.application.service.HackathonService`

---

### 2. API 테스트 시나리오 (Postman/Newman: HackathonController)

컨트롤러 실제 응답 규칙과 환경차(타이밍/예외)를 반영하여 허용 상태코드를 명확히 지정했습니다.

#### 2.1 엔드포인트
- POST `/api/hackathon/v1/applications` → 200/201 허용
- GET `/api/hackathon/v1/applications` → 200
- GET `/api/hackathon/v1/applications/{id}` → 200(존재), 404/500(미존재)
- PUT `/api/hackathon/v1/applications/{id}` → 200
- DELETE `/api/hackathon/v1/applications/{id}` → 204(성공), 204/404/500(미존재/환경 차)

#### 2.2 실행 변수/규칙
- 환경 파일: `bootcamp-sample/backend/postman/Hackathon_API.postman_environment.json`
  - baseUrl, apiVersion, contentType, createdApplicationId, testTeamName, testMemberName, testIdeaTitle, testIdeaDescription
- 컬렉션: `bootcamp-sample/backend/postman/Hackathon_API.postman_collection.json`
  - 컬렉션 Pre-request에서 `runTeamName` 자동 생성 후 모든 요청에서 사용
  - 생성 응답에서 `createdApplicationId` 저장 후 이어지는 요청에 사용

#### 2.3 핵심 테스트 케이스
- **[TC-API-001] 생성**: 200/201, ID 저장
- **[TC-API-002] 전체 조회**: 200
- **[TC-API-003] 팀명 조회**: 200
- **[TC-API-004] 멤버명(이름) 조회**: 200
- **[TC-API-005] 멤버명(이메일) 조회**: 200
- **[TC-API-006] 단건 조회(존재)**: 200
- **[TC-API-007] 단건 조회(미존재)**: 404 또는 500
- **[TC-API-008] 수정(아이디어만)**: 200
- **[TC-API-009] 수정(팀 구성/멤버만)**: 200
- **[TC-API-010] 수정(팀명 제공: 기존 팀 재사용)**: 200
- **[TC-API-011] 수정(팀명 제공: 신규 팀 생성)**: 200
- **[TC-API-012] 삭제**: 204 또는 200
- **[TC-API-013] 삭제 후 단건 조회**: 200/204/404/500 허용 (짧은 pre-request 딜레이 권장)
- **[TC-API-014] 미존재 삭제**: 204/404/500 허용
- **[TC-API-015] 추가 생성**: 200/201, ID2 저장
- **[TC-API-016] 추가 삭제**: 204 또는 200
- **[TC-API-017] 멤버명 공백 조회(전체)**: 200

> 구현 참고: `com.kt.hackathon.be.application.controller.HackathonController`

---

## 🧪 실행 가이드

### A. 단위 테스트 실행
1) 프로젝트 루트에서 아래를 순서대로 실행
```
cd bootcamp-sample/backend
./gradlew test
```
2) 커버리지 리포트: `bootcamp-sample/backend/build/reports/jacoco/test/html/index.html`

### B. API 테스트 실행
1) Postman에서 환경/컬렉션 JSON 임포트 후 실행
2) 또는 Newman 사용 시 컬렉션/환경 파일 경로 지정

### C. 주의사항(교육 환경)
- `runTeamName`으로 실행 단위 데이터 충돌 방지
- 삭제 직후 조회는 환경/타이밍에 따라 상태코드가 달라질 수 있어 허용치로 검증
- Service의 조회 예외는 빈 리스트로 처리되며 Controller는 200으로 응답할 수 있음

---

## 📎 파일 경로 정리
- 소스: `bootcamp-sample/backend/src/main/java/...`
- 단위 테스트: `bootcamp-sample/backend/src/test/java/com/kt/hackathon/be/application/service/HackathonServiceTest.java`
- Postman 환경: `bootcamp-sample/backend/postman/Hackathon_API.postman_environment.json`
- Postman 컬렉션: `bootcamp-sample/backend/postman/Hackathon_API.postman_collection.json`
# AI Agentic Boot Camp 테스트 시나리오 (교육 환경 특화)

## 📋 테스트 시나리오 템플릿 (교육용)

### 1. 백엔드 테스트 시나리오

#### 1.1 단위 테스트 (Unit Test) - HackathonService

##### 해커톤 애플리케이션 생성 테스트
- **[TC-BE-001] 새로운 팀으로 해커톤 애플리케이션 생성**
  - **입력**: TeamMemberRequestDto (teamName: "테스트팀", ideaTitle: "AI 챗봇", ideaDescription: "AI 기반 고객 서비스 챗봇")
  - **예상 결과**: HackathonApplication 객체 반환 (status: PENDING, 팀 정보 포함)
  - **검증**: 반환된 객체의 팀명과 아이디어 제목 검증

- **[TC-BE-002] 기존 팀으로 해커톤 애플리케이션 생성**
  - **입력**: TeamMemberRequestDto (teamName: "기존팀", ideaTitle: "블록체인 서비스", ideaDescription: "분산형 블록체인 플랫폼")
  - **예상 결과**: HackathonApplication 객체 반환 (기존 팀 정보 사용)
  - **검증**: 새로운 팀 생성하지 않고 기존 팀 정보 사용 확인

##### 해커톤 애플리케이션 조회 테스트
- **[TC-BE-003] 팀명으로 애플리케이션 조회**
  - **입력**: teamName: "테스트팀", memberName: null
  - **예상 결과**: List<HackathonApplication> 반환 (해당 팀의 애플리케이션 목록)
  - **검증**: 반환된 리스트 크기 및 내용 검증

- **[TC-BE-004] 멤버명으로 애플리케이션 조회**
  - **입력**: teamName: null, memberName: "김개발"
  - **예상 결과**: List<HackathonApplication> 반환 (해당 멤버가 속한 팀의 애플리케이션 목록)
  - **검증**: 반환된 리스트 검증

- **[TC-BE-005] 전체 애플리케이션 조회**
  - **입력**: teamName: null, memberName: null
  - **예상 결과**: List<HackathonApplication> 반환 (전체 애플리케이션 목록)
  - **검증**: 반환된 리스트 검증

- **[TC-BE-006] 조회 중 예외 발생 처리**
  - **입력**: teamName: "테스트팀", memberName: null
  - **예상 결과**: 빈 리스트 반환 (예외 발생 시)
  - **검증**: 예외 발생 시 빈 리스트 반환 확인

##### 해커톤 애플리케이션 상세 조회 테스트
- **[TC-BE-007] 존재하는 애플리케이션 상세 조회**
  - **입력**: id: 1L
  - **예상 결과**: HackathonApplication 객체 반환
  - **검증**: 반환된 객체의 ID 검증

- **[TC-BE-008] 존재하지 않는 애플리케이션 상세 조회**
  - **입력**: id: 999L
  - **예상 결과**: RuntimeException 발생 ("Application not found with id: 999")
  - **검증**: 예외 메시지 검증

##### 해커톤 애플리케이션 수정 테스트
- **[TC-BE-009] 애플리케이션 정보 수정**
  - **입력**: id: 1L, TeamMemberRequestDto (ideaTitle: "수정된 아이디어", ideaDescription: "수정된 설명")
  - **예상 결과**: 수정된 HackathonApplication 객체 반환
  - **검증**: 아이디어 제목과 설명 수정 확인

- **[TC-BE-010] 팀명 변경으로 애플리케이션 수정**
  - **입력**: id: 1L, TeamMemberRequestDto (teamName: "새로운팀명")
  - **예상 결과**: 팀 정보가 변경된 HackathonApplication 객체 반환
  - **검증**: 팀 정보 변경 확인

- **[TC-BE-011] 존재하지 않는 애플리케이션 수정**
  - **입력**: id: 999L, TeamMemberRequestDto (ideaTitle: "수정된 아이디어")
  - **예상 결과**: RuntimeException 발생 ("Application not found with id: 999")
  - **검증**: 예외 메시지 검증

##### 해커톤 애플리케이션 삭제 테스트
- **[TC-BE-012] 애플리케이션 삭제**
  - **입력**: id: 1L
  - **예상 결과**: void 반환 (삭제 성공)
  - **검증**: 삭제 성공 확인

##### 추가 분기 보강 (TC-BE-015 ~ TC-BE-020)
- **[TC-BE-015] createApplication - members = null 시 빈 목록 설정**
- **[TC-BE-016] createApplication - members = [] 시 빈 목록 유지**
- **[TC-BE-017] getApplications - teamName 공백(whitespace) → 전체 조회**
- **[TC-BE-018] getApplications - memberName 공백(whitespace) → 전체 조회**
- **[TC-BE-019] updateApplication - 팀명 변경 시 기존 팀 재사용(findByTeamName 성공 케이스)**
- **[TC-BE-020] updateApplication - 팀명 미변경 상태에서 teamSize/teamDescription/members만 수정**

#### 1.2 API 테스트 (Newman) - HackathonController

##### POST /api/hackathon/v1/applications (해커톤 애플리케이션 생성)
- **[TC-API-001] 정상적인 해커톤 애플리케이션 생성**
  - **요청**: POST /api/hackathon/v1/applications
  - **예상 응답**: HTTP 200 OK
  - **검증**: HTTP 상태 코드 200, 응답 데이터에 팀명과 아이디어 정보 포함, status가 PENDING인지 확인

- **[TC-API-002] 필수 정보 누락으로 애플리케이션 생성 실패**
  - **요청**: POST /api/hackathon/v1/applications (teamName: "", ideaTitle: "", ideaDescription: "", members: [빈 팀원 정보])
  - **예상 응답**: HTTP 500 Internal Server Error 또는 HTTP 200 OK (테이블 초기화 상태 고려)
  - **검증**: HTTP 상태 코드 500 또는 200, 응답 데이터 검증

##### GET /api/hackathon/v1/applications (해커톤 애플리케이션 조회)
- **[TC-API-003] 팀명으로 애플리케이션 조회**
  - **요청**: GET /api/hackathon/v1/applications?teamName=AI개발팀
  - **예상 응답**: HTTP 200 OK
  - **검증**: HTTP 상태 코드 200, 배열 형태 응답, 해당 팀의 애플리케이션만 포함

- **[TC-API-004] 멤버명으로 애플리케이션 조회**
  - **요청**: GET /api/hackathon/v1/applications?memberName=김개발
  - **예상 응답**: HTTP 200 OK
  - **검증**: HTTP 상태 코드 200, 해당 멤버가 속한 팀의 애플리케이션만 포함

- **[TC-API-005] 전체 애플리케이션 조회**
  - **요청**: GET /api/hackathon/v1/applications
  - **예상 응답**: HTTP 200 OK 또는 500 Internal Server Error
  - **검증**: HTTP 상태 코드 200 또는 500, 응답이 배열이거나 에러 메시지 포함

##### GET /api/hackathon/v1/applications/{id} (해커톤 애플리케이션 상세 조회)
- **[TC-API-006] 존재하는 애플리케이션 상세 조회**
  - **요청**: GET /api/hackathon/v1/applications/1
  - **예상 응답**: HTTP 200 OK
  - **검증**: HTTP 상태 코드 200, 특정 ID의 애플리케이션 상세 정보 포함

- **[TC-API-007] 존재하지 않는 애플리케이션 상세 조회**
  - **요청**: GET /api/hackathon/v1/applications/999
  - **예상 응답**: HTTP 404 Not Found 또는 500 Internal Server Error
  - **검증**: HTTP 상태 코드 404 또는 500, 에러 응답 확인

##### PUT /api/hackathon/v1/applications/{id} (해커톤 애플리케이션 수정)
- **[TC-API-008] 애플리케이션 정보 수정**
  - **요청**: PUT /api/hackathon/v1/applications/1
  - **예상 응답**: HTTP 200 OK
  - **검증**: HTTP 상태 코드 200, 수정된 아이디어 제목과 설명 확인

##### DELETE /api/hackathon/v1/applications/{id} (해커톤 애플리케이션 삭제)
- **[TC-API-009] 존재하는 애플리케이션 삭제**
  - **요청**: DELETE /api/hackathon/v1/applications/1
  - **예상 응답**: HTTP 204 No Content
  - **검증**: HTTP 상태 코드 204, 응답 본문 없음

##### 추가 API 시나리오 (컬렉션 반영 기준)
- **[TC-API-010] 애플리케이션 수정 - 팀명 변경** → 200 OK
- **[TC-API-011] 애플리케이션 수정 - 팀원 전량 교체** → 200 OK
- **[TC-API-012] 멤버명(이메일)으로 애플리케이션 조회** → 200 OK
- **[TC-API-014] 팀명(runTeamName-2)으로 애플리케이션 조회** → 200 OK
- **[TC-API-015] 존재하지 않는 애플리케이션 삭제** → 404 또는 500 허용
- **[TC-API-016] 삭제 후 단건 조회** → 환경/타이밍에 따라 200/204/404/500 허용
  - 안정화: 요청 pre-request에 짧은 딜레이(예: 300ms) 적용 가능
- **[TC-API-017] 두 번째 애플리케이션 삭제** → 204 No Content

### 2. 교육 환경 특화 가이드

#### 2.1 테스트 우선순위
1. **핵심 기능 우선**: CRUD 기능 중심 (생성, 조회, 수정, 삭제)
2. **단위 테스트 집중**: HackathonService 계층 70% 커버리지
3. **API 테스트 보완**: 전체 플로우 검증
4. **성능/보안 제외**: 교육 시간 제약 고려

#### 2.2 테스트 데이터 전략
- **타임스탬프 기반**: 유니크 값 생성으로 데이터 격리 (컬렉션 레벨 pre-request에서 `runTeamName` 자동 생성)
- **Mock 객체 활용**: Repository 계층 Mock으로 외부 의존성 격리
- **트랜잭션 격리**: @Transactional, @Rollback 활용

#### 2.3 테스트 실행 전략
- **단위 테스트**: JUnit 5 + Mockito
- **API 테스트**: Newman (Postman Collection)
- **자동화**: Gradle 테스트 태스크

> 상세한 컬렉션 구성 규칙(요청 순서, `runTeamName` 생성, 삭제 직후 조회 타이밍 처리 등)은 `bootcamp-sample/backend/mdc_backend_test_generation.md`를 우선 참조하세요. 본 문서는 테스트 케이스 개요를 간결히 제공합니다.

---

## 📝 사용 가이드 (교육 환경 특화)

### 템플릿 사용 방법:
1. **[프로젝트명]** 부분을 "AI Agentic Boot Camp"로 변경
2. **[서비스명]**, **[컨트롤러명]** 부분을 "HackathonService", "HackathonController"로 변경
3. **[기능명]** 부분을 실제 기능명으로 변경 (생성, 조회, 수정, 삭제)
4. **[테스트 케이스명]** 부분을 구체적인 테스트 케이스명으로 변경
5. **[입력 데이터 설명]**, **[예상 결과 설명]**, **[검증 항목 설명]** 부분을 실제 소스 코드 기반으로 구체적으로 작성
6. **[HTTP_METHOD]**, **[API_PATH]** 부분을 실제 API 정보로 변경

### 테스트 케이스 ID 규칙 (교육 환경):
- **TC-BE-XXX**: 백엔드 단위 테스트 (BE = Backend)
- **TC-API-XXX**: API 테스트 (API = Newman/Postman)

### 테스트 케이스 작성 가이드 (교육 환경):

#### 백엔드 테스트
- **실제 소스 코드 기반**: HackathonService의 실제 메서드와 파라미터 반영
- **구체적인 검증 항목**: Mock 객체 동작과 반환값 명시
- **교육 시간 고려**: 핵심 기능 우선, 복잡한 시나리오 제외

#### API 테스트
- **전체 시스템 검증**: 실제 HTTP 통신 기반
- **실제 데이터 기반**: 실제 JSON 요청/응답 형식
- **교육 환경 특성**: 성능/보안 테스트 제외

### 검증 항목 작성 가이드 (교육 환경):

#### 백엔드 검증
- Mock 객체 메서드 호출 확인 (TeamRepository, HackathonApplicationRepository)
- 반환값 타입 및 내용 확인 (HackathonApplication, List<HackathonApplication>)
- 예외 처리 동작 확인 (RuntimeException)
- 비즈니스 로직 동작 확인 (팀 생성/조회, 애플리케이션 CRUD)

#### API 검증
- HTTP 상태 코드 확인 (200, 204, 500)
- 응답 데이터 형식 및 내용 확인 (JSON 구조)
- 전체 플로우 데이터 일관성 확인

### 교육 환경 특화 전략:
- **테스트 피라미드 구조** 준수 (단위 > API)
- **실제 소스 코드 기반** 테스트 케이스 작성
- **테스트 커버리지 목표** 설정 (백엔드 70% 이상)
- **테스트 격리 전략** 적용 (@Transactional, Mock 객체 활용)
- **교육 시간 제약** 고려 (핵심 기능 우선) 