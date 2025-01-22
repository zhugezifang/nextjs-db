"use client";

import React, { useState } from'react'
export function BarGraph({
  }: {
  }) {

  const [name, setName] = useState('');
  const [result, setMessage] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/greet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        setError(data.error);
        setMessage('');
      } else {
        setMessage(data);
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
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
            </div>
            
            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-lg mb-6">
                CALCULATE EARNINGS
            </button>
    </form>  

    {result && <>
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-4">
                  <div>
                      <h2 className="text-xl font-bold">{result}</h2>
                  </div>
              </div>
    </div>
        
          
    </>}
    </>
  )
}
