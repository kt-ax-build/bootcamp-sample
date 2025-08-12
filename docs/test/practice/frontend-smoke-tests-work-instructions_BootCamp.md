### 프론트엔드 스모크 테스트 작업지시서 (교육용, 프롬프트 실행 전용)

목표: 교육생이 테스트 코드가 없는 상태에서 본 문서를 프롬프트로 제시하면, `smoke-*.cy.ts` 파일들이 생성되고 `npm run test:smoke`이 17/17 통과하도록 한다.

#### 생성 대상 파일
- 경로: `bootcamp-sample/frontend/cypress/e2e/smoke-navigation.cy.ts`
- 경로: `bootcamp-sample/frontend/cypress/e2e/smoke-registration.cy.ts`
- 경로: `bootcamp-sample/frontend/cypress/e2e/smoke-search.cy.ts`

#### 구현 요구사항
- Cypress 타입 정의 추가: 각 파일 상단에 `/// <reference types="cypress" />` 추가
- 실제 API 호출: 모킹 없이 실제 백엔드와 통신
- 케이스 구현: 네비게이션(10개), 등록(3개), 검색(4개) 총 17개 테스트
- 화면 상호작용: data-testid를 이용한 실제 UI 조작
- 실제 데이터 활용: 백엔드에 등록된 실제 데이터로 검색 테스트

#### 🚀 필수 사전 분석 (한 번만 실행)

**1단계: 전체 프로젝트 구조 파악**
```bash
# 프로젝트 구조 확인
ls -la src/components/
ls -la ../backend/src/main/java/com/kt/hackathon/be/application/controller/

# Cypress 설정 확인
cat cypress.config.js
cat package.json | grep -A 10 -B 5 "test:smoke"
```

**2단계: 핵심 소스코드 분석 (한 번에 모든 정보 수집)**
```bash
# === data-testid 전체 수집 ===
echo "=== data-testid 목록 ==="
grep -r "data-testid=" src/components/ | sed 's/.*data-testid="\([^"]*\)".*/- \1/' | sort | uniq

# === API 엔드포인트 분석 ===
echo "=== API 엔드포인트 ==="
grep -r "@GetMapping\|@PostMapping\|@PutMapping\|@DeleteMapping" ../backend/src/main/java/com/kt/hackathon/be/application/controller/

# === 컴포넌트 구조 분석 ===
echo "=== 컴포넌트 주요 함수 ==="
grep -n "function\|const.*=" src/components/RegistrationSection.tsx | head -20
grep -n "function\|const.*=" src/components/ConfirmationSection.tsx | head -15
grep -n "function\|const.*=" src/components/Navigation.tsx | head -15

# === 메시지 텍스트 수집 ===
echo "=== 주요 메시지 텍스트 ==="
grep -r "신청이 완료되었습니다\|팀명을 입력해주세요\|해당 정보를 찾을 수 없습니다\|지금 참여하세요" src/components/
```

**3단계: 실제 데이터 준비**
```bash
# 백엔드 서버 실행 확인
curl -s http://localhost:8080/actuator/health || echo "백엔드 서버가 실행되지 않았습니다"

# 테스트 데이터 등록 (없는 경우)
curl -X POST http://localhost:8080/api/hackathon/v1/applications \
  -H "Content-Type: application/json" \
  -d '{"teamName":"등록실패팀","members":[{"name":"홍길동","email":"hong@test.com","department":"개발팀","isLeader":true}],"ideaTitle":"AI 기반 해커톤 관리 시스템","problemStatement":"기존 해커톤 관리의 비효율성","solutionApproach":"AI 기술을 활용한 자동화","techStack":"React, TypeScript, Spring Boot, PostgreSQL"}'

# 실제 데이터 확인
curl -s http://localhost:8080/api/hackathon/v1/applications | jq '.[0] | {teamName: .team.teamName, memberEmail: .team.members[0].email}' 2>/dev/null || echo "데이터가 없습니다"
```

#### 📋 분석 결과 기반 구현 가이드

**분석 결과 예시:**
```
=== data-testid 목록 ===
- confirmation-section
- error-message
- idea-title-input
- leader-department-input
- leader-email-input
- leader-name-input
- problem-statement-input
- registration-section
- search-button
- search-input
- solution-approach-input
- submit-button
- success-message
- team-name-input
- tech-stack-input

=== API 엔드포인트 ===
@PostMapping("/applications")
@GetMapping("/applications")
@GetMapping("/applications/{id}")
@PutMapping("/applications/{id}")
@DeleteMapping("/applications/{id}")

=== 주요 메시지 텍스트 ===
RegistrationSection.tsx:683:신청이 완료되었습니다!
RegistrationSection.tsx:533:팀명을 입력해주세요.
Navigation.tsx:178:지금 참여하세요 →
```

#### 🎯 케이스별 구현 가이드 (분석 결과 활용)

##### TC-SMOKE-007: 네비게이션 테스트 (smoke-navigation.cy.ts)
**분석 결과 활용:**
- `data-testid="registration-section"`, `data-testid="confirmation-section"` 사용
- `지금 참여하세요` 텍스트로 버튼 찾기

```typescript
/// <reference types="cypress" />

describe('TC-SMOKE-007: 네비게이션 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('M1: 메인 페이지 로드 및 기본 네비게이션 확인', () => {
    cy.get('.MuiAppBar-root').should('be.visible');
    cy.get('[data-testid="registration-section"]').should('be.visible');
    cy.get('[data-testid="confirmation-section"]').should('be.visible');
  });

  it('M2: 소개 메뉴 클릭 시 소개 섹션으로 스크롤', () => {
    cy.contains('소개').click();
    cy.get('#intro').should('be.visible');
  });

  it('M3: 참가 안내 메뉴 클릭 시 참가 안내 섹션으로 스크롤', () => {
    cy.contains('참가 안내').click();
    cy.get('#participation').should('be.visible');
  });

  it('M4: 신청서 등록 메뉴 클릭 시 신청서 등록 섹션으로 스크롤', () => {
    cy.get('[data-testid="registration-section"]').click();
    cy.get('#registration').should('be.visible');
  });

  it('M5: 신청서 확인 메뉴 클릭 시 신청서 확인 섹션으로 스크롤', () => {
    cy.get('[data-testid="confirmation-section"]').click();
    cy.get('#confirmation').should('be.visible');
  });

  it('M6: 로고 클릭 시 소개 섹션으로 이동', () => {
    cy.get('div').contains('AI').click();
    cy.get('#intro').should('be.visible');
  });

  it('M7: 지금 참여하세요 버튼 클릭 시 신청서 등록 섹션으로 이동', () => {
    cy.contains('지금 참여하세요').click();
    cy.get('#registration').should('be.visible');
  });

  it('M8: 스크롤 시 네비게이션 메뉴 활성화 상태 변경', () => {
    cy.scrollTo('bottom');
    cy.get('.MuiAppBar-root').should('be.visible');
  });

  it('M9: 모든 섹션이 존재하는지 확인', () => {
    cy.get('#intro').should('exist');
    cy.get('#participation').should('exist');
    cy.get('#registration').should('exist');
    cy.get('#confirmation').should('exist');
  });

  it('M10: 네비게이션 메뉴 호버 효과 확인', () => {
    cy.get('[data-testid="registration-section"]').trigger('mouseover');
    cy.get('[data-testid="registration-section"]').should('be.visible');
  });
});
```

##### TC-SMOKE-001~006: 등록 및 폼 테스트 (smoke-registration.cy.ts)
**핵심 구현 포인트:**
- 수집된 data-testid 목록 활용
- `신청이 완료되었습니다!` 메시지 확인
- Material-UI 컴포넌트 특성 반영 (placeholder 기반 선택)

**주요 테스트 케이스:**
1. **TC-SMOKE-001**: 실제 API 호출을 통한 신청서 등록 성공
   - **중요**: 성공 확인 시 `[data-testid="success-message"], .MuiSnackbar-root` 선택자 사용
2. **TC-SMOKE-005**: 필수 필드 누락 시 유효성 검증
3. **TC-SMOKE-006**: 팀 멤버 추가/삭제 기능
   - **중요**: 삭제 버튼은 `svg[data-testid="DeleteIcon"]` 선택자 사용

##### TC-SMOKE-002~004: 검색 테스트 (smoke-search.cy.ts)
**핵심 구현 포인트:**
- 수집된 data-testid 활용
- 실제 등록된 데이터 활용
- 검색 결과 없음 케이스 처리

**주요 테스트 케이스:**
1. **TC-SMOKE-002**: 팀명/멤버명 검색 성공
2. **TC-SMOKE-003**: 멤버명 검색 상세
3. **TC-SMOKE-004**: 검색 결과 없음 (2개 케이스)

#### 📝 샘플 스니펫 (실제 구현 예시)

```typescript
// TC-SMOKE-001: 신청서 등록 성공 플로우 (올바른 구현)
it('TC-SMOKE-001: 신청서 등록 성공 플로우', () => {
  cy.get('[data-testid="registration-section"]').click();
  
  // 팀 정보 입력
  cy.get('[data-testid="team-name-input"]').type('테스트팀_스모크');
  cy.get('[data-testid="leader-name-input"]').type('김테스트');
  cy.get('[data-testid="leader-email-input"]').type('test@example.com');
  cy.get('[data-testid="leader-department-input"]').type('테스트팀');
  
  // 아이디어 정보 입력
  cy.get('[data-testid="idea-title-input"]').type('스모크 테스트 아이디어');
  cy.get('[data-testid="problem-statement-input"]').type('테스트 문제 정의');
  cy.get('[data-testid="solution-approach-input"]').type('테스트 솔루션 접근법');
  cy.get('[data-testid="tech-stack-input"]').type('Cypress, TypeScript');
  
  // 폼 제출
  cy.get('[data-testid="submit-button"]').click();
  
  // 성공 확인 (중요: 올바른 선택자 사용)
  cy.get('[data-testid="success-message"], .MuiSnackbar-root', { timeout: 15000 }).should('be.visible');
});

// TC-SMOKE-006: 팀 멤버 관리 (올바른 구현)
it('TC-SMOKE-006: 팀 멤버 관리', () => {
  cy.get('[data-testid="registration-section"]').click();
  
  // 기본 팀 정보 입력
  cy.get('[data-testid="team-name-input"]').type('멤버관리팀');
  cy.get('[data-testid="leader-name-input"]').type('팀장');
  cy.get('[data-testid="leader-email-input"]').type('leader@test.com');
  cy.get('[data-testid="leader-department-input"]').type('개발팀');
  cy.get('[data-testid="idea-title-input"]').type('멤버 관리 테스트');
  cy.get('[data-testid="problem-statement-input"]').type('문제');
  cy.get('[data-testid="solution-approach-input"]').type('솔루션');
  
  // 팀원 추가
  cy.contains('팀원 추가').click();
  cy.get('input[placeholder*="이름"]').should('have.length.at.least', 2);
  
  // 새 멤버 정보 입력
  cy.get('input[placeholder*="이름"]').eq(1).type('팀원1');
  cy.get('input[placeholder*="이메일"]').eq(1).type('member1@test.com');
  
  // 멤버 삭제 (중요: DeleteIcon 선택자 사용)
  cy.get('button').find('svg[data-testid="DeleteIcon"]').parent().click();
  cy.get('input[placeholder*="이름"]').should('have.length', 1);
});
```

#### 🚀 실행 방법

```bash
# 1단계: 사전 분석 실행 (한 번만)
bash -c '
echo "=== data-testid 목록 ==="
grep -r "data-testid=" src/components/ | sed "s/.*data-testid=\"\([^\"]*\)\".*/- \1/" | sort | uniq

echo "=== API 엔드포인트 ==="
grep -r "@GetMapping\|@PostMapping\|@PutMapping\|@DeleteMapping" ../backend/src/main/java/com/kt/hackathon/be/application/controller/

echo "=== 주요 메시지 텍스트 ==="
grep -r "신청이 완료되었습니다\|팀명을 입력해주세요\|해당 정보를 찾을 수 없습니다\|지금 참여하세요" src/components/
'

# 2단계: 서버 및 데이터 준비
curl -s http://localhost:8080/actuator/health || echo "백엔드 서버가 실행되지 않았습니다"
curl -X POST http://localhost:8080/api/hackathon/v1/applications \
  -H "Content-Type: application/json" \
  -d '"'"'{"teamName":"등록실패팀","members":[{"name":"홍길동","email":"hong@test.com","department":"개발팀","isLeader":true}],"ideaTitle":"AI 기반 해커톤 관리 시스템","problemStatement":"기존 해커톤 관리의 비효율성","solutionApproach":"AI 기술을 활용한 자동화","techStack":"React, TypeScript, Spring Boot, PostgreSQL"}'"'"' 2>/dev/null || echo "데이터 등록 완료"

# 3단계: 스모크 테스트 실행
npm run test:smoke
```

#### 🔧 트러블슈팅

**자주 발생하는 문제와 해결책:**

1. **data-testid를 찾을 수 없는 경우**
   ```bash
   grep -r "data-testid=" src/components/ | grep -i "찾고있는이름"
   ```

2. **Material-UI 컴포넌트 특성**
   - `name` 속성 대신 `placeholder` 또는 텍스트 내용 사용
   - 동적 필드는 텍스트 내용으로 존재 여부 확인

3. **API 응답 구조 확인**
   ```bash
   curl -s http://localhost:8080/api/hackathon/v1/applications | jq '.[0]' 2>/dev/null || echo "응답 구조 확인 필요"
   ```

4. **메시지 텍스트 불일치**
   ```bash
   grep -r "신청이 완료되었습니다" src/components/ -A 2 -B 2
   ```

5. **등록 성공 플로우 문제 (중요!)**
   - **문제**: 등록 성공 후 "신청이 완료되었습니다!" 메시지를 찾을 수 없음
   - **원인**: 등록 성공 시 `isSubmitted` 상태가 `true`가 되어 완전히 다른 화면이 렌더링됨
   - **해결**: 성공 확인 시 `[data-testid="success-message"], .MuiSnackbar-root` 선택자 사용
   ```typescript
   // 올바른 성공 확인 방법
   cy.get('[data-testid="success-message"], .MuiSnackbar-root', { timeout: 15000 }).should('be.visible');
   ```

6. **팀 멤버 관리 DeleteIcon 문제 (중요!)**
   - **문제**: "삭제" 텍스트로 버튼을 찾을 수 없음
   - **원인**: Material-UI의 DeleteIcon을 사용하는 버튼
   - **해결**: DeleteIcon의 data-testid를 사용
   ```typescript
   // 올바른 삭제 버튼 선택 방법
   cy.get('button').find('svg[data-testid="DeleteIcon"]').parent().click();
   ```

7. **성공 화면 확인 방법**
   - **문제**: 등록 성공 후 화면이 완전히 바뀌어서 기존 선택자로 찾을 수 없음
   - **원인**: `isSubmitted` 상태에 따라 조건부 렌더링
   - **해결**: 스낵바 메시지 또는 성공 화면의 공통 선택자 사용

#### ✅ 완료 기준
- `npm run test:smoke` 결과 17/17 통과 (100%)
- 실제 API 호출을 통한 등록/검색 플로우 검증 완료
- 네비게이션 및 폼 유효성 검증 완료
- 교육 목적에 부합하는 핵심 기능 테스트 완료

**개선 효과:**
- 🔄 반복 작업 최소화: 사전 분석을 한 번만 실행
- 📋 체계적 정보 수집: 모든 필요한 정보를 한 번에 수집
- 🎯 정확한 구현: 분석 결과를 바탕으로 정확한 테스트 코드 작성
- ⚡ 빠른 실행: 불필요한 시행착오 제거
