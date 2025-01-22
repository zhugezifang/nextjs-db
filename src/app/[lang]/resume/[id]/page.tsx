import { getPost } from "@/lib/getPost"
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import type { Metadata } from 'next'
import { ScrollToTop } from "@/components/scroll-to-top"
import { ResumeCard } from "@/components/ResumeCard";

export const runtime = 'edge'

export default async function Resume({ params }: { params: { id: string, lang: Locale } }) {
  // 空数组表示只在组件挂载时执行一次
  return (
    <main className="container">
      <ResumeCard params={params} />
      <ScrollToTop />
    </main>
  )
}
