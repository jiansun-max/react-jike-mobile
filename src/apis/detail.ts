import { http } from '@/utils'
import { ResType } from './shared'

export type DetailRes = {
  art_id: string
  title: string
  pubdate: string
  content: string
  aut_id: string
  aut_name: string
  aut_photo: string
  is_followed: boolean
  is_collected: boolean
  attitude: number
  comm_count: number
  read_count: number
  like_count: number
}

// 获取文章详情
export function fetchDetailAPI(article_id: string) {
  return http.request<ResType<DetailRes>>({
    url: `/articles/${article_id}`,
  })
}
