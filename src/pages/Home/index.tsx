import { Tabs } from 'antd-mobile'
import './style.css'
import { useTabs } from '@/hooks/useTabs'

const Home = () => {
  const { channels } = useTabs()
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
