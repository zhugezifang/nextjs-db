import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Profile, WorkExperience, Education, Project } from '@/types/profile'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseProfileData(jsonString: string): Profile {
  try {
    const data = JSON.parse(jsonString);
    return {
      basicInfo: {
        name: data.basic_info.name,
        address: data.basic_info.address,
        birthYear: data.basic_info.birth_year
      },
      profession: data.profession,
      selfIntroduction: data.self_introduction,
      workExperience: data.work_experience.map((work: any): WorkExperience => ({
        company: work.company,
        position: work.position,
        duration: work.duration,
        responsibilities: work.responsibilities
      })),
      education: data.education.map((edu: any): Education => ({
        school: edu.school,
        degree: edu.degree,
        major: edu.major,
        duration: edu.duration
      })),
      skills: data.skills,
      projects: data.projects.map((project: any): Project => ({
        name: project.name,
        role: project.role,
        description: project.description
      }))
    };
  } catch (error:any) {
    throw new Error('解析个人信息数据失败：' + error.message);
  }
}