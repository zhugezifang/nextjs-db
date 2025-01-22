// deepseek-ai/DeepSeek-V2.5
import OpenAI from "openai";


const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: 'sk-a7478dd7c01c42b39ba7d0ca208b8baa'
});

export const systemPrompt = `
The user will provide some exam text. Please parse the "question" and "answer" and output them in JSON format. 

EXAMPLE INPUT: 
张一鸣的简历

EXAMPLE JSON OUTPUT:
{
    "basic_info": {
        "name": "张一鸣",
        "address": "福建省龙岩市永定区",
        "birth_year": "1983-01-01"
    },
    "profession":"企业家",
    "self_introduction": "字节跳动创始人兼前CEO，中国知名企业家。凭借敏锐的市场洞察力和技术创新能力，成功打造了今日头条、抖音等全球性互联网产品，推动了信息分发和短视频行业的变革。",
    "work_experience": [
        {
            "company": "酷讯网",
            "position": "技术经理",
            "duration": "2005 - 2008",
            "responsibilities": [
                "负责搜索研发工作",
                "管理技术团队，推动技术与产品的融合"
            ]
        },
        {
            "company": "微软",
            "position": "工程师",
            "duration": "2008 - 2009",
            "responsibilities": [
                "参与技术开发工作",
                "学习大公司管理经验"
            ]
        },
        {
            "company": "饭否",
            "position": "技术合伙人",
            "duration": "2009",
            "responsibilities": [
                "负责搜索、消息分发、热词挖掘等方向"
            ]
        },
        {
            "company": "九九房",
            "position": "创始人兼CEO",
            "duration": "2009 - 2012",
            "responsibilities": [
                "创办垂直房产搜索引擎",
                "推出多款房产移动应用"
            ]
        },
        {
            "company": "字节跳动",
            "position": "创始人兼CEO",
            "duration": "2012 - 2021",
            "responsibilities": [
                "创立字节跳动，推出今日头条、抖音等产品",
                "推动公司全球化发展"
            ]
        }
    ],
    "education": [
        {
            "school": "南开大学",
            "degree": "学士",
            "major": "软件工程",
            "duration": "2001 - 2005"
        }
    ],
    "skills": [
        "技术创新",
        "市场洞察",
        "团队管理",
        "战略规划",
        "产品设计",
        "全球化视野",
        "数据分析",
        "创业精神"
    ],
    "projects": [
        {
            "name": "今日头条",
            "role": "创始人",
            "description": "推出基于算法推荐的个性化新闻资讯平台，迅速获得海量用户"
        },
        {
            "name": "抖音",
            "role": "创始人",
            "description": "创建短视频平台抖音，推动短视频行业的快速发展"
        },
        {
            "name": "TikTok",
            "role": "创始人",
            "description": "推出抖音国际版TikTok，成功拓展全球市场"
        }
    ]
 }
`;

export async function chat(name:string) {

    const messages = [
        { role: 'system' as const, content: systemPrompt },
        { role: 'user' as const, content: name+"的简历" }
      ];
  
      const response = await openai.chat.completions.create({
        model: 'deepseek-chat',
        messages,
        response_format: {
          type: 'json_object'
        }
      });

    return response.choices[0].message.content;
}