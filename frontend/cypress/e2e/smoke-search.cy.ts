/// <reference types="cypress" />

// TC-SMOKE: 검색 플로우 스모크 테스트

describe('TC-SMOKE: 신청서 검색 플로우', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('TC-SMOKE-002: 팀명으로 검색하면 응답을 수신한다', () => {
    // 실제 API 호출 감시(모킹 없음)
    cy.intercept('GET', '/api/hackathon/v1/applications*').as('searchApplications');

    // 확인 섹션으로 이동
    cy.get('[data-testid="confirmation-section"]').click();

    // 검색
    cy.get('[data-testid="search-input"]').type('테스트팀');
    cy.get('[data-testid="search-button"]').click();

    // 응답 상태 확인 (실 서버 200 가정)
    cy.wait('@searchApplications').its('response.statusCode').should('eq', 200);
  });

  it('TC-SMOKE-003: 멤버명으로 검색하면 응답을 수신한다', () => {
    // 실제 API 호출 감시(모킹 없음)
    cy.intercept('GET', '/api/hackathon/v1/applications*').as('searchByMember');

    cy.get('[data-testid="confirmation-section"]').click();
    cy.get('[data-testid="search-input"]').type('홍길동');
    cy.get('[data-testid="search-button"]').click();

    cy.wait('@searchByMember').its('response.statusCode').should('eq', 200);
  });

  it('TC-SMOKE-004: 존재하지 않는 팀명으로 검색 시 결과 없음/또는 404 처리된다', () => {
    // 실제 API 호출 감시(모킹 없음)
    cy.intercept('GET', '/api/hackathon/v1/applications*').as('searchNone');

    cy.get('[data-testid="confirmation-section"]').click();
    // 매우 낮은 확률의 팀명으로 검색
    cy.get('[data-testid="search-input"]').type(`__no_such_team_${Date.now()}__`);
    cy.get('[data-testid="search-button"]').click();

    cy.wait('@searchNone').then((interception) => {
      const status = interception?.response?.statusCode ?? 0;
      expect([200, 404]).to.include(status);
    });

    // 결과 없음 혹은 오류 메시지 표현
    cy.get('[data-testid="error-message"]', { timeout: 10000 }).should('be.visible');
  });
});


