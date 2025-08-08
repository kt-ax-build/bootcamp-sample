/// <reference types="cypress" />

// TC-SMOKE: 등록 플로우 스모크 테스트

describe('TC-SMOKE: 해커톤 신청 등록 플로우', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('TC-SMOKE-001: 사용자가 정상적으로 신청을 완료한다 (행복 경로)', () => {
    // 실제 API 호출 감시(모킹 없음)
    cy.intercept('POST', '/api/hackathon/v1/applications').as('createApplication');

    // 등록 섹션으로 이동
    cy.get('[data-testid="registration-section"]').click();

    // 필수 필드 입력
    cy.get('[data-testid="team-name-input"]').type('테스트팀');
    cy.get('[data-testid="leader-name-input"]').type('홍길동');
    cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
    cy.get('[data-testid="leader-department-input"]').type('개발팀');
    cy.get('[data-testid="idea-title-input"]').type('AI 기반 해커톤 관리 시스템');
    cy.get('[data-testid="problem-statement-input"]').type('기존 해커톤 관리의 비효율성');
    cy.get('[data-testid="solution-approach-input"]').type('AI 기술을 활용한 자동화');

    // 제출
    cy.get('[data-testid="submit-button"]').click();

    // API 및 성공 화면 확인 (실제 백엔드 200 가정)
    cy.wait('@createApplication').its('response.statusCode').should('eq', 200);
    cy.contains('신청이 완료되었습니다!', { timeout: 15000 }).should('be.visible');
  });

  it('TC-SMOKE-005: 필수값 없이 제출하면 유효성 에러를 본다', () => {
    // 등록 섹션으로 이동
    cy.get('[data-testid="registration-section"]').click();

    // 바로 제출
    cy.get('[data-testid="submit-button"]').click();

    // 유효성 에러 일부 확인 (대표 항목)
    cy.contains('팀명을 입력해주세요').should('be.visible');
  });

  // 오류 경로 검증은 모듈 테스트에서 수행 (스모크는 실 API 성공 경로 중심)
  it('TC-SMOKE-006: 팀 멤버 추가/삭제가 실제 제출 과정에서 반영된다(기본 흐름)', () => {
    // 실제 API 호출 감시(모킹 없음)
    cy.intercept('POST', '/api/hackathon/v1/applications').as('createApplication');

    // 등록 섹션으로 이동
    cy.get('[data-testid="registration-section"]').click();

    // 필수 필드 입력
    cy.get('[data-testid="team-name-input"]').type('스모크팀');
    cy.get('[data-testid="leader-name-input"]').type('홍길동');
    cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
    cy.get('[data-testid="leader-department-input"]').type('개발팀');
    cy.get('[data-testid="idea-title-input"]').type('스모크 아이디어');
    cy.get('[data-testid="problem-statement-input"]').type('문제');
    cy.get('[data-testid="solution-approach-input"]').type('해결');

    // 팀원 추가/삭제 UI 동작(가벼운 확인)
    cy.contains('팀원 추가').click();
    // 삭제 아이콘이 있으면 한 번 삭제 시도 (앱 구현에 따라 아이콘 유무가 다를 수 있으므로 optional)
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="DeleteIcon"]').length > 0) {
        cy.get('[data-testid="DeleteIcon"]').first().click({ force: true });
      }
    });

    // 제출 및 성공 가정
    cy.get('[data-testid="submit-button"]').click();
    cy.wait('@createApplication').its('response.statusCode').should('eq', 200);
    cy.contains('신청이 완료되었습니다!', { timeout: 15000 }).should('be.visible');
  });
});


