/// <reference types="cypress" />

describe('TC-SMOKE-002~004: 검색 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('TC-SMOKE-002: 팀명/멤버명 검색 성공', () => {
    // 먼저 테스트 데이터 등록
    const testTeamName = `테스트팀_검색_${Date.now()}`;
    
    // 등록 섹션으로 이동하여 테스트 데이터 생성
    cy.get('[data-testid="registration-section"]').click();
    cy.get('[data-testid="team-name-input"]').type(testTeamName);
    cy.get('[data-testid="leader-name-input"]').type('김검색');
    cy.get('[data-testid="leader-email-input"]').type('search@test.com');
    cy.get('[data-testid="leader-department-input"]').type('검색팀');
    cy.get('[data-testid="idea-title-input"]').type('검색 테스트 아이디어');
    cy.get('[data-testid="problem-statement-input"]').type('검색 테스트 문제');
    cy.get('[data-testid="solution-approach-input"]').type('검색 테스트 솔루션');
    cy.get('[data-testid="submit-button"]').click();
    
    // 등록 완료 대기
    cy.wait(3000);
    
    // 확인 섹션으로 이동하여 검색
    cy.get('[data-testid="confirmation-section"]').click();
    cy.wait(1000);
    
    // 등록한 팀명으로 검색
    cy.get('[data-testid="search-input"]').type(testTeamName);
    cy.get('[data-testid="search-button"]').click();
    
    // 검색 결과 확인
    cy.contains('신청 정보').should('be.visible');
    cy.contains('팀명:').should('be.visible');
    cy.contains('팀 리더:').should('be.visible');
  });

  it('TC-SMOKE-003: 멤버명 검색 상세', () => {
    // 먼저 테스트 데이터 등록
    const testEmail = `member${Date.now()}@test.com`;
    
    // 등록 섹션으로 이동하여 테스트 데이터 생성
    cy.get('[data-testid="registration-section"]').click();
    cy.get('[data-testid="team-name-input"]').type('멤버검색팀');
    cy.get('[data-testid="leader-name-input"]').type('김멤버');
    cy.get('[data-testid="leader-email-input"]').type(testEmail);
    cy.get('[data-testid="leader-department-input"]').type('멤버팀');
    cy.get('[data-testid="idea-title-input"]').type('멤버 검색 테스트');
    cy.get('[data-testid="problem-statement-input"]').type('멤버 검색 문제');
    cy.get('[data-testid="solution-approach-input"]').type('멤버 검색 솔루션');
    cy.get('[data-testid="submit-button"]').click();
    
    // 등록 완료 대기
    cy.wait(5000);
    
    // 확인 섹션으로 이동하여 검색
    cy.get('[data-testid="confirmation-section"]').click();
    cy.wait(2000);
    
    // 등록한 이메일로 검색
    cy.get('[data-testid="search-input"]').type(testEmail);
    cy.get('[data-testid="search-button"]').click();
    
    // 검색 결과 대기 및 확인 (더 긴 대기 시간)
    cy.wait(5000);
    
    // 검색 결과에서 멤버 정보 확인 (더 안정적인 검증)
    cy.contains('신청 정보', { timeout: 10000 }).should('be.visible');
    cy.contains(testEmail, { timeout: 10000 }).should('be.visible');
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
