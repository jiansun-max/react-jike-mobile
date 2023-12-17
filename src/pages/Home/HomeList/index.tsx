import { Image, List } from 'antd-mobile'
// mock数据
import { useEffect, useState } from 'react'
import { fetchListAPI } from '@/apis/list'
import type { ListRes, ListItem } from '@/apis/list'

type Props = {
  channelId: number
}
const HomeList = (props: Props) => {
  const { channelId } = props
  const [listRes, setListRes] = useState<ListRes>({
    results: [],
    pre_timestamp: '' + new Date().getTime(),
  })
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await fetchListAPI({
          channel_id: channelId,
          timestamp: '' + new Date().getTime(),
        })
        const { results, pre_timestamp } = res.data.data
        setListRes({
          results,
          pre_timestamp,
        })
      } catch (error) {
        throw new Error('请求文章列表失败')
      }
    }
    getList()
  }, [channelId])
  return (
    <>
      <List>
        {listRes.results.map((item: ListItem) => (
          <List.Item
            key={item.art_id}
            prefix={
              <Image
                src={item.cover.images?.[0]}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.pubdate}
          >
            {item.title}
          </List.Item>
        ))}
      </List>
    </>
  )
}

export default HomeList
