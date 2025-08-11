# AI 해커톤 웹사이트

AI 해커톤 참가 신청 및 관리 시스템입니다. 팀 정보, 팀원 정보, 아이디어 정보를 관리하고 조회할 수 있는 웹 애플리케이션입니다.

## 🚀 기술 스택

### Frontend
- **React 18.3** - 사용자 인터페이스 라이브러리
- **TypeScript 5.6** - 타입 안전성을 위한 JavaScript 확장
- **Vite 6.0** - 빠른 개발 서버 및 빌드 도구
- **Material-UI 6.3** - React UI 컴포넌트 라이브러리
- **Axios 1.7** - HTTP 클라이언트
- **Zustand 5.0** - 상태 관리 라이브러리
- **React Router DOM 7.1** - 클라이언트 사이드 라우팅

### Backend
- **Java 17** - 프로그래밍 언어
- **Spring Boot 3.2.0** - Java 웹 프레임워크
- **Spring Data JPA** - 데이터 접근 계층
- **H2 Database** - 인메모리 관계형 데이터베이스
- **Gradle** - 빌드 도구
- **Swagger/OpenAPI** - API 문서화

### Database
- **H2 Database** - 인메모리 데이터베이스 (별도 설치 불필요)
- **H2 Console** - 웹 기반 데이터베이스 관리 도구

## 📁 프로젝트 구조

```
bootCamp/
├── frontend/                 # React 프론트엔드
│   ├── src/
│   │   ├── api/             # API 설정
│   │   ├── components/       # 공통 컴포넌트
│   │   ├── model/           # 타입 정의
│   │   ├── services/        # API 서비스
│   │   └── ...
│   ├── package.json
│   └── ...
├── backend/                  # Spring Boot 백엔드
│   ├── src/main/java/
│   │   └── com/kt/hackathon/be/
│   │       ├── application/
│   │       │   ├── controller/    # REST API 컨트롤러
│   │       │   ├── service/       # 비즈니스 로직
│   │       │   ├── repository/    # 데이터 접근 계층
│   │       │   ├── model/         # 엔티티 클래스
│   │       │   └── dto/           # 데이터 전송 객체
│   │       └── config/            # 설정 클래스
│   ├── build.gradle
│   └── ...

├── architecture.md           # 아키텍처 가이드
└── README.md                # 프로젝트 문서
```

## 🛠️ 설치 및 실행

### 사전 요구사항
- Node.js 18+ (프론트엔드)
- Java 17+ (백엔드)
- H2 Database는 Spring Boot에 내장되어 있어 별도 설치 불필요

### 1. 데이터베이스 설정
H2 데이터베이스는 Spring Boot 애플리케이션과 함께 자동으로 시작됩니다. 별도의 설정이 필요하지 않습니다.

**H2 Console 접속**: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:hackathon_db`
- Username: `sa`
- Password: (비어있음)

**H2 데이터베이스 특징:**
- **인메모리 데이터베이스**: 애플리케이션 재시작 시 데이터 초기화
- **빠른 시작**: 별도 설치나 설정 불필요
- **개발 환경 최적화**: 테스트 및 개발에 적합
- **자동 스키마 생성**: JPA 엔티티 기반으로 테이블 자동 생성

### 2. 백엔드 실행
```bash
cd backend

# 의존성 설치 및 빌드
./gradlew build

# 개발 서버 실행
./gradlew bootRun
```

백엔드 서버는 `http://localhost:8080`에서 실행됩니다.

### 3. 프론트엔드 실행
```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

프론트엔드는 `http://localhost:5173`에서 실행됩니다.

## 🎯 주요 기능

### 1. 참가 신청
- **팀 정보 입력**: 팀명, 팀 구성, 팀 소개
- **팀원 정보 관리**: 팀 리더 및 추가 팀원 정보 입력
- **아이디어 정보**: 아이디어 제목, 설명, 문제 정의, 솔루션 접근 방법
- **기술 스택**: 사용 예정 기술 스택 입력

### 2. 신청 조회
- **팀명으로 조회**: 팀명을 입력하여 신청 정보 조회
- **이메일로 조회**: 신청자 이메일을 입력하여 신청 정보 조회
- **상세 정보 표시**: 팀 정보, 팀원 정보, 아이디어 정보, 신청 상태 표시

### 3. 관리 기능
- **신청 목록 조회**: 모든 신청 정보 조회
- **신청 상태 관리**: PENDING, APPROVED, REJECTED 상태 관리
- **신청 정보 수정**: 기존 신청 정보 수정
- **신청 삭제**: 신청 정보 삭제

## 📊 데이터베이스 스키마

### 주요 테이블
- **teams**: 팀 정보
- **team_members**: 팀원 정보
- **hackathon_applications**: 해커톤 신청 정보

### 관계
- `teams` ↔ `team_members`: 1:N 관계
- `teams` ↔ `hackathon_applications`: 1:1 관계

## 🔧 개발 가이드

### 프론트엔드 개발
```bash
cd frontend

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 테스트
npm run test

# 코드 포맷팅
npm run format
```

### 백엔드 개발
```bash
cd backend

# 개발 서버 실행
./gradlew bootRun

# 빌드
./gradlew build

# 테스트
./gradlew test

# 코드 포맷팅
./gradlew spotlessApply
```

### API 문서
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- API 엔드포인트: `http://localhost:8080/api/hackathon/v1/`

## 🧪 테스트

### 프론트엔드 테스트
```bash
cd frontend
npm run test          # 단위 테스트
npm run test:watch    # 테스트 감시 모드
npm run test:coverage # 커버리지 리포트
npm run test:e2e      # E2E 테스트
```

### 백엔드 테스트
```bash
cd backend
./gradlew test        # 단위 테스트
./gradlew jacocoTestReport  # 커버리지 리포트
```

## 📝 API 명세

### 참가 신청 API
- `POST /api/hackathon/v1/applications` - 신청 생성
- `GET /api/hackathon/v1/applications` - 신청 목록 조회
- `GET /api/hackathon/v1/applications/{id}` - 신청 상세 조회
- `PUT /api/hackathon/v1/applications/{id}` - 신청 수정
- `DELETE /api/hackathon/v1/applications/{id}` - 신청 삭제

### 조회 파라미터
- `teamName`: 팀명으로 조회
- `memberName`: 팀원 이름 또는 이메일로 조회

## 🗄️ H2 Database

### H2 Console 접속
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:hackathon_db`
- Username: `sa`
- Password: (비어있음)

### 데이터베이스 특징
- **인메모리 데이터베이스**: 애플리케이션 재시작 시 데이터 초기화
- **개발 환경 최적화**: 빠른 시작과 테스트에 적합
- **별도 설치 불필요**: Spring Boot에 내장되어 있음

## 📋 개발 규칙

### 브랜치 전략
- `feature/이슈번호-feature-이슈제목` 형식으로 브랜치 생성
- `develop` 브랜치에서 분기

### 코드 스타일
- **프론트엔드**: Prettier를 사용한 자동 포맷팅
- **백엔드**: Google Java Format을 사용한 자동 포맷팅

### 명명 규칙
- **변수/함수**: `camelCase`
- **컴포넌트**: `PascalCase`
- **상수**: `SNAKE_CASE`

## 🚨 문제 해결

### 일반적인 문제들

1. **데이터베이스 연결 오류**
   - H2 데이터베이스는 Spring Boot와 함께 자동으로 시작됩니다
   - 애플리케이션 재시작으로 문제 해결 가능

2. **포트 충돌**
   - 백엔드: 8080 포트 확인
   - 프론트엔드: 5173 포트 확인
   - H2 Console: 8080 포트 (백엔드와 동일)

3. **빌드 오류**
   ```bash
   # 프론트엔드
   cd frontend
   rm -rf node_modules package-lock.json
   npm install

   # 백엔드
   cd backend
   ./gradlew clean build
   ```

## 📞 지원

프로젝트 관련 문의사항이 있으시면 다음으로 연락해주세요:
- 이메일: ai-hackathon@company.com

## 📄 라이선스

이 프로젝트는 내부 사용을 위한 프로젝트입니다. 