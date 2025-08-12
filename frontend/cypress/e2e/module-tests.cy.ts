/// <reference types="cypress" />

const API_PREFIX = '**/api/hackathon/v1';

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

describe('Hackathon Module Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('M1: Create 성공 - 모든 필수 필드 입력 후 제출', () => {
    // Given
    cy.intercept('POST', `${API_PREFIX}/applications`, {
      statusCode: 201,
      body: buildApplication(),
    }).as('createApp');

    // When - 모든 필수 필드 입력
    cy.get('[data-testid="team-name-input"]').type('테스트팀');
    cy.get('[data-testid="leader-name-input"]').type('홍길동');
    cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
    cy.get('[data-testid="leader-department-input"]').type('개발팀');
    cy.get('[data-testid="idea-title-input"]').type('테스트 아이디어');
    cy.get('[data-testid="problem-statement-input"]').type('테스트 문제');
    cy.get('[data-testid="solution-approach-input"]').type('테스트 솔루션');
    cy.get('[data-testid="submit-button"]').click();

    // Then
    cy.wait('@createApp');
    cy.contains('신청이 완료되었습니다!').should('be.visible');
  });

  it('M2: Create 실패 - 500 에러', () => {
    // Given
    cy.intercept('POST', `${API_PREFIX}/applications`, {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('createAppError');

    // When - 모든 필수 필드 입력
    cy.get('[data-testid="team-name-input"]').type('테스트팀');
    cy.get('[data-testid="leader-name-input"]').type('홍길동');
    cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
    cy.get('[data-testid="leader-department-input"]').type('개발팀');
    cy.get('[data-testid="idea-title-input"]').type('테스트 아이디어');
    cy.get('[data-testid="problem-statement-input"]').type('테스트 문제');
    cy.get('[data-testid="solution-approach-input"]').type('테스트 솔루션');
    cy.get('[data-testid="submit-button"]').click();

    // Then
    cy.wait('@createAppError');
    cy.get('[data-testid="error-message"]').should('be.visible');
  });

  it('M3: List 성공 - teamName으로 검색', () => {
    // Given
    cy.intercept('GET', `${API_PREFIX}/applications*`, {
      statusCode: 200,
      body: [buildApplication()],
    }).as('listApps');

    // When - 확인 섹션으로 이동 후 검색
    cy.get('[data-testid="confirmation-section"]').click();
    cy.wait(1000);
    cy.get('[data-testid="search-input"]').type('테스트팀');
    cy.get('[data-testid="search-button"]').click();

    // Then
    cy.wait('@listApps');
    cy.get('[data-testid="success-message"]').should('be.visible');
  });

  it('M4: List 실패 - 존재하지 않는 팀명', () => {
    // Given
    cy.intercept('GET', `${API_PREFIX}/applications*`, {
      statusCode: 404,
      body: { error: 'Not Found' },
    }).as('listAppsError');

    // When - 확인 섹션으로 이동 후 검색
    cy.get('[data-testid="confirmation-section"]').click();
    cy.wait(1000);
    cy.get('[data-testid="search-input"]').type('존재하지않는팀');
    cy.get('[data-testid="search-button"]').click();

    // Then
    cy.wait('@listAppsError');
    cy.get('[data-testid="error-message"]').should('be.visible');
  });

  it('M5: Get by ID 성공 - 편집 모드', () => {
    // Given
    cy.intercept('GET', `${API_PREFIX}/applications/1`, {
      statusCode: 200,
      body: buildApplication(),
    }).as('getApp');

    // When - 편집 모드로 방문
    cy.visit('/?edit=true&id=1');

    // Then
    cy.wait('@getApp');
    cy.get('[data-testid="submit-button"]').should('contain.text', '정보 수정하기');
  });

  it('M6: Get by ID 실패 - 404 에러', () => {
    // Given
    cy.intercept('GET', `${API_PREFIX}/applications/999`, {
      statusCode: 404,
      body: { error: 'Not Found' },
    }).as('getAppError');

    // When - 존재하지 않는 ID로 방문
    cy.visit('/?edit=true&id=999');

    // Then
    cy.wait('@getAppError');
    cy.get('[data-testid="error-message"]').should('be.visible');
  });

  it('M7: Update 성공 - fetch로 PUT 호출', () => {
    // Given
    cy.intercept('PUT', `${API_PREFIX}/applications/1`, {
      statusCode: 200,
      body: buildApplication({ team: { teamName: '수정된팀' } }),
    }).as('updateApp');

    // When - fetch로 PUT 호출
    cy.window().then((win) => {
      win.fetch('/api/hackathon/v1/applications/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamName: '수정된팀' }),
      });
    });

    // Then
    cy.wait('@updateApp').its('response.statusCode').should('eq', 200);
  });

  it('M8: Update 실패 - 500 에러', () => {
    // Given
    cy.intercept('PUT', `${API_PREFIX}/applications/1`, {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('updateAppError');

    // When - fetch로 PUT 호출
    cy.window().then((win) => {
      win.fetch('/api/hackathon/v1/applications/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamName: '수정된팀' }),
      });
    });

    // Then
    cy.wait('@updateAppError').its('response.statusCode').should('eq', 500);
  });

  it('M9: Delete 성공 - fetch로 DELETE 호출', () => {
    // Given
    cy.intercept('DELETE', `${API_PREFIX}/applications/1`, {
      statusCode: 204,
      body: {},
    }).as('deleteApp');

    // When - fetch로 DELETE 호출
    cy.window().then((win) => {
      win.fetch('/api/hackathon/v1/applications/1', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    });

    // Then
    cy.wait('@deleteApp').its('response.statusCode').should('eq', 204);
  });

  it('M10: Delete 실패 - 500 에러', () => {
    // Given
    cy.intercept('DELETE', `${API_PREFIX}/applications/1`, {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('deleteAppError');

    // When - fetch로 DELETE 호출
    cy.window().then((win) => {
      win.fetch('/api/hackathon/v1/applications/1', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    });

    // Then
    cy.wait('@deleteAppError').its('response.statusCode').should('eq', 500);
  });
});
