"use client";
import { Profile, WorkExperience, Education, Project } from '@/types/profile';
import {parseProfileData} from "@/lib/utils";
import type { Locale } from '@/i18n/config';
import React, { useState,useEffect } from'react'

export function ResumeCard({params
  }: {params: { id: string, lang: Locale } 
  }) {
    const [userData, setUserData] = useState(null);
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
          console.log("data:"+data);
          setUserData(data);
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
    {userData && <>
          <div className="rounded-lg p-4 mb-4">
              <div className="flex items-center mb-4">
                  <div>
                      <h2 className="text-xl font-bold">{userData.name}</h2>
                  </div>
              </div>
    </div>    
    </>}
    </>
  )
}