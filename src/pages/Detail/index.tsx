import { useEffect, useState } from 'react'
import type { DetailRes } from '@/apis/detail'
import { fetchDetailAPI } from '@/apis/detail'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
const Detail = () => {
  const [detail, setDetail] = useState<DetailRes | null>(null)
  const [params] = useSearchParams()
  const id = params.get('id')
  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await fetchDetailAPI(id!)
        setDetail(res.data.data)
      } catch (error) {
        throw new Error('获取文章详情失败')
      }
    }
    getDetail()
  }, [id])

  // 路由返回
  const navigate = useNavigate()
  const back = () => {
    navigate(-1)
  }

  if (!detail) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <NavBar onBack={back}>{detail?.title}</NavBar>
      <div>
        作者头像：
        <img
          src={detail.aut_photo}
          alt="无头像作者"
          style={{ width: '100px', height: '100px' }}
        ></img>
      </div>
      <div>文章id：{detail.art_id}</div>
      <div>作者id：{detail.aut_id}</div>
      <div>作者姓名：{detail.aut_name}</div>
      <div>文章态度：{detail.attitude}</div>
      <div>评论数量：{detail.comm_count}</div>
      <div>阅读数量：{detail.read_count}</div>
      <div>点赞数量：{detail.like_count}</div>
      <div>发布时间：{detail.pubdate}</div>
      <div>
        文章内容：{' '}
        <div
          dangerouslySetInnerHTML={{
            __html: detail?.content,
          }}
        ></div>
      </div>
    </div>
  )
}

export default Detail
