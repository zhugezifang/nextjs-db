export const runtime = 'edge';

import {insertResume,findResumeByName} from "@/servers/resume";
import {chat} from "@/lib/deepSeek";
import { Resume } from "@/types/resume";

export async function POST(request: Request) {
  const body = await request.json();
  const name = body.name;
  const lang = body.lang;
  
  console.log(name);
// Bug 修复：将 Resume | null 改为 Resume | undefined
  const resume = await findResumeByName(name);
    //console.log(resume);
  if(resume){
      console.log("resume exist");
      return new Response(JSON.stringify(resume), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
  }else{
      console.log("resume not exist");
      const user = await chat(name);
      // Bug 修复：将 const 改为 let
      const newResume = await insertResume(name as string,user as string);
      return new Response(JSON.stringify(newResume), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
  }



  
  
}
