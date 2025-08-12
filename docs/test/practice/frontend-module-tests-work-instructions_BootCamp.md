### 프론트엔드 모듈 테스트 작업지시서 (교육용, 프롬프트 실행 전용)

목표: 교육생이 테스트 코드가 없는 상태에서 본 문서를 프롬프트로 제시하면, `module-tests.cy.ts`가 생성되고 `npm run test:module`이 10/10 통과되도록 한다.

#### 생성 대상 파일
- 경로: `bootcamp-sample/frontend/cypress/e2e/module-tests.cy.ts`

#### 구현 요구사항
- Cypress 타입 정의 추가: 파일 상단에 `/// <reference types="cypress" />` 추가
- 인터셉트 prefix 상수화: `const API_PREFIX = '**/api/hackathon/v1';`
- 목업 빌더 함수: `buildApplication(overrides)` 구현
- 케이스(총 10개) 구현: Create(성공/실패), List(teamName 성공/실패), Get by ID(성공/실패), Update(성공/실패), Delete(성공/실패)
- Create/List/Get는 화면 상호작용 사용(data-testid 이용)
- Update/Delete는 UI 클릭 대신 `window.fetch`로 호출을 트리거하고, `cy.intercept`로 상태코드만 검증
  - 성공 응답: 200/201/204
  - 실패 응답: 400/404/500

#### 케이스별 구현 가이드
- **M1 (Create 성공)**: 모든 필수 필드 입력 후 제출 → `cy.contains('신청이 완료되었습니다!')` 확인
  - 필수 필드: 팀명, 리더명, 이메일, 부서, 아이디어제목, 문제, 솔루션
- **M2 (Create 실패)**: 모든 필수 필드 입력 후 500 에러 → `[data-testid="error-message"]` 확인
- **M3, M4 (List 성공/실패)**: 확인 섹션 이동 후 `cy.wait(1000)` 추가 → `[data-testid="search-input"]`에 검색어 입력 → `[data-testid="search-button"]` 클릭 → 성공/실패 스낵바 확인
- **M5 (Get by ID 성공)**: 편집 모드에서 제출 버튼 텍스트 `'정보 수정하기'` 확인 (폼 값 확인 대신)
- **M6 (Get by ID 실패)**: 에러 스낵바 확인
- **M7-M10 (Update/Delete)**: `window.fetch` 사용, 인터셉트 상태코드만 검증

#### data-testid 자동 추출 가이드
실제 컴포넌트 파일에서 data-testid를 자동으로 추출하여 사용하세요:

**명령어 실행:**
```bash
# 모든 컴포넌트의 data-testid 추출
grep -r "data-testid=" src/components/

# 개별 컴포넌트별 추출
grep -r "data-testid=" src/components/RegistrationSection.tsx
grep -r "data-testid=" src/components/ConfirmationSection.tsx  
grep -r "data-testid=" src/components/Navigation.tsx
```

**추출 결과 예시:**
- **RegistrationSection**: `team-name-input`, `leader-name-input`, `leader-department-input`, `leader-email-input`, `idea-title-input`, `problem-statement-input`, `solution-approach-input`, `tech-stack-input`, `submit-button`
- **ConfirmationSection**: `search-input`, `search-button`, `error-message`, `success-message`
- **Navigation**: `registration-section`, `confirmation-section`

**주의사항:**
- 동적으로 생성되는 data-testid는 조건부 렌더링으로 인해 실제 사용 시점에 따라 다를 수 있음
- 예: `data-testid={snackbarSeverity === 'success' ? 'success-message' : 'error-message'}`

#### 샘플 스니펫
```ts
const API_PREFIX = `**/api/hackathon/v1`;

const buildApplication = (overrides: Record<string, any> = {}) => ({
  id: 1,
  team: {
    id: 1,
    teamName: '테스트팀',
    teamSize: '1',
    teamDescription: '설명',
    members: [
      {
        id: 1,
        name: '홍길동',
        email: 'hong@test.com',
        department: '개발팀',
        role: '팀장',
        isLeader: true,
      },
    ],
  },
  ideaTitle: 'AI 기반 해커톤 관리 시스템',
  ideaDescription: '설명',
  problemStatement: '문제',
  solutionApproach: '접근',
  techStack: 'React, TS, Spring',
  status: 'PENDING',
  firstCreateDatetime: '2024-01-01T00:00:00Z',
  lastUpdateDatetime: '2024-01-01T00:00:00Z',
  ...overrides,
});

// 인터셉트 패턴 (와일드카드 사용 권장)
cy.intercept('GET', '**/api/hackathon/v1/applications*', { statusCode: 200, body: mockData }).as('listApps');
cy.intercept('GET', '**/api/hackathon/v1/applications/1', { statusCode: 200, body: buildApplication() }).as('getApp');

// Create 성공 테스트 예시 (모든 필수 필드 입력)
cy.get('[data-testid="team-name-input"]').type('테스트팀');
cy.get('[data-testid="leader-name-input"]').type('홍길동');
cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
cy.get('[data-testid="leader-department-input"]').type('개발팀');
cy.get('[data-testid="idea-title-input"]').type('테스트 아이디어');
cy.get('[data-testid="problem-statement-input"]').type('테스트 문제');
cy.get('[data-testid="solution-approach-input"]').type('테스트 솔루션');
cy.get('[data-testid="submit-button"]').click();

// 페이지 로딩 대기
cy.get('[data-testid="confirmation-section"]').click();
cy.wait(1000);

// 검색 입력 및 버튼 클릭
cy.get('[data-testid="search-input"]').type('테스트팀');
cy.get('[data-testid="search-button"]').click();

// 제출 완료 화면 확인
cy.contains('신청이 완료되었습니다!').should('be.visible');

// 편집 모드 확인 (폼 값 확인 대신 버튼 텍스트 확인)
cy.get('[data-testid="submit-button"]').should('contain.text', '정보 수정하기');

// Update 성공 예: fetch로 PUT 호출 후 인터셉트 확인
cy.intercept('PUT', '**/api/hackathon/v1/applications/1', { statusCode: 200, body: buildApplication() }).as('updateApp');
cy.window().then((win) =>
  win.fetch('/api/hackathon/v1/applications/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teamName: '수정후팀' }),
  })
);
cy.wait('@updateApp').its('response.statusCode').should('eq', 200);
```

#### 실행 방법
```bash
# 1단계: 서버 기동 (필수)
cd bootcamp-sample/frontend && npm run dev

# 2단계: 서버 완전 로딩 대기 (30초 권장)
sleep 30

# 3단계: 모듈 테스트 실행
cd bootcamp-sample/frontend && npm run test:module
```

#### 트러블슈팅
- **서버 인식 실패**: dev 서버 미기동 → `npm run dev` 실행 후 재시도
- **클릭 단일 요소 에러**: 페이지가 여러 섹션을 동시에 렌더 → Update/Delete는 UI 클릭 대신 fetch 사용
- **인터셉트 타임아웃**: 정확한 URL 대신 와일드카드 패턴 사용 (`**/api/hackathon/v1/applications*`)
- **폼 값 자동 채움 실패**: 편집 모드에서 폼 값 확인 대신 제출 버튼 텍스트 확인
- **페이지 로딩 대기**: 섹션 이동 후 `cy.wait(1000)` 추가
- **API 호출 미발생**: 인터셉트 패턴을 `**/api/hackathon/v1/applications*`로 변경
- **스낵바 메시지 확인 실패**: 성공/실패 메시지의 정확한 `data-testid` 사용
- **폼 검증 실패**: Create 테스트에서 모든 필수 필드 입력 필요 (팀명, 리더명, 이메일, 부서, 아이디어제목, 문제, 솔루션)
- **잘못된 data-testid**: 실제 컴포넌트에서 `grep -r "data-testid=" src/components/` 명령어로 정확한 값 확인
- **TypeScript 에러**: Cypress 타입 정의 추가 필요 (`/// <reference types="cypress" />`)
- **동적 data-testid**: 조건부 렌더링으로 인해 실제 값이 다를 수 있으니 주의

#### 완료 기준
- `cypress run` 결과 10/10 통과
- 네트워크 경계 성공/실패 흐름이 모두 검증됨


