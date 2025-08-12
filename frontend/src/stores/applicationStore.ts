import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ApplicationForm, TeamMember } from '../types/application';

interface ApplicationState {
  form: ApplicationForm;
  isLoading: boolean;
  error: string | null;
  teamNameCheckResult: {
    isAvailable: boolean;
    message: string;
  } | null;
}

interface ApplicationActions {
  // 폼 상태 관리
  updateTeamInfo: (field: keyof ApplicationForm['teamInfo'], value: string) => void;
  updateIdeaInfo: (field: keyof ApplicationForm['ideaInfo'], value: string) => void;
  
  // 팀원 관리
  addTeamMember: () => void;
  removeTeamMember: (index: number) => void;
  updateTeamMember: (index: number, field: keyof TeamMember, value: string) => void;
  
  // 팀명 중복 확인
  setTeamNameCheckResult: (result: { isAvailable: boolean; message: string }) => void;
  clearTeamNameCheckResult: () => void;
  
  // 로딩 상태
  setLoading: (loading: boolean) => void;
  
  // 에러 처리
  setError: (error: string | null) => void;
  
  // 폼 초기화
  resetForm: () => void;
  
  // 폼 검증
  validateForm: () => { isValid: boolean; errors: string[] };
}

const initialForm: ApplicationForm = {
  teamInfo: {
    name: '',
    composition: '',
    description: '',
  },
  teamMembers: [
    {
      name: '',
      email: '',
      department: '',
      position: '',
      isLeader: true,
    },
  ],
  ideaInfo: {
    title: '',
    problem: '',
    solution: '',
    techStack: '',
  },
};

export const useApplicationStore = create<ApplicationState & ApplicationActions>()(
  devtools(
    (set, get) => ({
      form: initialForm,
      isLoading: false,
      error: null,
      teamNameCheckResult: null,

      updateTeamInfo: (field, value) =>
        set((state) => ({
          form: {
            ...state.form,
            teamInfo: {
              ...state.form.teamInfo,
              [field]: value,
            },
          },
        })),

      updateIdeaInfo: (field, value) =>
        set((state) => ({
          form: {
            ...state.form,
            ideaInfo: {
              ...state.form.ideaInfo,
              [field]: value,
            },
          },
        })),

      addTeamMember: () =>
        set((state) => {
          if (state.form.teamMembers.length >= 4) return state;
          
          return {
            form: {
              ...state.form,
              teamMembers: [
                ...state.form.teamMembers,
                {
                  name: '',
                  email: '',
                  department: '',
                  position: '',
                  isLeader: false,
                },
              ],
            },
          };
        }),

      removeTeamMember: (index) =>
        set((state) => {
          if (state.form.teamMembers.length <= 1) return state;
          
          const newTeamMembers = state.form.teamMembers.filter((_, i) => i !== index);
          // 첫 번째 팀원을 리더로 설정
          if (newTeamMembers.length > 0) {
            newTeamMembers[0].isLeader = true;
          }
          
          return {
            form: {
              ...state.form,
              teamMembers: newTeamMembers,
            },
          };
        }),

      updateTeamMember: (index, field, value) =>
        set((state) => ({
          form: {
            ...state.form,
            teamMembers: state.form.teamMembers.map((member, i) =>
              i === index
                ? { ...member, [field]: value }
                : member
            ),
          },
        })),

      setTeamNameCheckResult: (result) =>
        set({ teamNameCheckResult: result }),

      clearTeamNameCheckResult: () =>
        set({ teamNameCheckResult: null }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      resetForm: () => set({ form: initialForm, error: null, teamNameCheckResult: null }),

      validateForm: () => {
        const { form } = get();
        const errors: string[] = [];

        // 팀 정보 검증
        if (!form.teamInfo.name.trim()) errors.push('팀명을 입력해주세요');
        if (!form.teamInfo.composition.trim()) errors.push('팀 구성을 선택해주세요');
        if (!form.teamInfo.description.trim()) errors.push('팀 소개를 입력해주세요');

        // 팀원 정보 검증
        form.teamMembers.forEach((member, index) => {
          if (!member.name.trim()) errors.push(`${index + 1}번째 팀원의 이름을 입력해주세요`);
          if (!member.email.trim()) errors.push(`${index + 1}번째 팀원의 이메일을 입력해주세요`);
          if (!member.department.trim()) errors.push(`${index + 1}번째 팀원의 소속 부서를 입력해주세요`);
          
          // 이메일 형식 검증
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (member.email.trim() && !emailRegex.test(member.email)) {
            errors.push(`${index + 1}번째 팀원의 이메일 형식이 올바르지 않습니다`);
          }
        });

        // 아이디어 정보 검증
        if (!form.ideaInfo.title.trim()) errors.push('아이디어 제목을 입력해주세요');
        if (!form.ideaInfo.problem.trim()) errors.push('해결하고자 하는 문제를 입력해주세요');
        if (!form.ideaInfo.solution.trim()) errors.push('솔루션 접근 방법을 입력해주세요');

        return {
          isValid: errors.length === 0,
          errors,
        };
      },
    }),
    {
      name: 'application-store',
    }
  )
);
