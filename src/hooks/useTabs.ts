import { useEffect, useState } from 'react'
import { fetchChannelAPI } from '@/apis/list'
import type { ChannelItem } from '@/apis/list'

const useTabs = () => {
  const [channels, setChannels] = useState<ChannelItem[]>([])
  useEffect(() => {
    const getChannels = async () => {
      try {
        const res = await fetchChannelAPI()
        if (res.data.message === 'OK') {
          setChannels(res.data.data.channels)
        }
      } catch (error) {
        throw new Error('获取频道列表失败')
      }
    }
    getChannels()
  }, [])
  return {
    channels,
  }
}

export { useTabs }
