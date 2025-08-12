# Story 1: 참가 안내 페이지 구현

## 📋 Story 정보

- **Story 제목**: 참가 안내 페이지 구현
- **기능 범위**: Front-End
- **Estimation**: 8
- **초과/미만 사유**: 기본 8점 유지 (표준적인 정보 페이지 구현)
- **실제 Story Point**: 8
- **우선순위**: High
- **의존성**: 없음 (독립적으로 개발 가능)

## 🎯 Story 문장

"사용자로서, 나는 참가 안내 정보를 쉽게 확인할 수 있는 페이지를 만들고 싶다. 이를 통해 참가 자격, 팀 구성, 신청 방법, 주요안내사항 등을 명확히 파악할 수 있다."

## ✅ Acceptance Criteria

### 1. 참가 안내 섹션
- **Given** 메인페이지에 접속해서
- **When** 사용자가 페이지를 스크롤하면 
- **Then** 대회 소개 섹션 다음에 참가 안내 섹션이 표시된다:
  - 참가 자격 (사내 임직원, AI 관심자, 프로그래밍 경험/의지)
  - 팀 구성 (1~4명, 자유 구성, 팀 리더 지정)
  - 신청 방법 (3단계 프로세스)
  - 주요 안내사항 (마감일, 선발 인원, 제공 사항, 시상, 문의)
  - 상세 내용은 피그마를 참고 : https://www.figma.com/design/SklE8qQCS7NQ668BIKi3cB/%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84-%EC%8B%9C%EC%95%88--%EA%B3%B5%EC%9C%A0%EC%9A%A9-?node-id=1-282&m=dev

### 2. 네비게이션 기능
- **Given** 메인페이지에 접속해서
- **When** 네비게이션 바에서 "참가 안내" 메뉴를 선택하면
- **Then** 해당 섹션으로 부드럽게 스크롤되어 이동한다


## 🎨 UI/UX 요구사항

### 디자인 시스템
- **색상**: 피그마 디자인과 일치
  - 메인 컬러: `#9810fa` (Electric Violet)
  - 배경: `#0f172b` (Oxford Blue)
  - 텍스트: `#ffffff`, `#d1d5dc`
- **폰트**: Apple SD Gothic Neo, SF Pro Text
- **레이아웃**: 1920px 기준 중앙 정렬

### 컴포넌트
- **네비게이션 바**: 로고, 메뉴, CTA 버튼
- **정보 카드**: 글래스모피즘 효과, 아이콘, 제목, 내용


## 🔧 기술 요구사항

### Frontend 기술 스택
- **React 18.3** + **TypeScript 5.6**
- **Material-UI 6.3**: 디자인 시스템 구현
- **CSS-in-JS**: 스타일링 (styled-components 또는 emotion)
- **반응형 디자인**: CSS Grid, Flexbox 활용

### 성능 요구사항
- **페이지 로딩 시간**: 3초 이내
- **스크롤 성능**: 60fps 유지
- **이미지 최적화**: WebP 포맷 사용, lazy loading

### 접근성 요구사항
- **키보드 네비게이션**: Tab 키로 모든 요소 접근 가능
- **스크린리더 지원**: ARIA 라벨, 시맨틱 HTML
- **색상 대비**: WCAG 2.1 AA 준수


## 📋 개발 체크리스트

- [ ] 참가 안내 섹션 구현
- [ ] 참가 자격 카드 구현
- [ ] 팀 구성 카드 구현
- [ ] 신청 방법 카드 구현
- [ ] 주요 안내사항 카드 구현
- [ ] 네비게이션 바 참가 안내 버튼 구현


## 🔗 관련 문서

- [피그마 디자인](https://www.figma.com/design/SklE8qQCS7NQ668BIKi3cB/%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84-%EC%8B%9C%EC%95%88--%EA%B3%B5%EC%9C%A0%EC%9A%A9-?node-id=1-282&t=YikVCzM53lZqS2kU-4)
- [아키텍처 가이드](../.cursor/rules/mdcRules.md)
- [초기소스](../_backup/AI%20해커톤%20웹사이트/)
- [피그마 전체 디자인 캡쳐](../_backup/1920w_default.png)

---

**작성일**: 2025년 8월
**작성자**: AX Build TF
**버전**: 1.0
**상태**: Ready for Development
