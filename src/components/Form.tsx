"use client";
import type { Locale } from '@/i18n/config';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// 优化后的加载动画
const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-6 w-6 border-4 border-t-transparent border-blue-600"></div>
);

export function Form({ params }: { params: { lang: Locale } }) {
  const router = useRouter();
  const lang = params.lang as string;
  const [name, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestions = ['马云', '张一鸣', '杨澜', '王冰冰', '马化腾', '李彦宏', '王健林'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, lang }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '生成失败');
      }

      const data = await response.json();
      router.push(`/resume/${data.id}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : '请求失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white my-20 px-8 py-12 rounded-2xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {lang === 'en' ? 'AI Resume' : 'AI简历'}
      </h1>

      <div className="mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={lang === 'en' ? 'Enter a name...' : '输入一个人名'}
          className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                    placeholder-gray-400 text-lg transition-all
                    disabled:bg-gray-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        />
      </div>

      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {lang === 'en' ? 'Suggestions' : '推荐人名'}
        </h3>
        <div className="flex flex-wrap gap-3">
          {suggestions.map((word) => (
            <button
              key={word}
              onClick={() => setInputValue(word)}
              className="px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl
                        hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600
                        active:scale-95 transition-all
                        disabled:opacity-50 disabled:pointer-events-none
                        text-gray-600 font-medium"
              disabled={isLoading}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || !name}
        className="w-full bg-gradient-to-br from-blue-600 to-blue-500 
                 text-white py-5 rounded-xl hover:shadow-lg 
                 disabled:opacity-70 disabled:cursor-not-allowed
                 transition-all duration-200
                 flex items-center justify-center gap-3 text-lg font-semibold"
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span>{lang === 'en' ? 'Generating...' : '生成中...'}</span>
          </>
        ) : (
          lang === 'en' ? 'Generate Resume' : '生成简历'
        )}
      </button>
    </div>
  );
}