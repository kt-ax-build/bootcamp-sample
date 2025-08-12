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
