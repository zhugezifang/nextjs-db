export const runtime = 'edge';

import {insertResume,findResumeByName} from "@/servers/resume";
import {chat} from "@/lib/deepSeek";
import {parseProfileData} from "@/lib/utils";
import { revalidatePath } from 'next/cache'


import { permanentRedirect } from "next/navigation";

export async function POST(request: Request) {
  const body = await request.json();
  const name = body.name;
  const lang = body.lang;
  
  console.log(name);
  const resume = await findResumeByName(name);
  //console.log(resume);
  if(resume){
    console.log("resume exist");
    revalidatePath('/resume') // Update cached posts
    permanentRedirect(`/resume/${resume.id}`) // Navigate to the new post page

  }else{
  console.log("resume not exist");
  const user = await chat(name);
  const result= await insertResume(name as string,user as string);
  //const data = parseProfileData(user as string);
  revalidatePath('/resume') // Update cached posts
  permanentRedirect(`/resume/${result.id}`) // Navigate to the new post page
    
  }


  /*return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
  */
}
