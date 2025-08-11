# Story 2: 신청 및 접수 섹션 구현

## 📋 Story 정보

- **Story 제목**: 신청 및 접수 섹션 구현
- **기능 범위**: Full-Stack
- **Estimation**: 13
- **초과/미만 사유**: 팀명 중복 확인, 실시간 유효성 검사, 팀원 추가/삭제 기능으로 인한 복잡성 증가
- **실제 Story Point**: 13
- **우선순위**: High
- **의존성**: Story 1 (네비게이션 연결)

## 🎯 Story 문장

“사용자는 신청·접수 화면에서 팀 정보, 팀원 정보, 아이디어 정보를 입력·저장할 수 있다. 이 화면은 팀명 중복 확인, 팀원 추가·삭제, 실시간 유효성 검사를 지원한다.”

## ✅ Acceptance Criteria

### 1. 신청 및 접수 섹션 
- **Given** 메인페이지에 접속해서
- **When** 사용자가 페이지를 스크롤하면 
- **Then** 참가 안내 섹션 다음에 신청 및 접수 섹션이 표시된다:
  - 팀정보
  - 팀원정보
  - 아이디어 정보
  - 상세내용은 피그마 참고 : https://www.figma.com/design/SklE8qQCS7NQ668BIKi3cB/%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84-%EC%8B%9C%EC%95%88--%EA%B3%B5%EC%9C%A0%EC%9A%A9-?node-id=37-185&m=dev

### 2. 팀명 입력 및 중복 확인
- **Given** 팀명 입력 폼에서
- **When** 팀명을 입력하면
- **Then** 실시간으로 중복 확인이 수행되고 중복 시 오류 메시지가 표시된다
- **And** 중복되지 않은 경우 성공 메시지가 표시된다

### 3. 팀원 정보 구성 선택 및 동적 폼 생성
- **Given** 팀원 정보 필드에서
- **When** 팀원 추가를 클릭하면
- **Then** 팀원 정보 입력 폼이 추가 된다.
- **And** 팀 리더는 자동으로 첫 번째 팀원으로 설정된다

### 4. 팀 리더 및 팀원 정보 입력
- **Given** 팀원 정보 입력 섹션에서
- **When** 각 팀원의 정보를 입력하면
- **Then** 다음 필드들이 검증된다:
  - 이름 (필수, 2-20자)
  - 이메일 (필수, 이메일 형식)
  - 소속 부서 (필수)
  - 직급/직책 (선택)

### 5. 팀원 추가/삭제 기능
- **Given** 팀원 추가 버튼을 클릭했을 때
- **When** 새로운 팀원 정보를 입력하면
- **Then** 팀원 목록에 추가되고 최대 4명까지 제한된다
- **Given** 팀원 삭제 버튼을 클릭했을 때
- **When** 확인 메시지에 동의하면
- **Then** 해당 팀원이 목록에서 제거된다

### 6. 실시간 유효성 검사
- **Given** 필수 입력 필드가 비어있을 때
- **When** 신청하기 버튼을 클릭하면
- **Then** 해당 필드에 오류 메시지가 표시되고 제출이 차단된다
- **Given** 이메일 형식이 올바르지 않을 때
- **When** 이메일 필드를 벗어나면
- **Then** 실시간으로 형식 오류 메시지가 표시된다

### 7. 참가 신청하기 처리
- **Given** 신청 폼을 완료하고 제출했을 때
- **When** 신청이 성공적으로 처리되면
- **Then** 신청 완료 알림이 표시된다

## 🎨 UI/UX 요구사항

### 폼 디자인
- **레이아웃**: 카드 형태의 섹션별 구분
- **입력 필드**: Material-UI TextField 컴포넌트 사용
- **버튼**: Primary/Secondary 스타일 구분
- **아이콘**: 팀원 추가/삭제, 유효성 검사 상태 표시

### 사용자 경험
- **실시간 피드백**: 입력 시 즉시 유효성 검사 결과 표시
- **로딩 상태**: 중복 확인 시 스피너 표시
- **에러 처리**: 명확한 오류 메시지와 해결 방법 제시
- **성공 피드백**: 중복 확인 성공 시 시각적 피드백

## 🔧 기술 요구사항

### Frontend 기술 스택
- **React 18.3** + **TypeScript 5.6**
- **Material-UI 6.3**: 폼 컴포넌트
- **React Hook Form**: 폼 상태 관리
- **Yup**: 유효성 검사 스키마
- **Axios**: API 통신

### Backend 기술 스택
- **Spring Boot 3.2.0**
- **Spring Validation**: 서버 사이드 유효성 검사
- **JPA/Hibernate**: 데이터베이스 연동
- **RESTful API**: 엔드포인트

### API 엔드포인트
```typescript
// 신청 생성
POST /api/hackathon/v1/applications

// 신청 목록 조회
GET /api/hackathon/v1/applications

// 신청 상세 조회
GET /api/hackathon/v1/applications/{id}

// 신청 수정
PUT /api/hackathon/v1/applications/{id}

// 신청 삭제
DELETE /api/hackathon/v1/applications/{id}
```

## 🔒 보안 요구사항

### 입력 검증
- **SQL Injection 방지**: PreparedStatement 사용
- **XSS 방지**: 입력값 이스케이프 처리

## 📋 개발 체크리스트

### Frontend
- [ ] 신청 및 접수 섹션 구현
- [ ] 팀 정보 입력 폼 컴포넌트 구현
- [ ] 팀명 중복 확인 API 연동
- [ ] 팀원 정보 입력 폼 컴포넌트 구현
- [ ] 팀원 추가/삭제 기능 구현
- [ ] 아이디어 정보 입력 폼 컴포넌트 구현
- [ ] 실시간 유효성 검사 구현
- [ ] 참가 신청하기 기능 구현 및 API 연동
- [ ] 에러 처리 및 피드백 구현

### Backend
- [ ] 팀명 중복 확인 API 구현
- [ ] 신청 정보 저장 API 구현
- [ ] 유효성 검사 로직 구현


## 🔗 관련 문서

- [피그마 디자인](https://www.figma.com/design/SklE8qQCS7NQ668BIKi3cB/%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84-%EC%8B%9C%EC%95%88--%EA%B3%B5%EC%9C%A0%EC%9A%A9-?node-id=37-185&m=dev)
- [아키텍처 가이드](../.cursor/rules/architecture.md)
- [초기소스](../_backup/AI%20해커톤%20웹사이트/)
- [피그마 전체 디자인 캡쳐](../_backup/1920w_default.png)
- [데이터베이스 스키마](../.cursor/rules/DATABASE_SCHEMA.md)


---

**작성일**: 2025년 8월
**작성자**: AX Build TF
**버전**: 1.0
**상태**: Ready for Development
