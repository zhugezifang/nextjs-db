"use client"

import { useEffect, useState } from 'react';

export function Share({
  }: {
  }) {

    const [htmlToImage, setHtmlToImage] = useState<any>(null);
    const [jsPDF, setJsPDF] = useState<any>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // 动态导入客户端库
        Promise.all([
            import('html-to-image')
        ]).then(([htmlToImageModule]) => {
            setHtmlToImage(htmlToImageModule);
        });
    }, []);

    const exportToJPG = async () => {
        if (!htmlToImage) return;
        
        const resume = document.getElementById('resume');
        if (!resume) return;

        try {
            const { width, height } = resume.getBoundingClientRect();
            
            const dataUrl = await htmlToImage.toJpeg(resume, {
                quality: 1.0,
                backgroundColor: '#ffffff',
                pixelRatio: 2
            });

            const link = document.createElement('a');
            link.download = 'resume.jpg';
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('导出JPG失败:', error);
        }
    };

    const shareLink = async () => {
        try {
            // 获取当前页面的 URL
            const currentUrl = window.location.href;
            await navigator.clipboard.writeText(currentUrl);
            
            // 显示复制成功的状态
            setCopied(true);
            
            // 2秒后重置状态
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error('复制链接失败:', error);
        }
    }
  
  return (
    <>
        <div className="max-w-4xl mx-auto py-12">
            <div className="flex justify-center gap-4">
            {/* 分享按钮 */}
            <button onClick={shareLink} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-lg 
                        hover:shadow-lg hover:from-teal-600 hover:to-teal-700 
                        active:scale-95 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>            {copied ? 'copy url success' : 'share'}
            </span>
            </button>

            {/* 导出JPG按钮 */}
            <button onClick={exportToJPG} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg 
                        hover:shadow-lg hover:from-blue-600 hover:to-blue-700 
                        active:scale-95 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Export JPG</span>
            </button>
            </div>
        </div>

    </>
    
  )
}
