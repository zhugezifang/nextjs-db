"use client";
import type { Locale } from '@/i18n/config';
import React, { useState,useEffect } from'react'
import { Resume } from "@/types/resume";
import { Profile,WorkExperience,Education,Project } from "@/types/profile";
import { parseProfileData } from '@/lib/utils';
import { Share } from "@/components/Share";

export function ResumeCard({params
  }: {params: { id: string, lang: Locale } 
  }) {
    const lang = params.lang as string;
    const [userData, setUserData] = useState<Resume | null>(null);
    const [userPofile, setUserProfile] = useState<Profile | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // 在组件加载时立即执行请求
      const fetchData = async () => {
        try {
          console.log("fetching")
          const response = await fetch(`/api/getResume?id=${params.id}`);
          if (!response.ok) {
            throw new Error('请求失败');
          }
          console.log("end")
          const data = await response.json();
          const profile = parseProfileData(data.desc);
          console.log("data:"+data);
          setUserData(data);
          setUserProfile(profile);
        } catch (error) {
          console.error('获取数据失败:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
  }, []); 
  
  return (
    <>
    <div  className="max-w-4xl mx-auto pt-10">
      {userData && <>

        <div
              className="mx-auto flex max-w-4xl flex-col items-center text-center py-4">
              <h1 className="mb-4 text-4xl font-bold md:text-4xl">{userPofile?.basicInfo.name} Resume</h1>
              <div className="mb-5 lg:mb-8">
                <p className="text-[#7c8aaa] text-xl">{userPofile?.selfIntroduction}</p>
              </div>

        </div>
        
        <div id="resume" className="bg-white shadow-lg rounded-lg overflow-hidden">

            <div className="relative bg-teal-600 p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-4xl font-bold text-white mb-2">{lang === 'en' ? 'AI Resume' : 'AI简历'}</span>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 border-b">
                <div className="flex justify-center"> 
                    <div className="space-y-2 text-center"> 
                        <h1 className="text-2xl font-bold text-gray-800">{userPofile?.basicInfo.name}</h1>
                        <p className="text-gray-600">{userPofile?.basicInfo.address}</p>
                        <div className="flex gap-4 text-gray-600 justify-center"> 
                            <span>{lang === 'en' ? 'birth year:' : '出生时间:'}{userPofile?.basicInfo.birthYear}</span>
                        </div>
                    </div>
                </div>
            </div>



            <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-teal-600 mb-4">{lang === 'en' ? 'Introduction' : '自我介绍'}</h3>
                <p className="text-gray-700 leading-relaxed">
                {userPofile?.selfIntroduction}
                </p>
            </div>

            <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-teal-600 mb-4">{lang === 'en' ? 'WorkExperience' : '工作经验'}</h3>
                
                {userPofile?.workExperience.map((work:WorkExperience) => (
                    <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">{work.company}</h4>
                            </div>
                            <div>
                                <p className="text-gray-600">{work.position}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-600">{work.duration}</p>
                            </div>
                        </div>
                        <div className="">
                            {work.responsibilities.map((str:String) => (
                                <p className="text-gray-500">{str}</p>
                            ))}                            
                        </div>
                    </div>
                ))}

            </div>

            <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-teal-600 mb-4">{lang === 'en' ? 'Education' : '教育经历'}</h3>

                {userPofile?.education.map((education:Education) => (
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800">{education.school}</h4>
                    </div>
                    <div>
                        <p className="text-gray-600">{education.degree}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">{education.major}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-600">{education.duration}</p>
                    </div>
                </div>
                ))}

            </div>

            <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-teal-600 mb-4">{lang === 'en' ? 'skills' : '技能'}</h3>
                <div className="flex flex-wrap gap-2">
                    {userPofile?.skills.map((str:String) => (
                        <span className="px-3 py-2 bg-teal-100 text-teal-800 rounded-full text-sm">{str}</span>
                    ))}
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-teal-600 mb-4">{lang === 'en' ? 'Project' : '项目经验'}</h3>
                
                {userPofile?.projects.map((project:Project) => (
                    <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{project.name}</h4>
                        <p className="text-gray-600 mb-2">{project.role}</p>
                        <p className="text-gray-700">{project.description}</p>
                    </div>
                ))}

            </div>
        </div>
        <Share/>
      </>}
    </div>
    </>
  )
}