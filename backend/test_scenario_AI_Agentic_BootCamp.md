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

#### 1.2 API 테스트 (Newman) - HackathonController

##### POST /api/hackathon/v1/applications (해커톤 애플리케이션 생성)
- **[TC-API-001] 정상적인 해커톤 애플리케이션 생성**
  - **요청**: POST /api/hackathon/v1/applications
  - **예상 응답**: HTTP 200 OK
  - **검증**: HTTP 상태 코드 200, 응답 데이터에 팀명과 아이디어 정보 포함, status가 PENDING인지 확인

- **[TC-API-002] 필수 정보 누락으로 애플리케이션 생성 실패**
  - **요청**: POST /api/hackathon/v1/applications
  - **예상 응답**: HTTP 500 Internal Server Error
  - **검증**: HTTP 상태 코드 500, 에러 메시지 포함 확인

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

### 2. 교육 환경 특화 가이드

#### 2.1 테스트 우선순위
1. **핵심 기능 우선**: CRUD 기능 중심 (생성, 조회, 수정, 삭제)
2. **단위 테스트 집중**: HackathonService 계층 70% 커버리지
3. **API 테스트 보완**: 전체 플로우 검증
4. **성능/보안 제외**: 교육 시간 제약 고려

#### 2.2 테스트 데이터 전략
- **타임스탬프 기반**: 유니크 값 생성으로 데이터 격리
- **Mock 객체 활용**: Repository 계층 Mock으로 외부 의존성 격리
- **트랜잭션 격리**: @Transactional, @Rollback 활용

#### 2.3 테스트 실행 전략
- **단위 테스트**: JUnit 5 + Mockito
- **API 테스트**: Newman (Postman Collection)
- **자동화**: Gradle 테스트 태스크

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