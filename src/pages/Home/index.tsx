import { useEffect, useState } from 'react'
import { Tabs } from 'antd-mobile'
import './style.css'
import { fetchChannelAPI } from '@/apis/list'
import type { ChannelItem } from '@/apis/list'

const Home = () => {
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
  return (
    <div>
      <div className="tabContainer">
        <Tabs>
          {channels.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              {item.name}
            </Tabs.Tab>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default Home
