export const runtime = 'edge';
import {findResumeById} from "@/servers/resume";

//api服务  api/getUser?name=xiaoqiu2017wy@gmai.com

export async function GET(request: Request) {
  // 获取 URL 中的查询参数
  const url = new URL(request.url);
  const id = url.searchParams.get('id'); // 从 URL 查询参数获取 'name'

  console.log(`id: ${id}`);

// 假设 getUserById 是一个异步函数，返回一个 Promise

  if (!id) {
    return new Response(JSON.stringify({ error: 'id is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await findResumeById(id);

  //console.log(user);

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
