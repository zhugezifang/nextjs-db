// deepseek-ai/DeepSeek-V2.5
import OpenAI from "openai";


const openai = new OpenAI({
    baseURL: 'https://api.siliconflow.cn/v1',
    apiKey: 'sk-hndrrycbkartgvkuksfclkdoqmdzqjlnbwzphfrdyarjaxau'
});

export async function chat(name:string) {
const completion = await openai.chat.completions.create({
messages: [{ role: "user", content: "输出"+name+"的简历，输出格式为json" }],
model: "deepseek-ai/DeepSeek-V2.5",
});
//console.log(completion.choices[0].message.content);
return completion.choices[0].message.content;
}