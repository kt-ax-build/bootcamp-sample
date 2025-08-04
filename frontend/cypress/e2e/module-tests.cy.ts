/// <reference types="cypress" />

// TC-MODULE: 프론트엔드 모듈 테스트
// 테스트 전략 문서의 TC-MODULE 시나리오 기반

describe('TC-MODULE: 프론트엔드 모듈 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    // 페이지 로딩 대기
    cy.wait(1000);
  });

  describe('TC-MODULE-001: HackathonService API 모킹 테스트', () => {
    it('createApplication API 호출 성공 시나리오', () => {
      const mockApplication = {
        id: 1,
        team: {
          id: 1,
          teamName: "테스트팀",
          members: [
            {
              id: 1,
              name: "홍길동",
              email: "hong@test.com",
              phone: "010-1234-5678",
              role: "팀장",
              department: "개발팀",
              position: "개발자",
              isLeader: true
            }
          ]
        },
        ideaTitle: "AI 기반 해커톤 관리 시스템",
        ideaDescription: "해커톤 참가자들의 아이디어를 효율적으로 관리하는 시스템",
        problemStatement: "기존 해커톤 관리의 비효율성",
        solutionApproach: "AI 기술을 활용한 자동화",
        techStack: "React, TypeScript, Spring Boot, PostgreSQL",
        status: "PENDING",
        firstCreateDatetime: "2024-01-01T00:00:00Z",
        lastUpdateDatetime: "2024-01-01T00:00:00Z"
      };

      cy.intercept('POST', '/api/hackathon/v1/applications', {
        statusCode: 200,
        body: mockApplication
      }).as('createApplication');

      // RegistrationSection으로 이동
      cy.get('[data-testid="registration-section"]').click();
      cy.wait(500);
      
      // 폼 데이터 입력
      cy.get('[data-testid="team-name-input"]').type('테스트팀');
      cy.get('[data-testid="leader-name-input"]').type('홍길동');
      cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
      cy.get('[data-testid="leader-department-input"]').type('개발팀');
      cy.get('[data-testid="idea-title-input"]').type('AI 기반 해커톤 관리 시스템');
      cy.get('[data-testid="problem-statement-input"]').type('기존 해커톤 관리의 비효율성');
      cy.get('[data-testid="solution-approach-input"]').type('AI 기술을 활용한 자동화');

      // 폼 제출
      cy.get('[data-testid="submit-button"]').click();

      // API 호출 확인
      cy.wait('@createApplication').its('response.statusCode').should('eq', 200);
      
      // 성공 시 완료 화면으로 이동하므로 완료 화면의 요소들을 확인
      cy.contains('신청이 완료되었습니다!', { timeout: 15000 }).should('be.visible');
    });

    it('createApplication API 호출 실패 시나리오', () => {
      cy.intercept('POST', '/api/hackathon/v1/applications', {
        statusCode: 500,
        body: { error: '서버 오류가 발생했습니다.' }
      }).as('createApplicationError');

      // RegistrationSection으로 이동
      cy.get('[data-testid="registration-section"]').click();
      cy.wait(500);
      
      // 폼 데이터 입력
      cy.get('[data-testid="team-name-input"]').type('테스트팀');
      cy.get('[data-testid="leader-name-input"]').type('홍길동');
      cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
      cy.get('[data-testid="leader-department-input"]').type('개발팀');
      cy.get('[data-testid="idea-title-input"]').type('AI 기반 해커톤 관리 시스템');
      cy.get('[data-testid="problem-statement-input"]').type('기존 해커톤 관리의 비효율성');
      cy.get('[data-testid="solution-approach-input"]').type('AI 기술을 활용한 자동화');

      // 폼 제출
      cy.get('[data-testid="submit-button"]').click();

      // API 호출 확인
      cy.wait('@createApplicationError').its('response.statusCode').should('eq', 500);
      
      // 에러 메시지 확인 - Snackbar에서 확인
      cy.get('[data-testid="error-message"]', { timeout: 15000 }).should('be.visible');
    });

    it('getApplications API 호출 성공 시나리오', () => {
      const mockApplications = [
        {
          id: 1,
          team: {
            id: 1,
            teamName: "테스트팀1",
            members: [
              {
                id: 1,
                name: "홍길동",
                email: "hong@test.com",
                department: "개발팀",
                isLeader: true
              }
            ]
          },
          ideaTitle: "AI 기반 해커톤 관리 시스템",
          ideaDescription: "해커톤 참가자들의 아이디어를 효율적으로 관리하는 시스템",
          status: "PENDING",
          firstCreateDatetime: "2024-01-01T00:00:00Z"
        }
      ];

      cy.intercept('GET', '/api/hackathon/v1/applications*', {
        statusCode: 200,
        body: mockApplications
      }).as('getApplications');

      // ConfirmationSection으로 이동
      cy.get('[data-testid="confirmation-section"]').click();
      cy.wait(500);
      
      // 검색 실행
      cy.get('[data-testid="search-input"]').type('테스트팀1');
      cy.get('[data-testid="search-button"]').click();

      // API 호출 확인
      cy.wait('@getApplications').its('response.statusCode').should('eq', 200);
      
      // 검색 결과 확인 - 실제 컴포넌트에서 표시하는 방식에 맞게 조정
      cy.contains('테스트팀1', { timeout: 10000 }).should('exist');
    });

    it('getApplications API 호출 실패 시나리오 (400 에러)', () => {
      cy.intercept('GET', '/api/hackathon/v1/applications*', {
        statusCode: 400,
        body: { error: '잘못된 검색 조건입니다.' }
      }).as('getApplicationsError');

      // ConfirmationSection으로 이동
      cy.get('[data-testid="confirmation-section"]').click();
      cy.wait(500);
      
      // 검색 실행
      cy.get('[data-testid="search-input"]').type('invalid');
      cy.get('[data-testid="search-button"]').click();

      // API 호출 확인
      cy.wait('@getApplicationsError').its('response.statusCode').should('eq', 400);
      
      // 에러 메시지 확인
      cy.get('[data-testid="error-message"]', { timeout: 10000 }).should('be.visible');
    });

    it('getApplications API 호출 실패 시나리오 (404 에러)', () => {
      cy.intercept('GET', '/api/hackathon/v1/applications*', {
        statusCode: 404,
        body: { error: '데이터를 찾을 수 없습니다.' }
      }).as('getApplicationsNotFound');

      // ConfirmationSection으로 이동
      cy.get('[data-testid="confirmation-section"]').click();
      cy.wait(500);
      
      // 검색 실행
      cy.get('[data-testid="search-input"]').type('존재하지않는팀');
      cy.get('[data-testid="search-button"]').click();

      // API 호출 확인
      cy.wait('@getApplicationsNotFound').its('response.statusCode').should('eq', 404);
      
      // 에러 메시지 확인
      cy.get('[data-testid="error-message"]', { timeout: 10000 }).should('be.visible');
    });

    it('네트워크 에러 처리', () => {
      cy.intercept('POST', '/api/hackathon/v1/applications', {
        forceNetworkError: true
      }).as('networkError');

      // RegistrationSection으로 이동
      cy.get('[data-testid="registration-section"]').click();
      cy.wait(500);
      
      // 폼 데이터 입력
      cy.get('[data-testid="team-name-input"]').type('테스트팀');
      cy.get('[data-testid="leader-name-input"]').type('홍길동');
      cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
      cy.get('[data-testid="leader-department-input"]').type('개발팀');
      cy.get('[data-testid="idea-title-input"]').type('AI 기반 해커톤 관리 시스템');
      cy.get('[data-testid="problem-statement-input"]').type('기존 해커톤 관리의 비효율성');
      cy.get('[data-testid="solution-approach-input"]').type('AI 기술을 활용한 자동화');

      // 폼 제출
      cy.get('[data-testid="submit-button"]').click();

      // 네트워크 에러 확인
      cy.wait('@networkError');
      
      // 에러 메시지 확인
      cy.get('[data-testid="error-message"]', { timeout: 15000 }).should('be.visible');
    });
  });

  describe('TC-MODULE-002: HackathonStore API 연동 테스트', () => {
    it('API 호출 시 로딩 상태 변경', () => {
      cy.intercept('POST', '/api/hackathon/v1/applications', {
        delay: 1000,
        statusCode: 500, // 실패로 변경하여 로딩 상태 해제 확인
        body: { error: '서버 오류가 발생했습니다.' }
      }).as('createApplication');

      // RegistrationSection으로 이동
      cy.get('[data-testid="registration-section"]').click();
      cy.wait(500);
      
      // 폼 데이터 입력
      cy.get('[data-testid="team-name-input"]').type('테스트팀');
      cy.get('[data-testid="leader-name-input"]').type('홍길동');
      cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
      cy.get('[data-testid="leader-department-input"]').type('개발팀');
      cy.get('[data-testid="idea-title-input"]').type('AI 기반 해커톤 관리 시스템');
      cy.get('[data-testid="problem-statement-input"]').type('기존 해커톤 관리의 비효율성');
      cy.get('[data-testid="solution-approach-input"]').type('AI 기술을 활용한 자동화');

      // 폼 제출
      cy.get('[data-testid="submit-button"]').click();

      // 로딩 상태 확인
      cy.get('[data-testid="submit-button"]').should('contain', '제출 중...');
      cy.get('[data-testid="submit-button"]').should('be.disabled');

      // API 응답 대기
      cy.wait('@createApplication');

      // 실패 시 로딩 상태 해제 확인 (성공 시에는 완료 화면으로 이동하므로 확인 불가)
      cy.get('[data-testid="submit-button"]').should('contain', '참가 신청하기');
      cy.get('[data-testid="submit-button"]').should('not.be.disabled');
    });

    it('API 성공 시 상태 업데이트', () => {
      const mockApplication = {
        id: 1,
        team: { teamName: "테스트팀" },
        ideaTitle: "AI 기반 해커톤 관리 시스템",
        status: "PENDING"
      };

      cy.intercept('POST', '/api/hackathon/v1/applications', {
        statusCode: 200,
        body: mockApplication
      }).as('createApplicationSuccess');

      // RegistrationSection으로 이동
      cy.get('[data-testid="registration-section"]').click();
      cy.wait(500);
      
      // 폼 데이터 입력
      cy.get('[data-testid="team-name-input"]').type('테스트팀');
      cy.get('[data-testid="leader-name-input"]').type('홍길동');
      cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
      cy.get('[data-testid="leader-department-input"]').type('개발팀');
      cy.get('[data-testid="idea-title-input"]').type('AI 기반 해커톤 관리 시스템');
      cy.get('[data-testid="problem-statement-input"]').type('기존 해커톤 관리의 비효율성');
      cy.get('[data-testid="solution-approach-input"]').type('AI 기술을 활용한 자동화');

      // 폼 제출
      cy.get('[data-testid="submit-button"]').click();

      // API 응답 대기
      cy.wait('@createApplicationSuccess');

      // 성공 상태 확인 - 완료 화면으로 이동
      cy.contains('신청이 완료되었습니다!', { timeout: 15000 }).should('be.visible');
    });

    it('API 실패 시 에러 상태 설정', () => {
      cy.intercept('POST', '/api/hackathon/v1/applications', {
        statusCode: 500,
        body: { error: '서버 오류가 발생했습니다.' }
      }).as('createApplicationError');

      // RegistrationSection으로 이동
      cy.get('[data-testid="registration-section"]').click();
      cy.wait(500);
      
      // 폼 데이터 입력
      cy.get('[data-testid="team-name-input"]').type('테스트팀');
      cy.get('[data-testid="leader-name-input"]').type('홍길동');
      cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
      cy.get('[data-testid="leader-department-input"]').type('개발팀');
      cy.get('[data-testid="idea-title-input"]').type('AI 기반 해커톤 관리 시스템');
      cy.get('[data-testid="problem-statement-input"]').type('기존 해커톤 관리의 비효율성');
      cy.get('[data-testid="solution-approach-input"]').type('AI 기술을 활용한 자동화');

      // 폼 제출
      cy.get('[data-testid="submit-button"]').click();

      // API 응답 대기
      cy.wait('@createApplicationError');

      // 에러 상태 확인
      cy.get('[data-testid="error-message"]', { timeout: 15000 }).should('be.visible');
    });

    it('상태 초기화 기능', () => {
      // RegistrationSection으로 이동
      cy.get('[data-testid="registration-section"]').click();
      cy.wait(500);
      
      // 폼 데이터 입력
      cy.get('[data-testid="team-name-input"]').type('테스트팀');
      cy.get('[data-testid="leader-name-input"]').type('홍길동');
      cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
      cy.get('[data-testid="leader-department-input"]').type('개발팀');
      cy.get('[data-testid="idea-title-input"]').type('AI 기반 해커톤 관리 시스템');
      cy.get('[data-testid="problem-statement-input"]').type('기존 해커톤 관리의 비효율성');
      cy.get('[data-testid="solution-approach-input"]').type('AI 기술을 활용한 자동화');

      // 페이지 새로고침으로 상태 초기화
      cy.reload();

      // 폼이 초기화되었는지 확인
      cy.get('[data-testid="team-name-input"]').should('have.value', '');
      cy.get('[data-testid="leader-name-input"]').should('have.value', '');
      cy.get('[data-testid="leader-email-input"]').should('have.value', '');
      cy.get('[data-testid="leader-department-input"]').should('have.value', '');
      cy.get('[data-testid="idea-title-input"]').should('have.value', '');
      cy.get('[data-testid="problem-statement-input"]').should('have.value', '');
      cy.get('[data-testid="solution-approach-input"]').should('have.value', '');
    });
  });

  describe('TC-MODULE-003: RegistrationSection API 연동 테스트', () => {
    it('폼 제출 시 API 호출', () => {
      cy.intercept('POST', '/api/hackathon/v1/applications', {
        statusCode: 200,
        body: { id: 1, teamName: "테스트팀" }
      }).as('formSubmit');

      // RegistrationSection으로 이동
      cy.get('[data-testid="registration-section"]').click();
      cy.wait(500);
      
      // 폼 데이터 입력
      cy.get('[data-testid="team-name-input"]').type('테스트팀');
      cy.get('[data-testid="leader-name-input"]').type('홍길동');
      cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
      cy.get('[data-testid="leader-department-input"]').type('개발팀');
      cy.get('[data-testid="idea-title-input"]').type('AI 기반 해커톤 관리 시스템');
      cy.get('[data-testid="problem-statement-input"]').type('기존 해커톤 관리의 비효율성');
      cy.get('[data-testid="solution-approach-input"]').type('AI 기술을 활용한 자동화');

      // 폼 제출
      cy.get('[data-testid="submit-button"]').click();

      // API 호출 확인 - 실제 요청 구조에 맞게 수정
      cy.wait('@formSubmit').then((interception) => {
        expect(interception.request.body).to.include({
          teamName: '테스트팀',
          ideaTitle: 'AI 기반 해커톤 관리 시스템',
          problemStatement: '기존 해커톤 관리의 비효율성',
          solutionApproach: 'AI 기술을 활용한 자동화'
        });
        // members 배열이 포함되어 있는지 확인
        expect(interception.request.body).to.have.property('members');
      });
    });

    it('API 성공 시 성공 메시지 표시', () => {
      cy.intercept('POST', '/api/hackathon/v1/applications', {
        statusCode: 200,
        body: { id: 1, teamName: "테스트팀" }
      }).as('formSubmitSuccess');

      // RegistrationSection으로 이동
      cy.get('[data-testid="registration-section"]').click();
      cy.wait(500);
      
      // 폼 데이터 입력
      cy.get('[data-testid="team-name-input"]').type('테스트팀');
      cy.get('[data-testid="leader-name-input"]').type('홍길동');
      cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
      cy.get('[data-testid="leader-department-input"]').type('개발팀');
      cy.get('[data-testid="idea-title-input"]').type('AI 기반 해커톤 관리 시스템');
      cy.get('[data-testid="problem-statement-input"]').type('기존 해커톤 관리의 비효율성');
      cy.get('[data-testid="solution-approach-input"]').type('AI 기술을 활용한 자동화');

      // 폼 제출
      cy.get('[data-testid="submit-button"]').click();

      // API 응답 대기
      cy.wait('@formSubmitSuccess');

      // 성공 메시지 확인 - 완료 화면으로 이동
      cy.contains('신청이 완료되었습니다!', { timeout: 15000 }).should('be.visible');
    });

    it('API 실패 시 에러 메시지 표시', () => {
      cy.intercept('POST', '/api/hackathon/v1/applications', {
        statusCode: 500,
        body: { error: '서버 오류가 발생했습니다.' }
      }).as('formSubmitError');

      // RegistrationSection으로 이동
      cy.get('[data-testid="registration-section"]').click();
      cy.wait(500);
      
      // 폼 데이터 입력
      cy.get('[data-testid="team-name-input"]').type('테스트팀');
      cy.get('[data-testid="leader-name-input"]').type('홍길동');
      cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
      cy.get('[data-testid="leader-department-input"]').type('개발팀');
      cy.get('[data-testid="idea-title-input"]').type('AI 기반 해커톤 관리 시스템');
      cy.get('[data-testid="problem-statement-input"]').type('기존 해커톤 관리의 비효율성');
      cy.get('[data-testid="solution-approach-input"]').type('AI 기술을 활용한 자동화');

      // 폼 제출
      cy.get('[data-testid="submit-button"]').click();

      // API 응답 대기
      cy.wait('@formSubmitError');

      // 에러 메시지 확인
      cy.get('[data-testid="error-message"]', { timeout: 15000 }).should('be.visible');
    });

    it('로딩 상태 표시', () => {
      cy.intercept('POST', '/api/hackathon/v1/applications', {
        delay: 2000,
        statusCode: 500, // 실패로 변경하여 로딩 상태 해제 확인
        body: { error: '서버 오류가 발생했습니다.' }
      }).as('formSubmitLoading');

      // RegistrationSection으로 이동
      cy.get('[data-testid="registration-section"]').click();
      cy.wait(500);
      
      // 폼 데이터 입력
      cy.get('[data-testid="team-name-input"]').type('테스트팀');
      cy.get('[data-testid="leader-name-input"]').type('홍길동');
      cy.get('[data-testid="leader-email-input"]').type('hong@test.com');
      cy.get('[data-testid="leader-department-input"]').type('개발팀');
      cy.get('[data-testid="idea-title-input"]').type('AI 기반 해커톤 관리 시스템');
      cy.get('[data-testid="problem-statement-input"]').type('기존 해커톤 관리의 비효율성');
      cy.get('[data-testid="solution-approach-input"]').type('AI 기술을 활용한 자동화');

      // 폼 제출
      cy.get('[data-testid="submit-button"]').click();

      // 로딩 상태 확인
      cy.get('[data-testid="submit-button"]').should('contain', '제출 중...');
      cy.get('[data-testid="submit-button"]').should('be.disabled');

      // API 응답 대기
      cy.wait('@formSubmitLoading');

      // 실패 시 로딩 상태 해제 확인 (성공 시에는 완료 화면으로 이동하므로 확인 불가)
      cy.get('[data-testid="submit-button"]').should('contain', '참가 신청하기');
      cy.get('[data-testid="submit-button"]').should('not.be.disabled');
    });
  });

  describe('TC-MODULE-004: ConfirmationSection API 연동 테스트', () => {
    it('검색 시 API 호출', () => {
      const mockApplications = [
        {
          id: 1,
          team: {
            id: 1,
            teamName: "테스트팀",
            members: [
              {
                id: 1,
                name: "홍길동",
                email: "hong@test.com",
                department: "개발팀",
                isLeader: true
              }
            ]
          },
          ideaTitle: "AI 기반 해커톤 관리 시스템",
          ideaDescription: "해커톤 참가자들의 아이디어를 효율적으로 관리하는 시스템",
          status: "PENDING",
          firstCreateDatetime: "2024-01-01T00:00:00Z"
        }
      ];

      cy.intercept('GET', '/api/hackathon/v1/applications*', {
        statusCode: 200,
        body: mockApplications
      }).as('searchApplications');

      // ConfirmationSection으로 이동
      cy.get('[data-testid="confirmation-section"]').click();
      cy.wait(500);
      
      // 검색 실행
      cy.get('[data-testid="search-input"]').type('테스트팀');
      cy.get('[data-testid="search-button"]').click();

      // API 호출 확인
      cy.wait('@searchApplications').then((interception) => {
        expect(interception.request.url).to.include('teamName=');
      });
    });

    it('검색 결과 표시', () => {
      const mockApplications = [
        {
          id: 1,
          team: {
            id: 1,
            teamName: "테스트팀",
            members: [
              {
                id: 1,
                name: "홍길동",
                email: "hong@test.com",
                department: "개발팀",
                isLeader: true
              }
            ]
          },
          ideaTitle: "AI 기반 해커톤 관리 시스템",
          ideaDescription: "해커톤 참가자들의 아이디어를 효율적으로 관리하는 시스템",
          status: "PENDING",
          firstCreateDatetime: "2024-01-01T00:00:00Z"
        }
      ];

      cy.intercept('GET', '/api/hackathon/v1/applications*', {
        statusCode: 200,
        body: mockApplications
      }).as('searchApplications');

      // ConfirmationSection으로 이동
      cy.get('[data-testid="confirmation-section"]').click();
      cy.wait(500);
      
      // 검색 실행
      cy.get('[data-testid="search-input"]').type('테스트팀');
      cy.get('[data-testid="search-button"]').click();

      // API 응답 대기
      cy.wait('@searchApplications');

      // 검색 결과 확인 - 실제 컴포넌트에서 표시하는 방식에 맞게 조정
      cy.contains('테스트팀', { timeout: 10000 }).should('exist');
    });

    it('검색 결과 없음 처리', () => {
      cy.intercept('GET', '/api/hackathon/v1/applications*', {
        statusCode: 200,
        body: []
      }).as('searchApplicationsEmpty');

      // ConfirmationSection으로 이동
      cy.get('[data-testid="confirmation-section"]').click();
      cy.wait(500);
      
      // 검색 실행
      cy.get('[data-testid="search-input"]').type('존재하지않는팀');
      cy.get('[data-testid="search-button"]').click();

      // API 응답 대기
      cy.wait('@searchApplicationsEmpty');

      // 검색 결과 없음 메시지 확인
      cy.get('[data-testid="error-message"]', { timeout: 10000 }).should('be.visible');
    });

    it('검색 에러 처리', () => {
      cy.intercept('GET', '/api/hackathon/v1/applications*', {
        statusCode: 500,
        body: { error: '서버 오류가 발생했습니다.' }
      }).as('searchApplicationsError');

      // ConfirmationSection으로 이동
      cy.get('[data-testid="confirmation-section"]').click();
      cy.wait(500);
      
      // 검색 실행
      cy.get('[data-testid="search-input"]').type('테스트팀');
      cy.get('[data-testid="search-button"]').click();

      // API 응답 대기
      cy.wait('@searchApplicationsError');

      // 에러 메시지 확인
      cy.get('[data-testid="error-message"]', { timeout: 10000 }).should('be.visible');
    });

    it('이메일로 검색', () => {
      const mockApplications = [
        {
          id: 1,
          team: {
            id: 1,
            teamName: "테스트팀",
            members: [
              {
                id: 1,
                name: "홍길동",
                email: "hong@test.com",
                department: "개발팀",
                isLeader: true
              }
            ]
          },
          ideaTitle: "AI 기반 해커톤 관리 시스템",
          ideaDescription: "해커톤 참가자들의 아이디어를 효율적으로 관리하는 시스템",
          status: "PENDING",
          firstCreateDatetime: "2024-01-01T00:00:00Z"
        }
      ];

      cy.intercept('GET', '/api/hackathon/v1/applications*', {
        statusCode: 200,
        body: mockApplications
      }).as('searchByEmail');

      // ConfirmationSection으로 이동
      cy.get('[data-testid="confirmation-section"]').click();
      cy.wait(500);
      
      // 이메일로 검색 실행
      cy.get('[data-testid="search-input"]').type('hong@test.com');
      cy.get('[data-testid="search-button"]').click();

      // API 호출 확인
      cy.wait('@searchByEmail').then((interception) => {
        expect(interception.request.url).to.include('memberName=');
      });

      // 검색 결과 확인
      cy.contains('테스트팀', { timeout: 10000 }).should('exist');
    });
  });
}); 