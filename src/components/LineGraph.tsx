"use client";
import type { Locale } from '@/i18n/config';
import { useRouter } from 'next/navigation'

import React, { useState } from'react'
export function LineGraph({ params }: { params: { lang: Locale } }) {
  const router = useRouter();
  const lang= params.lang;
  const [name, setName] = useState('');
  const [result, setMessage] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, lang }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        setError(data.error);
        setMessage('');
      } else {
        setMessage(data);
        // 客户端控制跳转
        router.push('/resume/'+data.id);
        
        setError('');
      }
    } catch (err) {
      setError('Something went wrong');
      setMessage('');
    }
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="mrbeast" className="w-full bg-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none"/>
            </div>
            
            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-lg mb-6">
                CALCULATE EARNINGS
            </button>
    </form>  
    </>
  )
}

