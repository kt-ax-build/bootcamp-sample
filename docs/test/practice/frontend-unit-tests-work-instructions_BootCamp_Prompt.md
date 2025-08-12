### 프론트엔드 유니트 테스트 작업지시서 (교육용, HackathonService TC-UNIT-001~005)

목표: 본 지시서를 그대로 사용하면 `HackathonService` 유니트 테스트 파일을 생성하고, Jest 실행 시 모든 케이스가 통과하도록 작성할 수 있습니다.

## 생성 대상 파일
- 경로: `bootcamp-sample/frontend/src/services/__tests__/HackathonService.test.ts`

## 구현 요구사항
- 러너/환경: Jest(jsdom) + ts-jest, `setupFilesAfterEnv`에서 `import.meta.env` 설정
- 모킹: `../../api/axios`의 `axiosInstance`를 모킹하여 HTTP를 전부 차단
  - `defaults`: `timeout`, `headers`, `baseURL` 지정
  - `interceptors`: `request/response`에 dummy 핸들러
  - `post/get/put/delete`: `jest.fn()`으로 정의
- 검증: 각 서비스 메서드가 올바른 URL/파라미터로 호출되는지, 정상 결과/예외/메시지 매핑을 확인

## 케이스별 구현 가이드
- U1-U2 createApplication: 성공 시 `post('/api/hackathon/v1/applications', body)`, 실패 시 예외 전파
- U3-U7 getApplications: 
  - 성공(무파라미터): `get('/api/hackathon/v1/applications', { timeout:10000 })`
  - 성공(파라미터): `get(..., { params, timeout:10000 })`
  - 실패(400/404/기타): 각각 메시지 `'검색 조건이 올바르지 않습니다.'`, `'해당 정보를 찾을 수 없습니다.'`, `'조회 중 오류가 발생했습니다.'`
- U8-U9 getApplication: `get('/api/hackathon/v1/applications/:id')` 성공/실패
- U10-U11 updateApplication: `put('/api/hackathon/v1/applications/:id', body)` 성공/실패
- U12-U13 deleteApplication: `delete('/api/hackathon/v1/applications/:id')` 성공(`void`), 실패 시 예외 전파

## 샘플 스니펫
```ts
// axios 모듈을 모킹하여 import.meta.env 문제를 우회하고 HTTP 호출을 제어
jest.mock('../../api/axios', () => {
  const post = jest.fn();
  const get = jest.fn();
  const put = jest.fn();
  const _delete = jest.fn();
  return {
    axiosInstance: {
      defaults: {
        timeout: 10000,
        headers: { 'Content-Type': 'application/json' },
        baseURL: 'http://localhost:8080',
      },
      interceptors: {
        request: { handlers: [{}] },
        response: { handlers: [{}] },
      },
      post,
      get,
      put,
      delete: _delete,
    },
  };
});

import { axiosInstance } from '../../api/axios';
import { HackathonService } from '../HackathonService';

// 예: create 성공
(axiosInstance.post as jest.Mock).mockResolvedValueOnce({ data: { id: 1, team: { teamName: '테스트팀' } } });
const created = await HackathonService.createApplication({ teamName: '테스트팀', members: [] });
expect(axiosInstance.post).toHaveBeenCalledWith('/api/hackathon/v1/applications', { teamName: '테스트팀', members: [] });
expect(created.id).toBe(1);

// 예: getApplications 400 매핑
(axiosInstance.get as jest.Mock).mockRejectedValueOnce({ response: { status: 400 } });
await expect(HackathonService.getApplications({ teamName: '' })).rejects.toThrow('검색 조건이 올바르지 않습니다.');

// 예: getApplications 성공(파라미터)
(axiosInstance.get as jest.Mock).mockResolvedValueOnce({ data: [] });
await HackathonService.getApplications({ teamName: 'T' });
expect(axiosInstance.get).toHaveBeenCalledWith(
  '/api/hackathon/v1/applications',
  expect.objectContaining({ params: { teamName: 'T' }, timeout: 10000 })
);
```

## 실행 방법
```bash
cd bootcamp-sample/frontend && npm run test
```

## 트러블슈팅
- ESM/ts-jest 설정: `jest.config.js`의 `transform`/`extensionsToTreatAsEsm` 확인
- axios ESM 변환: `transformIgnorePatterns`에 `node_modules/(?!axios/)` 포함되어야 함
- `import.meta.env` 이슈: `src/setupTests.ts`에서 VITE 변수를 기본값으로 세팅했는지 확인
- 콘솔 에러 로그: `getApplications` 에러 경로에서 `console.error` 출력은 정상 동작이며 테스트 실패와 무관
- 경로 오류: 테스트 파일에서 모킹 경로는 `../../api/axios`(서비스 파일 기준)

## 완료 기준
- 테스트: 모든 케이스 통과(예: `13 passed`)
- 각 메서드의 API 호출/파라미터/에러 메시지 매핑이 정확히 검증됨


