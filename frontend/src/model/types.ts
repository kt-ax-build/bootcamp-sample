// Common response type
export interface CommonResponse<T = any> {
  successOrNot: boolean;
  statusCode: number;
  data: T;
  message?: string;
}

// Hackathon application types
export interface TeamMember {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  department?: string;
  position?: string;
  isLeader?: boolean;
}

export interface Team {
  id?: number;
  teamName: string;
  members?: TeamMember[];
}

export interface HackathonApplication {
  id?: number;
  team: Team;
  ideaTitle?: string;
  ideaDescription?: string;
  problemStatement?: string;
  solutionApproach?: string;
  techStack?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  firstCreateDatetime?: string;
  lastUpdateDatetime?: string;
}

// API request/response types
export interface CreateApplicationRequest {
  teamName: string;
  memberName: string;
  email: string;
  phone?: string;
  role?: string;
  department?: string;
  position?: string;
  isLeader?: boolean;
  ideaTitle?: string;
  ideaDescription?: string;
  problemStatement?: string;
  solutionApproach?: string;
  techStack?: string;
  additionalMembers?: TeamMember[];
}

export interface CreateApplicationResponse extends CommonResponse<HackathonApplication> {}

export interface GetApplicationRequest {
  teamName?: string;
  memberName?: string;
}

export interface GetApplicationResponse extends CommonResponse<HackathonApplication[]> {}

export interface UpdateApplicationRequest extends CreateApplicationRequest {}

export interface UpdateApplicationResponse extends CommonResponse<HackathonApplication> {}

export interface DeleteApplicationResponse extends CommonResponse<void> {}

// Navigation types
export type NavigationItem = 'intro' | 'participation' | 'registration' | 'confirmation';

// Form types
export interface TeamFormData {
  teamName: string;
  members: TeamMember[];
}

export interface IdeaFormData {
  ideaTitle: string;
  ideaDescription: string;
}

export interface ApplicationFormData extends TeamFormData, IdeaFormData {} 