// 首先定义所需的接口类型
export interface WorkExperience {
  company: string;
  position: string;
  duration: string;
  responsibilities: string[];
}

export interface Education {
  school: string;
  degree: string;
  major: string;
  duration: string;
}

export interface Project {
  name: string;
  role: string;
  description: string;
}

export interface Profile {
  basicInfo: {
    name: string;
    address: string;
    birthYear: string;
  };
  profession: string;
  selfIntroduction: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  projects: Project[];
}