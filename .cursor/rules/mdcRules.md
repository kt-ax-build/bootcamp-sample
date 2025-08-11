
---
# 1. 공통 사항

## [환경 및 기술 스택]
- Frontend
   - React 18.3
   - TypeScript 5.6
   - Vite 6.0
   - Material-UI 6.3
   - Axios 1.7
   - Zustand 5.0
   - React Router DOM 7.1
- Backend
   - Java 17
   - Spring Boot 
   - **Build Tool:** Gradle (테스트 및 Lint(`spotlessApply`)는 `gradlew build` 시 자동으로 실행)
- Database
   - H2 Database (In-Memory)
   - **Local DB:** H2 인메모리 데이터베이스 (별도 설정 불필요)

## [Branch 전략]
- **Branch 전략:** `feature/이슈번호-feature-이슈제목` 형식으로 `develop` 브랜치에서 분기하여 생성합니다.

## [프로젝트명]
 - 해커톤 : hackathon

---

# 2. Frontend Code Guidelines

## **[개발 환경 및 기술 스택]**

- **Node.js:** LTS 버전 사용 (설치 후 `node --version`, `npm --version`으로 확인)
- **의존성 패키지:** `npm install` 명령어로 모든 의존성 설치
- **개발 서버 실행:** `npm run dev`
- **코드 포맷팅:**
    - **Prettier**를 사용하며, `.prettierrc` 설정을 반드시 따릅니다.
    - IDE에 "Prettier - Code formatter" 익스텐션을 설치하고, 저장 시 자동 포맷(`format on save`) 기능을 활성화해야 합니다.

## **[핵심 개발 규칙]**

### **1. 폴더 구조**

파일 생성 시 다음의 구조를 엄격히 준수해야 합니다.

```
src/
├── api/              # API 관련 설정
│   └── axios.ts      # axios 인스턴스 및 인터셉터 설정
├── assets/           # 정적 리소스 (이미지, 폰트 등)
├── components/       # 공통 컴포넌트
├── hooks/           # 커스텀 훅
├── layout/          # 레이아웃 컴포넌트
├── model/           # API 서비스 및 공통 타입 정의
├── pages/           # 페이지 컴포넌트
├── router/          # 라우팅 관련 컴포넌트
├── services/        # API 서비스(data fetch)
├── stores/          # 전역 상태 관리 (Zustand)
├── theme/           # MUI 테마 설정
├── types/           # typescript용 타입 정의(*.d.ts 파일)
└── utils/           # 기타 공용 유틸리티 함수
```
- **페이지별 모듈:**
    - 모든 페이지는 `src/pages/` 폴더 하위에 **페이지 이름으로 된 폴더**를 생성하여 독립적으로 구성합니다.
    - **페이지 전용 컴포넌트:** `pages/[페이지명]/components/` 폴더 안에 위치시킵니다.
    - **페이지 전용 스타일:** `pages/[페이지명]/[컴포넌트명].styled.tsx` 파일에 분리하여 정의합니다.
    - **페이지 전용 타입:** `pages/[페이지명]/[컴포넌트명].model.ts` 파일에 분리하여 정의합니다.

### **2. 명명 규칙**

모든 이름은 기능과 의미를 명확히 알 수 있도록 작성합니다.

|   |   |   |
|---|---|---|
|**종류**|**규칙**|**예시**|
|**변수/함수명**|`camelCase`로 작성. Boolean 타입은 `is/has/are` 접두사 권장.|`memberList`, `isLogin`|
|**Component**|`PascalCase`로 작성. 파일 확장자는 `.tsx`|`LoginForm`|
|**Styled Component 파일**|`[컴포넌트명].styled.tsx`|`LoginForm.styled.tsx`|
|**Model/Type 파일**|`[컴포넌트명].model.ts`|`LoginForm.model.ts`|
|**Custom Hook**|`use`로 시작하는 `camelCase`.|`useDialog`|
|**Zustand Store**|`PascalCase`로 작성.|`AuthStore`|
|**Session/Local Storage**|`SNAKE_CASE` (대문자).|`NAVER_LOGIN_INFORMATION`|

### **3. 스타일링 (MUI)**

- **Styled Components 방식**을 최우선으로 사용합니다. (`*.styled.tsx` 파일 분리)
- 색상, 간격 등 디자인 토큰 값은 전역 `theme` 객체의 값을 사용합니다. (예: `theme.spacing(1)`, `theme.palette.primary.main`)
- 간단한 스타일 수정이 필요할 때만 `sx` props를 제한적으로 사용합니다.

### **4. API 연동 (데이터 요청/수신)**

1. **모델 정의 (`src/model`):**
    - 백엔드 API 명세에 따라 요청 매개변수(`*RequestParams`), 응답(`*Response`) 타입을 `interface`로 명확히 정의합니다.
    - 공통 응답 형식은 `CommonResponse<T>` 제네릭 타입을 확장하여 사용합니다. (예: `export interface GetUserResponse extends CommonResponse<User> {}`)
2. **서비스 개발 (`src/services`):**
    - `src/api/axios.ts`의 `axiosInstance`를 사용합니다.
    - 재사용 가능한 API 호출 함수를 도메인별 서비스 파일(예: `AuthService.ts`)에 구현합니다.
    - 모든 비동기 API 호출은 `async/await` 문법을 사용합니다.

### **5. 전역 상태 관리 (Zustand)**

- **Context API 사용을 지양**하고, 전역 상태는 반드시 **Zustand**를 사용합니다.
- 도메인별로 독립적인 스토어(`*Store.ts`)를 생성합니다. (예: `AuthStore.ts`, `ThemeStore.ts`)
- 컴포넌트에서 스토어 사용 시, 렌더링 최적화를 위해 **전체 스토어를 구독하지 말고 필요한 상태나 액션만 선택(select)하여 사용**합니다.
    - **올바른 사용:** `const login = useAuthStore((state) => state.login);`
    - **잘못된 사용:** `const store = useAuthStore();`
- 상태 영속성이 필요할 경우, `persist` 미들웨어를 사용합니다.
- 개발 환경(`import.meta.env.DEV`)에서는 `simple-zustand-devtools`의 `mountStoreDevtool`을 설정하여 React Dev Tool에서 스토어를 추적할 수 있도록 합니다.

### **6. 비동기 처리**

- 모든 Promise 기반 비동기 작업은 `async/await`를 사용하여 가독성을 높입니다.
- `await`를 사용하는 모든 함수는 반드시 `try...catch` 블록으로 감싸 예외 상황을 처리해야 합니다.
- 여러 비동기 작업을 동시에 처리해야 할 경우, `Promise.all`을 사용하여 병렬로 처리합니다.

### **7. 보안 (Security)**

- **환경 변수 보안:**
    - `VITE_` 접두사가 붙은 환경 변수는 빌드 시점에 코드에 그대로 주입되어 클라이언트에 노출됩니다. 따라서 **API 비밀 키, 시크릿 등 민감한 정보는 절대로 `.env` 파일에 저장해서는 안 됩니다.**
    - 환경별 파일(`.env.local`, `.env.development` 등)을 구분하여 사용합니다.
    - 환경 변수 수정 후에는 반드시 개발 서버를 재시작해야 적용됩니다.
- **Session / Local Storage 사용:**
    - 저장소에 사용되는 키(Key)는 **대문자 `SNAKE_CASE`**를 사용해야 합니다. (예: `NAVER_LOGIN_INFORMATION`)
    - 브라우저 저장소는 사용자가 접근 및 수정할 수 있으므로, 암호와 같은 민감 데이터 저장을 지양해야 합니다.
- **데이터 유효성 검사 (Validation):**
    - 백엔드가 최종 검사를 하더라도, 프런트엔드에서 기본적인 데이터 유효성 검사를 수행하여 UX를 개선하고 불필요한 API 호출을 방지해야 합니다.

---

# 3. Backend Code Guidelines

## **[핵심 개발 규칙]**

### **1. API 설계 및 문서화 (REST API 가이드)**

- **URI 설계:**
    - URI 구조: `/{prefix}/{serviceName}/{apiVersion}/{resourceName}` 형식을 따릅니다. (예: `/api/koko/v1/boards`)
    - 리소스 이름은 **소문자 명사**를 사용하고, 단어 구분은 **하이픈(-)**을 사용합니다.
    - URI에 행위(동사)를 포함하지 않습니다. (예: `delete-board` (X))
    - URI 끝에 슬래시(`/`)를 포함하지 않습니다.
- **HTTP 메소드:**
    - **GET:** 조회, **POST:** 생성, **PUT:** 전체 수정, **DELETE:** 삭제.
    - CRUD로 표현할 수 없는 로직은 **POST**를 사용합니다.
- **응답 데이터 구조:**
    - 모든 응답은 JSON 형식이며, `successOrNot`, `statusCode`, `data` 필드를 포함하는 공통 구조를 따릅니다.
    - 페이징 조회의 경우 `paging` 객체를 추가합니다.
- **HTTP 상태 코드:**
    - 성공: `200(OK)`, `201(Created)`, `204(No Content)`.
    - 실패: `400(Bad Request)`, `404(Not Found)`, `409(Conflict)`.
- **버전 관리:**
    - URI에 메이저 버전만 표기합니다 (예: `v1`).
- **문서화:**
    - **Swagger 3.0**을 사용하며, Controller와 DTO에 `@Operation`, `@Schema` 등의 어노테이션을 명확히 작성해야 합니다.

### **2. 패키지 구조 및 명명 규칙 (백엔드 가이드)**

- **패키지 구조:** `com.kt.{프로젝트명}.be.{service명}.{업무명}.{역할별 패키지명}` 규칙을 따릅니다. (예: `com.kt.hackathon.be.koko.board.controller`)
- **역할별 패키지:**
    - `controller`: API End Point. `service` 호출 및 결과 리턴.
    - `service`: 핵심 비즈니스 로직 처리. `repository` 호출.
    - `repository`: 데이터 영속성 처리 (MyBatis). 비즈니스 판단 로직 없음.
    - `dto`: Request/Response 데이터 객체. 클래스명은 `*RequestDto`, `*ResponseDto`로 끝납니다.
    - `model`: DB 테이블과 매핑되는 데이터 객체.
- **명명 규칙:**
    - **Self-descriptive**하게 작성하고 약어는 사용하지 않습니다.
    - 클래스명: `PascalCase`
    - 메소드/변수명: `camelCase`
    - 상수명: `대문자 SNAKE_CASE`
- **Lombok 사용:**
    - `@Data` 어노테이션 사용을 **금지**합니다.
    - 객체 생성 시 `@Builder` 또는 `@SuperBuilder` 사용을 원칙으로 합니다.

### **3. 데이터베이스 및 마이그레이션 (DB 가이드)**

- **테이블 설계:**
    - 테이블/컬럼명은 **소문자 `snake_case`**를 사용합니다.
    - 모든 테이블에는 `first_create_datetime`, `first_create_uid`, `first_create_uid_ip`, `last_update_datetime`, `last_update_uid`, `last_update_uid_ip` 6개의 메타 컬럼을 반드시 포함해야 합니다.
- **인덱스 설계:**
    - 명명 규칙: `ix_{테이블명}_{시퀀스}` 또는 `ux_{테이블명}_{시퀀스}`.
    - `LIKE` 검색 시 `'값%'` 형태만 인덱스를 사용합니다. `NOT`, `<`, `>` 는 인덱스를 사용하지 않으므로 사용을 지양합니다.
- **DB 마이그레이션 (Flyway):**
    - 모든 DDL/DML 변경사항은 **Flyway** 스크립트로 관리합니다.
    - **파일 위치:** `src/main/resources/db/migration/common_sql`
    - **파일 명명 규칙 (매우 중요):** `V{스프린트번호}_{개발자순서}_{스토리번호}_{순서}__{유형}_{대상테이블명}_{대상유형}.sql` (예: `V1_1_103_1__create_board_table.sql`)
    - 하나의 파일에는 하나의 동작만 정의합니다 (유형이나 테이블이 다르면 파일 분리).

### **4. 예외 및 트랜잭션 처리 (백엔드 가이드)**

- **예외 처리:**
    - `BusinessException`, `SystemException`, `AuthorizationException` 3가지 기본 예외 클래스를 사용합니다.
    - `catch` 블록에서 `log.error()`를 사용하여 예외 자체를 로깅하여 스택 트레이스를 남겨야 합니다. 민감 정보는 로깅하지 않습니다.
- **트랜잭션 처리:**
    - `Service` 클래스 레벨에 `@Transactional(rollbackFor = Exception.class)`를 선언하여 모든 예외 발생 시 롤백되도록 합니다.
    - 조회 전용 메소드에는 `@Transactional(readOnly = true)`를 사용하여 성능을 최적화합니다.

### **5. 보안 (백엔드 가이드)**

- **입력값 검증:** 프런트엔드에서 검증했더라도, 백엔드(`Controller`)에서 모든 외부 입력값에 대한 유효성 검사를 다시 수행해야 합니다.
- **SQL Injection:** MyBatis 사용을 통해 기본적으로 방어하지만, 동적 쿼리 작성 시 주의해야 합니다.
- **암호화:**
    - 패스워드는 단방향으로 암호화하여 저장합니다.
- **세션:** 중요 정보는 쿠키가 아닌 세션을 활용합니다.