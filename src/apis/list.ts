import { http } from '@/utils'
// 定义泛型
type ResType<T> = {
  message: string
  data: T
}
// 定义具体的接口类型
type ChannelItem = {
  id: number
  name: string
}

type ChannelRes = {
  channels: ChannelItem[]
}

// 请求频道列表
export function fetchChannelAPI() {
  return http.request<ResType<ChannelRes>>({
    url: '/channels',
    method: 'GET',
  })
}
