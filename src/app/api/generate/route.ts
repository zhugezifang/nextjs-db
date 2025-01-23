export const runtime = 'edge';

import {insertResume,findResumeByName, updateResume} from "@/servers/resume";
import {chat} from "@/lib/deepSeek";
import { parseProfileData } from '@/lib/utils';

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
      //const profile = parseProfileData(resume.desc as string);
      //await updateResume(resume.id as number,name as string,resume.desc as string,profile.selfIntroduction,profile.profession.split("、")[0]);

      return new Response(JSON.stringify(resume), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
  }else{
      console.log("resume not exist");
      const user = await chat(name);
      // Bug 修复：将 const 改为 let
      const profile = parseProfileData(user as string);

      const newResume = await insertResume(name as string,user as string,profile.selfIntroduction,profile.profession.split("、")[0]);
      return new Response(JSON.stringify(newResume), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
  }



  
  
}
