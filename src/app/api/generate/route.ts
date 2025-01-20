export const runtime = 'edge';
import OpenAI from "openai";
import {insertResume} from "@/servers/resume";

//api服务  api/getUser?name=xiaoqiu2017wy@gmai.com

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: 'sk-a7478dd7c01c42b39ba7d0ca208b8baa'
});

async function main() {
const completion = await openai.chat.completions.create({
messages: [{ role: "system", content: "输出雷军的简历，输出格式为json" }],
model: "deepseek-chat",
});
//console.log(completion.choices[0].message.content);
return completion.choices[0].message.content;
}

export async function GET(request: Request) {
  // 获取 URL 中的查询参数
  const url = new URL(request.url);
  const name = url.searchParams.get('name'); // 从 URL 查询参数获取 'name'

  console.log(name);

// 假设 getUserById 是一个异步函数，返回一个 Promise

  if (!name) {
    return new Response(JSON.stringify({ error: 'name is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await main();

  insertResume(name as string,user as string);

  console.log(user);

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}



main();
