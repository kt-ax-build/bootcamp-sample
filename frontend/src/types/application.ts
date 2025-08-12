export interface TeamMember {
  id?: string;
  name: string;
  email: string;
  department: string;
  position?: string;
  isLeader: boolean;
}

export interface TeamInfo {
  id?: string;
  name: string;
  composition: string;
  description: string;
}

export interface IdeaInfo {
  id?: string;
  title: string;
  problem: string;
  solution: string;
  techStack?: string;
}

export interface ApplicationForm {
  teamInfo: TeamInfo;
  teamMembers: TeamMember[];
  ideaInfo: IdeaInfo;
}

export interface ApplicationResponse {
  id: string;
  teamInfo: TeamInfo;
  teamMembers: TeamMember[];
  ideaInfo: IdeaInfo;
  createdAt: string;
  updatedAt: string;
}

export interface TeamNameCheckResponse {
  isAvailable: boolean;
  message: string;
}

export interface ApplicationCreateRequest {
  teamInfo: TeamInfo;
  teamMembers: TeamMember[];
  ideaInfo: IdeaInfo;
}

export interface ApplicationUpdateRequest {
  teamInfo: TeamInfo;
  teamMembers: TeamMember[];
  ideaInfo: IdeaInfo;
}

export interface CommonResponse<T> {
  successOrNot: boolean;
  statusCode: string;
  data: T;
}
