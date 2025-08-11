# Story 2: 팀 정보 및 팀원 정보 입력 폼 구현

## 📋 Story 정보

- **Story 제목**: 팀 정보 및 팀원 정보 입력 폼 구현
- **기능 범위**: Full-Stack
- **Estimation**: 13
- **초과/미만 사유**: 팀명 중복 확인, 실시간 유효성 검사, 팀원 추가/삭제 기능으로 인한 복잡성 증가
- **실제 Story Point**: 13
- **우선순위**: High
- **의존성**: Story 1 (네비게이션 연결)

## 🎯 Story 문장

"사용자로서, 나는 팀 정보와 팀원 정보를 입력할 수 있는 폼을 이용하고 싶다. 그래야 팀명 중복을 확인하고, 팀원을 추가/삭제하며, 실시간으로 유효성을 검사할 수 있다."

## ✅ Acceptance Criteria

### 1. 팀명 입력 및 중복 확인
- **Given** 신청 폼 페이지에 접속했을 때
- **When** 팀명을 입력하면
- **Then** 실시간으로 중복 확인이 수행되고 중복 시 오류 메시지가 표시된다
- **And** 중복되지 않은 경우 성공 메시지가 표시된다

### 2. 팀 구성 선택 및 동적 폼 생성
- **Given** 팀 구성 선택 필드에서
- **When** 팀 구성을 선택하면 (1명, 2명, 3명, 4명)
- **Then** 해당 구성에 맞는 팀원 정보 입력 필드가 동적으로 생성된다
- **And** 팀 리더는 자동으로 첫 번째 팀원으로 설정된다

### 3. 팀원 정보 입력
- **Given** 팀원 정보 입력 섹션에서
- **When** 각 팀원의 정보를 입력하면
- **Then** 다음 필드들이 검증된다:
  - 이름 (필수, 2-20자)
  - 이메일 (필수, 이메일 형식)
  - 소속 부서 (필수)
  - 직급/직책 (선택)
  - 연락처 (선택, 전화번호 형식)

### 4. 팀원 추가/삭제 기능
- **Given** 팀원 추가 버튼을 클릭했을 때
- **When** 새로운 팀원 정보를 입력하면
- **Then** 팀원 목록에 추가되고 최대 4명까지 제한된다
- **Given** 팀원 삭제 버튼을 클릭했을 때
- **When** 확인 메시지에 동의하면
- **Then** 해당 팀원이 목록에서 제거된다

### 5. 실시간 유효성 검사
- **Given** 필수 입력 필드가 비어있을 때
- **When** 신청하기 버튼을 클릭하면
- **Then** 해당 필드에 오류 메시지가 표시되고 제출이 차단된다
- **Given** 이메일 형식이 올바르지 않을 때
- **When** 이메일 필드를 벗어나면
- **Then** 실시간으로 형식 오류 메시지가 표시된다

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
- **RESTful API**: 팀명 중복 확인 엔드포인트

### API 엔드포인트
```typescript
// 팀명 중복 확인
GET /api/hackathon/v1/teams/check-name?teamName={teamName}

// 팀 정보 저장
POST /api/hackathon/v1/teams

// 팀원 정보 저장
POST /api/hackathon/v1/teams/{teamId}/members
```

## 📊 데이터 모델

### 팀 정보
```typescript
interface Team {
  id: number;
  teamName: string;
  teamSize: number;
  teamDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 팀원 정보
```typescript
interface TeamMember {
  id: number;
  name: string;
  email: string;
  department: string;
  position?: string;
  phone?: string;
  isLeader: boolean;
  teamId: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔒 보안 요구사항

### 입력 검증
- **SQL Injection 방지**: PreparedStatement 사용
- **XSS 방지**: 입력값 이스케이프 처리
- **CSRF 방지**: 토큰 기반 인증

### 데이터 보호
- **개인정보 암호화**: 이메일, 전화번호 암호화 저장
- **접근 제어**: 팀 정보는 해당 팀원만 접근 가능

## 🧪 테스트 케이스

### 단위 테스트
- 팀명 중복 확인 로직 테스트
- 유효성 검사 스키마 테스트
- 폼 컴포넌트 렌더링 테스트

### 통합 테스트
- API 엔드포인트 테스트
- 폼 제출 플로우 테스트
- 에러 처리 테스트

### E2E 테스트
- 팀 등록 전체 플로우 테스트
- 팀원 추가/삭제 테스트
- 유효성 검사 테스트

## 📋 개발 체크리스트

### Frontend
- [ ] 팀 정보 입력 폼 컴포넌트 구현
- [ ] 팀원 정보 입력 폼 컴포넌트 구현
- [ ] 실시간 유효성 검사 구현
- [ ] 팀명 중복 확인 API 연동
- [ ] 팀원 추가/삭제 기능 구현
- [ ] 폼 상태 관리 구현
- [ ] 에러 처리 및 피드백 구현

### Backend
- [ ] 팀명 중복 확인 API 구현
- [ ] 팀 정보 저장 API 구현
- [ ] 팀원 정보 저장 API 구현
- [ ] 유효성 검사 로직 구현
- [ ] 데이터베이스 스키마 설계
- [ ] 보안 검증 로직 구현

### 테스트
- [ ] 단위 테스트 작성
- [ ] 통합 테스트 작성
- [ ] E2E 테스트 작성
- [ ] 성능 테스트 수행

## 🔗 관련 문서

- [API 명세](../backend/docs/api-spec.md)
- [데이터베이스 스키마](../backend/docs/database-schema.md)
- [프론트엔드 컴포넌트 가이드](../frontend/docs/components.md)

---

**작성일**: 2024년 12월
**작성자**: AI Solution Owner
**버전**: 1.0
**상태**: Ready for Development
