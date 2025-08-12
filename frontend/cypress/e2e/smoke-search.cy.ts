/// <reference types="cypress" />

describe('TC-SMOKE-002~004: 검색 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('TC-SMOKE-002: 팀명/멤버명 검색 성공', () => {
    // 네비게이션을 통해 확인 섹션으로 이동
    cy.get('[data-testid="confirmation-section"]').click();
    
    // 실제 등록된 팀명으로 검색 (TC-SMOKE-001에서 등록한 데이터 활용)
    cy.get('[data-testid="search-input"]').type('테스트팀_스모크');
    cy.get('[data-testid="search-button"]').click();
    
    // 검색 결과 확인
    cy.contains('신청 정보').should('be.visible');
    cy.contains('팀명:').should('be.visible');
    cy.contains('팀 리더:').should('be.visible');
  });

  it('TC-SMOKE-003: 멤버명 검색 상세', () => {
    // 네비게이션을 통해 확인 섹션으로 이동
    cy.get('[data-testid="confirmation-section"]').click();
    
    // 멤버명(이메일)으로 검색
    cy.get('[data-testid="search-input"]').type('test@example.com');
    cy.get('[data-testid="search-button"]').click();
    
    // 검색 결과에서 멤버 정보 확인
    cy.contains('신청 정보').should('be.visible');
    cy.contains('test@example.com').should('be.visible');
  });

  it('TC-SMOKE-004: 검색 결과 없음 - 존재하지 않는 팀명', () => {
    // 네비게이션을 통해 확인 섹션으로 이동
    cy.get('[data-testid="confirmation-section"]').click();
    
    // 존재하지 않는 팀명으로 검색
    cy.get('[data-testid="search-input"]').type('존재하지않는팀');
    cy.get('[data-testid="search-button"]').click();
    
    // "해당 정보를 찾을 수 없습니다" 메시지 확인
    cy.get('[data-testid="error-message"]').should('be.visible');
    cy.contains('해당 정보를 찾을 수 없습니다').should('be.visible');
  });

  it('TC-SMOKE-004-2: 검색 결과 없음 - 존재하지 않는 멤버명', () => {
    // 네비게이션을 통해 확인 섹션으로 이동
    cy.get('[data-testid="confirmation-section"]').click();
    
    // 존재하지 않는 멤버명으로 검색
    cy.get('[data-testid="search-input"]').type('nonexistent@example.com');
    cy.get('[data-testid="search-button"]').click();
    
    // "해당 정보를 찾을 수 없습니다" 메시지 확인
    cy.get('[data-testid="error-message"]').should('be.visible');
    cy.contains('해당 정보를 찾을 수 없습니다').should('be.visible');
  });
});
