import { Image, List, InfiniteScroll } from 'antd-mobile'
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
  // 请求文章列表
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
  // 是否有更多数据可以加载
  const [hasMore, setHasMore] = useState(true)
  // 加载更多数据的方法
  const loadMore = async () => {
    try {
      const res = await fetchListAPI({
        channel_id: channelId,
        timestamp: listRes.pre_timestamp,
      })
      const { results, pre_timestamp } = res.data.data
      // 拼接新数据，存储下一次请求的时间戳
      setListRes({
        results: [...listRes.results, ...results],
        pre_timestamp,
      })
      // 没有更多数据时
      if (results.length === 0) {
        setHasMore(false)
      }
    } catch (error) {
      throw new Error('请求更多文章列表失败')
    }
  }
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
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10} />
    </>
  )
}

export default HomeList
