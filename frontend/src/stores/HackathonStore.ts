import { create } from 'zustand';
import type { HackathonApplication, TeamMember, Team } from '../model/types';
import { HackathonService } from '../services/HackathonService';

interface HackathonState {
  applications: HackathonApplication[];
  currentApplication: HackathonApplication | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setApplications: (applications: HackathonApplication[]) => void;
  setCurrentApplication: (application: HackathonApplication | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // API Actions
  createApplication: (data: any) => Promise<void>;
  getApplications: (params?: any) => Promise<void>;
  getApplication: (id: number) => Promise<void>;
  updateApplication: (id: number, data: any) => Promise<void>;
  deleteApplication: (id: number) => Promise<void>;
  
  // Team management
  addTeamMember: (member: TeamMember) => void;
  removeTeamMember: (index: number) => void;
  updateTeamMember: (index: number, member: TeamMember) => void;
  
  // Form management
  updateTeamInfo: (teamInfo: Partial<Team>) => void;
  updateIdeaInfo: (ideaInfo: Partial<{ ideaTitle?: string; ideaDescription?: string }>) => void;
  
  // Reset
  reset: () => void;
}

const initialState = {
  applications: [],
  currentApplication: null,
  isLoading: false,
  error: null,
};

export const useHackathonStore = create<HackathonState>((set, get) => ({
  ...initialState,
  
  setApplications: (applications) => set({ applications }),
  setCurrentApplication: (application) => set({ currentApplication: application }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  createApplication: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const application = await HackathonService.createApplication(data);
      set({ currentApplication: application, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false });
    }
  },
  
  getApplications: async (params) => {
    try {
      set({ isLoading: true, error: null });
      const applications = await HackathonService.getApplications(params);
      set({ applications, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false });
    }
  },
  
  getApplication: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const application = await HackathonService.getApplication(id);
      set({ currentApplication: application, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false });
    }
  },
  
  updateApplication: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      const application = await HackathonService.updateApplication(id, data);
      set({ currentApplication: application, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false });
    }
  },
  
  deleteApplication: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await HackathonService.deleteApplication(id);
      set({ currentApplication: null, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false });
    }
  },
  
  addTeamMember: (member) => {
    const { currentApplication } = get();
    if (currentApplication && currentApplication.team) {
      const updatedMembers = [...(currentApplication.team.members || []), member];
      set({
        currentApplication: {
          ...currentApplication,
          team: {
            ...currentApplication.team,
            members: updatedMembers,
          },
        },
      });
    }
  },
  
  removeTeamMember: (index) => {
    const { currentApplication } = get();
    if (currentApplication && currentApplication.team) {
      const updatedMembers = (currentApplication.team.members || []).filter((_, i) => i !== index);
      set({
        currentApplication: {
          ...currentApplication,
          team: {
            ...currentApplication.team,
            members: updatedMembers,
          },
        },
      });
    }
  },
  
  updateTeamMember: (index, member) => {
    const { currentApplication } = get();
    if (currentApplication && currentApplication.team) {
      const updatedMembers = [...(currentApplication.team.members || [])];
      updatedMembers[index] = member;
      set({
        currentApplication: {
          ...currentApplication,
          team: {
            ...currentApplication.team,
            members: updatedMembers,
          },
        },
      });
    }
  },
  
  updateTeamInfo: (teamInfo) => {
    const { currentApplication } = get();
    if (currentApplication) {
      set({
        currentApplication: {
          ...currentApplication,
          team: {
            ...currentApplication.team,
            ...teamInfo,
          },
        },
      });
    }
  },
  
  updateIdeaInfo: (ideaInfo) => {
    const { currentApplication } = get();
    if (currentApplication) {
      set({
        currentApplication: {
          ...currentApplication,
          ...ideaInfo,
        },
      });
    }
  },
  
  reset: () => set(initialState),
})); 