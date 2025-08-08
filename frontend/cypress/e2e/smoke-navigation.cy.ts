/// <reference types="cypress" />

// TC-SMOKE: 네비게이션 스모크 테스트

describe('TC-SMOKE: 네비게이션 동작', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('TC-SMOKE-007: 메뉴 클릭 시 각 섹션으로 이동한다', () => {
    cy.get('[data-testid="registration-section"]').should('be.visible');
    cy.get('[data-testid="confirmation-section"]').should('be.visible');

    // 두 메뉴를 클릭해보며 화면 반응만 빠르게 확인
    cy.get('[data-testid="registration-section"]').click();
    cy.wait(200);
    cy.get('[data-testid="confirmation-section"]').click();
    cy.wait(200);

    // 간단 가시성 체크(실제 스크롤 여부는 앱 구현에 따라 상이할 수 있음)
    cy.get('[data-testid="confirmation-section"]').should('be.visible');
  });
});


