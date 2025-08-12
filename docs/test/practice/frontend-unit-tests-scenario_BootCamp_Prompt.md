### 프론트엔드 유니트 테스트 교육용 시나리오 (TC-UNIT-001~005: HackathonService)

- 목적: HackathonService의 API 호출 로직과 에러 처리 흐름을 Jest로 검증
- 범위: Create/List/Get/Update/Delete 성공/실패 및 메시지 매핑(getApplications의 400/404/기타)
- 테스트 러너: Jest(jsdom) + ts-jest
- 경로: `bootcamp-sample/frontend/src/services/__tests__/HackathonService.test.ts`

#### 선행조건
- 프론트엔드 저장소 위치: `bootcamp-sample/frontend`
- 설정: `jest.config.js`(jsdom/ts-jest), `src/setupTests.ts` 존재
- 의존성: `jest`, `jest-environment-jsdom`, `ts-jest`, `@types/jest`

#### 공통
- axios 인스턴스 모킹으로 `import.meta.env` 이슈 우회 및 네트워크 격리
  - 경로: `../../api/axios`
  - 인터셉터/기본설정(dummy) 포함, 메서드(`post/get/put/delete`)는 `jest.fn()`으로 대체
- 공용 목업 데이터: 아래 `buildApplication` 또는 동등 구조 사용

#### 케이스 목록 (TC-UNIT-001~005)
- U1 createApplication 성공: POST 호출 파라미터/URL 검증, 응답 데이터 반환 확인
- U2 createApplication 실패: 예외 전파 확인
- U3 getApplications 성공(무파라미터): GET 호출 옵션 중 `timeout:10000` 포함 및 데이터 반환 확인
- U4 getApplications 성공(검색 파라미터): `params` 포함 호출 및 데이터 반환 확인
- U5 getApplications 실패(400): 에러 메시지 `'검색 조건이 올바르지 않습니다.'` 매핑 확인
- U6 getApplications 실패(404): 에러 메시지 `'해당 정보를 찾을 수 없습니다.'` 매핑 확인
- U7 getApplications 실패(기타/네트워크): 에러 메시지 `'조회 중 오류가 발생했습니다.'` 매핑 확인
- U8 getApplication 성공: URL `/applications/:id`로 GET 호출 및 데이터 반환 확인
- U9 getApplication 실패: 예외 전파 확인
- U10 updateApplication 성공: URL/바디 확인, 응답 데이터 반환
- U11 updateApplication 실패: 예외 전파 확인
- U12 deleteApplication 성공: URL `/applications/:id`로 DELETE 호출, `void` 반환
- U13 deleteApplication 실패: 예외 전파 확인

#### 목업 데이터(예)
```ts
export const buildApplication = (overrides: Record<string, any> = {}) => ({
  id: 1,
  team: {
    id: 10,
    teamName: '테스트팀',
    members: [
      { id: 100, name: '홍길동', email: 'hong@test.com', role: '팀장', isLeader: true },
    ],
  },
  ideaTitle: '아이디어 제목',
  ideaDescription: '아이디어 설명',
  status: 'PENDING',
  firstCreateDatetime: '2024-01-01T00:00:00Z',
  lastUpdateDatetime: '2024-01-01T00:00:00Z',
  ...overrides,
});
```

#### 실행 절차
- 유니트 테스트 실행: `cd bootcamp-sample/frontend && npm run test`
- 커버리지(optional): `npm run test:coverage`

#### 완료 기준
- 테스트 스위트/케이스 모두 통과 (예: `13 passed`)
- 각 메서드의 성공/실패, 에러 메시지 매핑(getApplications)이 정확히 검증됨


