export const runtime = 'edge';
import {findUserByEmail} from "@/servers/user";

//api服务  api/getUser?name=xiaoqiu2017wy@gmai.com

export async function GET(request: Request) {
  // 获取 URL 中的查询参数
  const url = new URL(request.url);
  const email = url.searchParams.get('email'); // 从 URL 查询参数获取 'name'

  console.log(email);

// 假设 getUserById 是一个异步函数，返回一个 Promise

  if (!email) {
    return new Response(JSON.stringify({ error: 'email is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await findUserByEmail(email);

  console.log(user);

  const externalApiUrl = 'https://tiktokmoneycalc.com/wp-admin/admin-ajax.php';

  const response = await fetch(externalApiUrl + `?action=tiktok-calculate&username=${encodeURIComponent(email)}`, {
    method: 'GET',
    headers: {
      "accept": "*/*",
      "accept-language": "zh-CN,zh;q=0.9",
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    return new Response(JSON.stringify({ error: 'Failed to forward data', details: errorData }), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const responseData = await response.json();
  console.log(responseData);

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
