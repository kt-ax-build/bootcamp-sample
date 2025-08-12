### AI Agentic Boot Camp 백엔드 테스트 코드 생성 MDC

- 목적: 현재 소스와 테스트 시나리오만으로 단위 테스트 + API 테스트 산출물을 자동 생성
- 입력(제공됨)
  - 소스: `bootcamp-sample/backend/src/main/java/...`
  - 시나리오: `bootcamp-sample/backend/test_scenario_AI_Agentic_BootCamp.md`
- 전제(동일 유지)
  - Gradle/Jacoco/Spotless 설정 유지, Postman 환경 JSON 유지, DB/포트 구성 유지

## 생성 산출물

- 단위 테스트
  - 경로: `bootcamp-sample/backend/src/test/java/com/kt/hackathon/be/application/service/HackathonServiceTest.java`
  - 대상: `HackathonService`
  - 프레임워크: JUnit 5 + Mockito
  - Mock: `HackathonApplicationRepository`, `TeamRepository`

- API 테스트
  - 컬렉션: `bootcamp-sample/backend/postman/Hackathon_API.postman_collection.json`
  - 환경: `bootcamp-sample/backend/postman/Hackathon_API.postman_environment.json` (기존 키 그대로)

## 구현 스냅샷(소스 정합)

- Controller `HackathonController`
  - POST `/applications` → 200/500
  - GET `/applications` → 200 (Service 예외 시에도 빈 리스트로 200)
  - GET `/applications/{id}` → 200 or 404
  - PUT `/applications/{id}` → 200/500
  - DELETE `/applications/{id}` → 204/500

- Service `HackathonService`
  - create: 팀명 중복 시 재사용, `members == null` 허용
  - list: teamName(트림/비공백) > memberName(이메일/이름) > 전체, 예외 시 빈 리스트
  - get: 미존재 시 RuntimeException
  - update: teamName 제공 시 기존 팀 재사용/신규 생성 및 팀원 전량 교체, 미제공 시 구성/팀원만 갱신
  - delete: `deleteById`

## 단위 테스트 요구사항

- 구성
  - `@ExtendWith(MockitoExtension.class)`, Given-When-Then, `@DisplayName` TC 표기
  - 검증: 반환값/필드/리스트 크기/예외/`verify` 상호작용

- 케이스(14)
  - TC-BE-001: create - 새 팀 생성, app 저장 확인
  - TC-BE-002: create - 기존 팀 재사용(팀 save 미호출)
  - TC-BE-003: create - members=null → 빈 리스트 허용
  - TC-BE-004: list - teamName → `findByTeamTeamName`
  - TC-BE-005: list - memberName(이름) → `findByTeamMembersName`
  - TC-BE-006: list - memberName(이메일) → `findByTeamMembersEmail`
  - TC-BE-007: list - 필터 없음 → `findAll`
  - TC-BE-008: list - 공백 문자열 → 전체 조회
  - TC-BE-009: list - 예외 발생 → 빈 리스트
  - TC-BE-010: get - 존재하는 ID
  - TC-BE-011: get - 미존재 ID → RuntimeException
  - TC-BE-012: update - teamName 제공 시 기존 팀 재사용, 팀원 교체
  - TC-BE-013: update - teamName 미제공 시 구성/팀원만 갱신
  - TC-BE-014: delete - `deleteById` 호출

## API 테스트 요구사항

- 컬렉션 레벨 Pre-request 스크립트
```javascript
if (!pm.environment.get('runTeamName')) {
  const base = pm.environment.get('testTeamName') || 'AI개발팀';
  pm.environment.set('runTeamName', base + '-' + Date.now());
}
```

- 공통 규칙
  - URL 베이스: `{{baseUrl}}/api/hackathon/{{apiVersion}}`
  - 헤더: `Content-Type: {{contentType}}`
  - 생성 응답 ID 저장
```javascript
pm.test("200 or 201", function () {
  pm.expect([200, 201]).to.include(pm.response.code);
});
const json = pm.response.json();
pm.expect(json).to.have.property("id");
pm.environment.set("createdApplicationId", String(json.id));
```

- 케이스(17)
  - 생성(200/201, ID 저장) / 전체 조회(200)
  - 팀명 조회(200, 각 항목 `team.teamName == runTeamName`)
  - 멤버명 조회(이름/이메일, 200)
  - 단건 조회(존재 200, 미존재 404/500)
  - 수정(팀명 제공: 멤버 교체 200, 팀명 미제공: 구성/멤버/아이디어 갱신 200)
  - 삭제(204/200)
  - 삭제 후 단건 조회(200/204/404/500, pre-request 300ms 딜레이 권장)
  - 미존재 삭제(204/404/500)
  - 추가 생성/삭제(200/201 → 204/200)
  - 빈/공백 필터 조회(200)
  - 존재하지 않는 팀명 조회(200, 배열 0 허용)

## 실행 가이드

- 단위 테스트: `cd bootcamp-sample/backend && ./gradlew test`
- 커버리지 HTML: `bootcamp-sample/backend/build/reports/jacoco/test/html/index.html`
- API 테스트: 서버 기동 후 `npm run test:api:cli` (또는 `npx newman run ...`)

## 제약/품질

- 빌드/환경/소스 로직 변경 금지, 기존 변수 키 그대로 사용
- Service 계층 커버리지 70% 목표(Jacoco에 service만 포함)
- 데이터 충돌 방지: 모든 생성/조회/수정 팀명에 `{{runTeamName}}` 사용

## 완료 조건

- 단위 테스트 14개와 API 17개가 통과
- 컬렉션 JSON 유효성 확보(JSON 파싱 오류 없음)
- 실행 가이드에 따라 재현 가능


