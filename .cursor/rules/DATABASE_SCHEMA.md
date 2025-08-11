# AI 해커톤 웹사이트 데이터베이스 스키마

## 📋 개요

AI 해커톤 참가 신청 및 관리 시스템의 데이터베이스 스키마 문서입니다. 이 문서는 H2 데이터베이스를 기반으로 한 테이블 구조, 관계, 제약조건을 상세히 설명합니다.

## 🗄️ 데이터베이스 정보

- **데이터베이스**: H2 Database (인메모리)
- **데이터베이스명**: `hackathon_db`
- **JDBC URL**: `jdbc:h2:mem:hackathon_db`
- **사용자명**: `sa`
- **비밀번호**: (비어있음)
- **H2 Console**: `http://localhost:8080/h2-console`

## 🏗️ 테이블 구조

### 1. teams (팀 정보)

팀의 기본 정보를 저장하는 테이블입니다.

#### 컬럼 정의
| 컬럼명 | 데이터 타입 | 제약조건 | 설명 |
|--------|-------------|----------|------|
| `id` | `BIGSERIAL` | `PRIMARY KEY` | 팀 고유 식별자 (자동 증가) |
| `team_name` | `VARCHAR(255)` | `NOT NULL, UNIQUE` | 팀명 (고유값) |
| `team_size` | `VARCHAR(50)` | - | 팀 구성원 수 |
| `team_description` | `TEXT` | - | 팀 소개 및 설명 |
| `first_create_datetime` | `VARCHAR(50)` | - | 최초 생성 일시 |
| `first_create_uid` | `VARCHAR(100)` | - | 최초 생성자 ID |
| `first_create_uid_ip` | `VARCHAR(50)` | - | 최초 생성자 IP 주소 |
| `last_update_datetime` | `VARCHAR(50)` | - | 최종 수정 일시 |
| `last_update_uid` | `VARCHAR(100)` | - | 최종 수정자 ID |
| `last_update_uid_ip` | `VARCHAR(50)` | - | 최종 수정자 IP 주소 |

#### 인덱스
```sql
CREATE INDEX ix_teams_team_name ON teams(team_name);
```

#### DDL 스크립트
```sql
CREATE TABLE teams (
    id BIGSERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL UNIQUE,
    team_size VARCHAR(50),
    team_description TEXT,
    first_create_datetime VARCHAR(50),
    first_create_uid VARCHAR(100),
    first_create_uid_ip VARCHAR(50),
    last_update_datetime VARCHAR(50),
    last_update_uid VARCHAR(100),
    last_update_uid_ip VARCHAR(50)
);
```

---

### 2. team_members (팀원 정보)

팀에 속한 팀원들의 정보를 저장하는 테이블입니다.

#### 컬럼 정의
| 컬럼명 | 데이터 타입 | 제약조건 | 설명 |
|--------|-------------|----------|------|
| `id` | `BIGSERIAL` | `PRIMARY KEY` | 팀원 고유 식별자 (자동 증가) |
| `team_id` | `BIGINT` | `NOT NULL, FOREIGN KEY` | 소속 팀 ID (teams.id 참조) |
| `name` | `VARCHAR(255)` | `NOT NULL` | 팀원 이름 |
| `email` | `VARCHAR(255)` | `NOT NULL` | 팀원 이메일 |
| `phone` | `VARCHAR(50)` | - | 팀원 연락처 |
| `role` | `VARCHAR(100)` | - | 팀원 역할 |
| `department` | `VARCHAR(255)` | - | 팀원 소속 부서 |
| `position` | `VARCHAR(100)` | - | 팀원 직급 |
| `is_leader` | `BOOLEAN` | `DEFAULT FALSE` | 팀장 여부 |
| `first_create_datetime` | `VARCHAR(50)` | - | 최초 생성 일시 |
| `first_create_uid` | `VARCHAR(100)` | - | 최초 생성자 ID |
| `first_create_uid_ip` | `VARCHAR(50)` | - | 최초 생성자 IP 주소 |
| `last_update_datetime` | `VARCHAR(50)` | - | 최종 수정 일시 |
| `last_update_uid` | `VARCHAR(100)` | - | 최종 수정자 ID |
| `last_update_uid_ip` | `VARCHAR(50)` | - | 최종 수정자 IP 주소 |

#### 외래키 제약조건
```sql
FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
```

#### 인덱스
```sql
CREATE INDEX ix_team_members_team_id ON team_members(team_id);
CREATE INDEX ix_team_members_email ON team_members(email);
CREATE INDEX ix_team_members_name ON team_members(name);
```

#### DDL 스크립트
```sql
CREATE TABLE team_members (
    id BIGSERIAL PRIMARY KEY,
    team_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(100),
    department VARCHAR(255),
    position VARCHAR(100),
    is_leader BOOLEAN DEFAULT FALSE,
    first_create_datetime VARCHAR(50),
    first_create_uid VARCHAR(100),
    first_create_uid_ip VARCHAR(50),
    last_update_datetime VARCHAR(50),
    last_update_uid VARCHAR(100),
    last_update_uid_ip VARCHAR(50),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);
```

---

### 3. hackathon_applications (해커톤 신청 정보)

해커톤 참가 신청의 아이디어 및 기술 정보를 저장하는 테이블입니다.

#### 컬럼 정의
| 컬럼명 | 데이터 타입 | 제약조건 | 설명 |
|--------|-------------|----------|------|
| `id` | `BIGSERIAL` | `PRIMARY KEY` | 신청 고유 식별자 (자동 증가) |
| `team_id` | `BIGINT` | `NOT NULL, FOREIGN KEY` | 신청 팀 ID (teams.id 참조) |
| `idea_title` | `VARCHAR(500)` | - | 아이디어 제목 |
| `idea_description` | `TEXT` | - | 아이디어 상세 설명 |
| `problem_statement` | `TEXT` | - | 해결하고자 하는 문제 정의 |
| `solution_approach` | `TEXT` | - | 해결 접근 방법 |
| `tech_stack` | `TEXT` | - | 사용 예정 기술 스택 |
| `status` | `VARCHAR(20)` | `DEFAULT 'PENDING'` | 신청 상태 (PENDING, APPROVED, REJECTED) |
| `first_create_datetime` | `VARCHAR(50)` | - | 최초 생성 일시 |
| `first_create_uid` | `VARCHAR(100)` | - | 최초 생성자 ID |
| `first_create_uid_ip` | `VARCHAR(50)` | - | 최초 생성자 IP 주소 |
| `last_update_datetime` | `VARCHAR(50)` | - | 최종 수정 일시 |
| `last_update_uid` | `VARCHAR(100)` | - | 최종 수정자 ID |
| `last_update_uid_ip` | `VARCHAR(50)` | - | 최종 수정자 IP 주소 |

#### 외래키 제약조건
```sql
FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
```

#### 인덱스
```sql
CREATE INDEX ix_hackathon_applications_team_id ON hackathon_applications(team_id);
CREATE INDEX ix_hackathon_applications_status ON hackathon_applications(status);
```

#### DDL 스크립트
```sql
CREATE TABLE hackathon_applications (
    id BIGSERIAL PRIMARY KEY,
    team_id BIGINT NOT NULL,
    idea_title VARCHAR(500),
    idea_description TEXT,
    problem_statement TEXT,
    solution_approach TEXT,
    tech_stack TEXT,
    status VARCHAR(20) DEFAULT 'PENDING',
    first_create_datetime VARCHAR(50),
    first_create_uid VARCHAR(100),
    first_create_uid_ip VARCHAR(50),
    last_update_datetime VARCHAR(50),
    last_update_uid VARCHAR(100),
    last_update_uid_ip VARCHAR(50),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);
```

---

### 4. idea_infos (아이디어 정보)

아이디어의 상세 정보를 저장하는 테이블입니다. (현재 JPA 엔티티로만 존재, 실제 테이블은 생성되지 않음)

#### 컬럼 정의
| 컬럼명 | 데이터 타입 | 제약조건 | 설명 |
|--------|-------------|----------|------|
| `id` | `BIGSERIAL` | `PRIMARY KEY` | 아이디어 고유 식별자 (자동 증가) |
| `title` | `VARCHAR(255)` | `NOT NULL` | 아이디어 제목 |
| `problem` | `VARCHAR(300)` | `NOT NULL` | 문제 정의 (최대 300자) |
| `solution` | `VARCHAR(500)` | `NOT NULL` | 해결 방법 (최대 500자) |
| `technology_stack` | `TEXT` | - | 기술 스택 |
| `application_id` | `BIGINT` | `FOREIGN KEY` | 신청 ID (hackathon_applications.id 참조) |
| `first_create_datetime` | `VARCHAR(50)` | - | 최초 생성 일시 |
| `first_create_uid` | `VARCHAR(100)` | - | 최초 생성자 ID |
| `first_create_uid_ip` | `VARCHAR(50)` | - | 최초 생성자 IP 주소 |
| `last_update_datetime` | `VARCHAR(50)` | - | 최종 수정 일시 |
| `last_update_uid` | `VARCHAR(100)` | - | 최종 수정자 ID |
| `last_update_uid_ip` | `VARCHAR(50)` | - | 최종 수정자 IP 주소 |

#### 외래키 제약조건
```sql
FOREIGN KEY (application_id) REFERENCES hackathon_applications(id)
```

#### DDL 스크립트 (참고용)
```sql
CREATE TABLE idea_infos (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    problem VARCHAR(300) NOT NULL,
    solution VARCHAR(500) NOT NULL,
    technology_stack TEXT,
    application_id BIGINT,
    first_create_datetime VARCHAR(50),
    first_create_uid VARCHAR(100),
    first_create_uid_ip VARCHAR(50),
    last_update_datetime VARCHAR(50),
    last_update_uid VARCHAR(100),
    last_update_uid_ip VARCHAR(50),
    FOREIGN KEY (application_id) REFERENCES hackathon_applications(id)
);
```

---

## 🔗 테이블 관계

### ERD (Entity Relationship Diagram)

```
teams (1) ←→ (N) team_members
   ↑
   │ (1)
   │
   │ (1)
   ↓
hackathon_applications
```

### 관계 상세

1. **teams ↔ team_members**: 1:N 관계
   - 하나의 팀은 여러 명의 팀원을 가질 수 있음
   - 각 팀원은 반드시 하나의 팀에만 속함
   - `team_members.team_id`가 `teams.id`를 참조
   - CASCADE DELETE: 팀이 삭제되면 관련 팀원도 삭제

2. **teams ↔ hackathon_applications**: 1:1 관계
   - 하나의 팀은 하나의 해커톤 신청만 가질 수 있음
   - 각 해커톤 신청은 반드시 하나의 팀에만 속함
   - `hackathon_applications.team_id`가 `teams.id`를 참조
   - CASCADE DELETE: 팀이 삭제되면 관련 신청도 삭제

3. **hackathon_applications ↔ idea_infos**: 1:1 관계 (참고용)
   - 현재는 JPA 엔티티로만 존재하며 실제 테이블은 생성되지 않음
   - 향후 확장을 위한 설계

---

## 📊 데이터 타입 상세

### 기본 데이터 타입

| 데이터 타입 | 설명 | 크기 제한 |
|-------------|------|------------|
| `BIGSERIAL` | 64비트 정수 (자동 증가) | - |
| `BIGINT` | 64비트 정수 | - |
| `VARCHAR(n)` | 가변 길이 문자열 | n자 이하 |
| `TEXT` | 긴 텍스트 | 제한 없음 |
| `BOOLEAN` | 논리값 | true/false |

### 제약조건

| 제약조건 | 설명 |
|----------|------|
| `PRIMARY KEY` | 기본키, 고유 식별자 |
| `NOT NULL` | NULL 값 허용하지 않음 |
| `UNIQUE` | 중복 값 허용하지 않음 |
| `FOREIGN KEY` | 외래키, 다른 테이블 참조 |
| `DEFAULT` | 기본값 설정 |
| `ON DELETE CASCADE` | 참조하는 레코드 삭제 시 연쇄 삭제 |

---

## 🗂️ 인덱스 전략

### 성능 최적화를 위한 인덱스

1. **teams 테이블**
   - `ix_teams_team_name`: 팀명 검색 최적화

2. **team_members 테이블**
   - `ix_team_members_team_id`: 팀별 팀원 조회 최적화
   - `ix_team_members_email`: 이메일로 팀원 검색 최적화
   - `ix_team_members_name`: 이름으로 팀원 검색 최적화

3. **hackathon_applications 테이블**
   - `ix_hackathon_applications_team_id`: 팀별 신청 조회 최적화
   - `ix_hackathon_applications_status`: 상태별 신청 조회 최적화

---

## 📝 감사(Audit) 정보

### 공통 감사 필드

모든 테이블에 다음 감사 정보가 포함되어 있습니다:

- **생성 정보**
  - `first_create_datetime`: 최초 생성 일시
  - `first_create_uid`: 최초 생성자 ID
  - `first_create_uid_ip`: 최초 생성자 IP 주소

- **수정 정보**
  - `last_update_datetime`: 최종 수정 일시
  - `last_update_uid`: 최종 수정자 ID
  - `last_update_uid_ip`: 최종 수정자 IP 주소

### 감사 정보 활용

1. **데이터 추적**: 언제, 누가, 어디서 데이터를 생성/수정했는지 추적
2. **보안 감사**: 데이터 접근 및 수정 이력 관리
3. **규정 준수**: 데이터 보호 및 개인정보 처리 규정 준수

---

