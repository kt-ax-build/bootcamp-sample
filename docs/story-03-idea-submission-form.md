# Story 3: 아이디어 정보 입력 및 파일 첨부 기능 구현

## 📋 Story 정보

- **Story 제목**: 아이디어 정보 입력 및 파일 첨부 기능 구현
- **기능 범위**: Full-Stack
- **Estimation**: 8
- **초과/미만 사유**: 기본 8점 유지 (표준적인 폼 입력 및 파일 업로드 기능)
- **실제 Story Point**: 8
- **우선순위**: Medium
- **의존성**: Story 2 (팀 정보 입력 완료 후)

## 🎯 Story 문장

"사용자로서, 나는 아이디어 정보를 입력하고 필요한 파일을 첨부할 수 있는 폼을 이용하고 싶다. 그래야 해결하고자 하는 문제와 접근 방법을 명확히 기술하고, 관련 자료를 업로드할 수 있다."

## ✅ Acceptance Criteria

### 1. 아이디어 정보 입력
- **Given** 아이디어 정보 섹션에서
- **When** 아이디어 제목, 문제 정의, 솔루션 접근 방법을 입력하면
- **Then** 각 필드의 글자 수 제한(300자, 500자)이 실시간으로 표시된다
- **And** 글자 수 초과 시 입력이 차단되고 경고 메시지가 표시된다

### 2. 기술 스택 입력
- **Given** 기술 스택 입력 필드에서
- **When** 사용 예정 기술을 입력하면
- **Then** 쉼표로 구분된 형태로 저장되고 태그 형태로 표시된다
- **And** 중복 입력이 방지된다

### 3. 파일 첨부 기능
- **Given** 파일 첨부 영역에서
- **When** 파일을 선택하면
- **Then** 허용된 확장자(PDF, ZIP, PPTX, JPG)와 최대 용량(10MB)을 검증한다
- **And** 검증 실패 시 오류 메시지가 표시된다

### 4. 파일 관리 기능
- **Given** 업로드된 파일이 있을 때
- **When** 삭제 버튼을 클릭하면
- **Then** 파일이 목록에서 제거되고 새로운 파일 업로드가 가능해진다
- **Given** 파일을 클릭했을 때
- **When** 미리보기 기능이 지원되는 파일 형식이면
- **Then** 파일 미리보기가 표시된다

### 5. 개인정보 동의
- **Given** 개인정보 수집/이용 동의 체크박스가
- **When** 체크되지 않은 상태에서 신청하기를 클릭하면
- **Then** 동의 필수 메시지가 표시되고 제출이 차단된다

## 🎨 UI/UX 요구사항

### 폼 디자인
- **레이아웃**: 섹션별 카드 형태로 구분
- **입력 필드**: Material-UI TextField, Textarea 컴포넌트
- **파일 업로드**: 드래그 앤 드롭 지원
- **진행률 표시**: 파일 업로드 진행률 바

### 사용자 경험
- **실시간 피드백**: 글자 수 카운터, 파일 검증 결과
- **드래그 앤 드롭**: 파일을 폴더에서 직접 드래그 가능
- **파일 미리보기**: 이미지, PDF 미리보기 지원
- **업로드 진행률**: 대용량 파일 업로드 시 진행률 표시

## 🔧 기술 요구사항

### Frontend 기술 스택
- **React 18.3** + **TypeScript 5.6**
- **Material-UI 6.3**: 폼 컴포넌트
- **React Dropzone**: 파일 드래그 앤 드롭
- **File Reader API**: 파일 미리보기
- **Axios**: 파일 업로드 API 통신

### Backend 기술 스택
- **Spring Boot 3.2.0**
- **MultipartFile**: 파일 업로드 처리
- **Spring Security**: 파일 업로드 보안
- **파일 저장소**: 로컬 또는 클라우드 스토리지

### API 엔드포인트
```typescript
// 아이디어 정보 저장
POST /api/hackathon/v1/applications/{teamId}/idea

// 파일 업로드
POST /api/hackathon/v1/applications/{applicationId}/files

// 파일 삭제
DELETE /api/hackathon/v1/applications/{applicationId}/files/{fileId}

// 파일 다운로드
GET /api/hackathon/v1/applications/{applicationId}/files/{fileId}
```

## 📊 데이터 모델

### 아이디어 정보
```typescript
interface IdeaInfo {
  id: number;
  applicationId: number;
  ideaTitle: string;
  problemStatement: string;
  solutionApproach: string;
  techStack: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### 파일 정보
```typescript
interface FileInfo {
  id: number;
  applicationId: number;
  fileName: string;
  originalFileName: string;
  fileSize: number;
  fileType: string;
  filePath: string;
  uploadedAt: Date;
}
```

## 🔒 보안 요구사항

### 파일 업로드 보안
- **파일 형식 검증**: MIME 타입 및 확장자 검증
- **파일 크기 제한**: 개별 파일 10MB, 전체 50MB 제한
- **악성코드 검증**: 업로드된 파일 스캔
- **파일명 보안**: 특수문자 제거, 중복 처리

### 접근 제어
- **파일 접근 권한**: 신청자만 파일 접근 가능
- **파일 다운로드**: 인증된 사용자만 다운로드 가능
- **파일 삭제**: 신청자만 삭제 가능

## 📁 파일 관리 정책

### 허용 파일 형식
- **문서**: PDF, DOC, DOCX, PPT, PPTX
- **압축**: ZIP, RAR
- **이미지**: JPG, PNG, GIF
- **코드**: TXT, MD

### 파일 크기 제한
- **개별 파일**: 최대 10MB
- **전체 파일**: 최대 50MB
- **파일 개수**: 최대 10개

## 🧪 테스트 케이스

### 단위 테스트
- 아이디어 정보 유효성 검사 테스트
- 파일 업로드 검증 로직 테스트
- 파일 형식 검증 테스트

### 통합 테스트
- 파일 업로드 API 테스트
- 아이디어 정보 저장 API 테스트
- 파일 삭제 API 테스트

### E2E 테스트
- 아이디어 정보 입력 전체 플로우 테스트
- 파일 업로드/삭제 테스트
- 개인정보 동의 테스트

## 📋 개발 체크리스트

### Frontend
- [ ] 아이디어 정보 입력 폼 구현
- [ ] 글자 수 카운터 구현
- [ ] 파일 업로드 컴포넌트 구현
- [ ] 드래그 앤 드롭 기능 구현
- [ ] 파일 미리보기 기능 구현
- [ ] 파일 삭제 기능 구현
- [ ] 개인정보 동의 체크박스 구현

### Backend
- [ ] 아이디어 정보 저장 API 구현
- [ ] 파일 업로드 API 구현
- [ ] 파일 삭제 API 구현
- [ ] 파일 다운로드 API 구현
- [ ] 파일 검증 로직 구현
- [ ] 파일 저장소 설정
- [ ] 보안 검증 로직 구현

### 테스트
- [ ] 단위 테스트 작성
- [ ] 통합 테스트 작성
- [ ] E2E 테스트 작성
- [ ] 파일 업로드 성능 테스트

## 🔗 관련 문서

- [파일 업로드 가이드](../backend/docs/file-upload-guide.md)
- [보안 정책](../docs/security-policy.md)
- [API 명세](../backend/docs/api-spec.md)

---

**작성일**: 2024년 12월
**작성자**: AI Solution Owner
**버전**: 1.0
**상태**: Ready for Development
