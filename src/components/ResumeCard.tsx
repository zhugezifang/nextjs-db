"use client";
import type { Locale } from '@/i18n/config';
import React, { useState,useEffect } from'react'
import { Resume } from "@/types/resume";


export function ResumeCard({params
  }: {params: { id: string, lang: Locale } 
  }) {
    const [userData, setUserData] = useState<Resume | null>(null);
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
    <div  className="max-w-4xl mx-auto py-20">
      {userData && <>
        <div id="resume" className="bg-white shadow-lg rounded-lg overflow-hidden">

            <div className="relative bg-teal-600 p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-4xl font-bold text-white mb-2">AI简历</span>
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
                        <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
                        <p className="text-gray-600">福建省厦门市湖里区高新园8号楼 1201</p>
                        <div className="flex gap-4 text-gray-600 justify-center"> 
                            <span>出生时间：19</span>
                        </div>
                    </div>
                </div>
            </div>




            <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-teal-600 mb-4">自我介绍</h3>
                <p className="text-gray-700 leading-relaxed">
                    高级 Web 开发工程师，在杭建有影响力且用户友好的网站和应用程序方面拥有 5 年经验。专注于前端技术，对现代网络标准和尖端开发技术充满热情。拥有领导成功项目从概念到部署的良好记录。
                </p>
            </div>

            <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-teal-600 mb-4">工作经验</h3>
                
                <div className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">创意解决方案公司</h4>
                        </div>
                        <div>
                            <p className="text-gray-600">高级web开发工程师</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-600">2014.05 - 2018.08</p>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-gray-500">1.项目负责人</p>
                        <p className="text-gray-500">2.主导开发全栈电子商务平台，将销售转化率提高 25%。</p>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">技术进步者</h4>
                        </div>
                        <div>
                            <p className="text-gray-600">高级web开发工程师</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-600">2018.05 - 至今</p>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-gray-500">1.项目负责人</p>
                        <p className="text-gray-500">2.主导开发全栈电子商务平台，将销售转化率提高 25%。</p>
                    </div>
                </div>
            </div>

            <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-teal-600 mb-4">教育经历</h3>
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800">University of California</h4>
                    </div>
                    <div>
                        <p className="text-gray-600">Bachelor's in Computer Science</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Master</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-600">August 2012 to May 2016</p>
                    </div>
                </div>
            </div>

            <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-teal-600 mb-4">个人特点</h3>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-2 bg-teal-100 text-teal-800 rounded-full text-sm">团队协作</span>
                    <span className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">问题解决</span>
                    <span className="px-3 py-2 bg-purple-100 text-purple-800 rounded-full text-sm">创新思维</span>
                    <span className="px-3 py-2 bg-green-100 text-green-800 rounded-full text-sm">项目管理</span>
                    <span className="px-3 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm">快速学习</span>
                    <span className="px-3 py-2 bg-red-100 text-red-800 rounded-full text-sm">沟通能力</span>
                    <span className="px-3 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm">领导力</span>
                    <span className="px-3 py-2 bg-pink-100 text-pink-800 rounded-full text-sm">抗压能力</span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-teal-600 mb-4">项目经验</h3>
                
                <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">电子商务平台</h4>
                    <p className="text-gray-600 mb-2">项目负责人</p>
                    <p className="text-gray-700">主导开发全栈电子商务平台，将销售转化率提高 25%。</p>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">交互式仪表板</h4>
                    <p className="text-gray-600 mb-2">前端开发人员</p>
                    <p className="text-gray-700">为 SaaS 应用程序创建了交互式分析仪表板，增强了客户的数据可视化。</p>
                </div>
            </div>
        </div>  

        <div className="mt-8">
<div className="flex justify-center gap-4">
{/* 分享按钮 */}
<button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-lg 
            hover:shadow-lg hover:from-teal-600 hover:to-teal-700 
            active:scale-95 transition-all duration-200">
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
</svg>
<span>分享简历</span>
</button>

{/* 导出JPG按钮 */}
<button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg 
            hover:shadow-lg hover:from-blue-600 hover:to-blue-700 
            active:scale-95 transition-all duration-200">
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>
<span>导出JPG</span>
</button>

{/* 导出PDF按钮 */}
<button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg 
            hover:shadow-lg hover:from-red-600 hover:to-red-700 
            active:scale-95 transition-all duration-200">
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
</svg>
<span>导出PDF</span>
</button>
</div>
        </div>
      </>}
      
    </div>
    </>
  )
}