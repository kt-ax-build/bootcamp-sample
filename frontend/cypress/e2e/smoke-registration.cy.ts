/// <reference types="cypress" />

describe('TC-SMOKE-001~006: 등록 및 폼 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('TC-SMOKE-001: 신청서 등록 성공 플로우', () => {
    // 네비게이션을 통해 등록 섹션으로 이동
    cy.get('[data-testid="registration-section"]').click();
    
    // 팀 정보 입력 (고유한 이름 사용)
    const uniqueTeamName = `테스트팀_스모크_${Date.now()}`;
    cy.get('[data-testid="team-name-input"]').type(uniqueTeamName);
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
    
    // 성공 확인 - API 응답 확인
    cy.wait(3000); // API 응답 대기
    
    // 백엔드 API에서 등록된 데이터 확인
    cy.request('GET', 'http://localhost:8080/api/hackathon/v1/applications').then((response) => {
      expect(response.status).to.eq(200);
      const applications = response.body;
      const latestApplication = applications[applications.length - 1];
      expect(latestApplication.team.teamName).to.include('테스트팀_스모크_');
      expect(latestApplication.team.members[0].email).to.eq('test@example.com');
    });
  });

  it('TC-SMOKE-005: 폼 유효성 검증 실패', () => {
    // 네비게이션을 통해 등록 섹션으로 이동
    cy.get('[data-testid="registration-section"]').click();
    
    // 필수 필드 비우고 제출 버튼 클릭
    cy.get('[data-testid="submit-button"]').click();
    
    // 에러 메시지 표시 확인 - 텍스트로 확인
    cy.contains('팀명을 입력해주세요.').should('be.visible');
  });

  it('TC-SMOKE-006: 팀 멤버 관리', () => {
    // 네비게이션을 통해 등록 섹션으로 이동
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
});
