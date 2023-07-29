import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Avatar, Button, Card, ConfigProvider, Tabs, Image, theme, Row, Col } from 'antd';
import 'antd/dist/reset.css';
import './App.css';
import logo from './logowhite.png'
import axios from 'axios';
import Meta from 'antd/es/card/Meta';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import dayjs from 'dayjs';
var localizedFormat = require('dayjs/plugin/localizedFormat')
require('dayjs/locale/es')

dayjs.locale('es')
dayjs.extend(localizedFormat)

const TabPane = Tabs.TabPane


interface CalendarItem {
  series: {
    title: string
    images: { url: string }[]
  }
  airDateUtc: string
  title: string
  episodeNumber: number
  seasonNumber: number
  images: { url: string }[]
}


const App: FC = () => {

  const [post, setPost] = useState<CalendarItem[]>([]);

  useEffect(() => {
    axios.get("http://sonarr.baske.cl/api/v3/calendar?includeEpisodeImages=true&includeSeries=true&apikey=92126ff0badc49aeab7247295d003bfe").then((data) => {
      console.log(data);
      setPost(data?.data);
    });
  }, []);

  console.log(post)

  return <div className="App">
    <img src={logo} alt="" style={{ width: '50%', marginTop: 40, marginBottom: 40 }} />
    <Card>
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Calendar" key="1">

          {post && post.map((p) => {
            console.log(p.images)
            console.log(p.series)

            return <Card bodyStyle={{ padding: 0, display: 'flex' }} style={{ marginBottom: 8 }} >
              <Row>
                <Col span={8}>
                  <Image
                    wrapperStyle={{ height: '100%', }}
                    preview={false}
                    style={{
                      width: '100%',

                      height: '100%',
                      objectFit: 'cover'
                    }}
                    src={p.images && p.images.length > 0 ? p.images[0].url : p.series.images[0].url}
                    fallback='https://signage.uiowa.edu/sites/signage.uiowa.edu/files/slides/1920x1080.jpg'

                  />
                </Col>
                <Col span={16}>
                  <div style={{ textAlign: 'start', padding: 16 }}>
                    <Title level={5}>{p.series.title}</Title>
                    <Paragraph>{`${p.seasonNumber}x${p.episodeNumber} - ${p.title}`}</Paragraph>
                    <Paragraph>{dayjs(p.airDateUtc).format('LLLL')}</Paragraph>
                  </div>
                </Col>
              </Row>





            </Card>
          })}

        </TabPane>
      </Tabs>
    </Card>
  </div>
}

export default () => (
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        colorPrimary: "#0cd3e0"
      },
    }}
  >
    <App />
  </ConfigProvider>
);