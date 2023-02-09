import { reqGetHospitalShow } from '@/api/hospital/hospitalList'
import { Ihospital, IbookingRule } from '@/api/hospital/hospitalList/model/hostipalListType'
import { Button, Card, Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

export default function HospitalShow() {

  const { id } = useParams()
  const [hospital, setHospital] = useState<Ihospital>()
  const [bookingRule, setBookingRule] = useState<IbookingRule>()
  const navigator = useNavigate()

  useEffect(() => {
    getHospitalShow(id as string)
  }, [])


  async function getHospitalShow(id: string) {
    const res = await reqGetHospitalShow(id)
    setHospital(res.hospital)
    setBookingRule(res.bookingRule)
  }

  return (
    <Card>
      <Descriptions title="基本信息" bordered column={2}>
        <Descriptions.Item label="医院名称">{hospital?.hosname}</Descriptions.Item>
        <Descriptions.Item label="医院logo">
          <img src={'data:image/png;base64,' + hospital?.logoData} width={100}></img>
        </Descriptions.Item>
        <Descriptions.Item label="医院编码">{hospital?.hoscode}</Descriptions.Item>
        <Descriptions.Item label="医院住址">{hospital?.address}</Descriptions.Item>
        <Descriptions.Item label="坐车路线" span={2}>{hospital?.route}</Descriptions.Item>
        <Descriptions.Item label="医院简介" span={2}>{hospital?.intro}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="预约规则信息" bordered column={2} style={{ marginTop: 20 }}>
        <Descriptions.Item label="预约周期">{bookingRule?.cycle}天</Descriptions.Item>
        <Descriptions.Item label="放号时间">{bookingRule?.releaseTime}</Descriptions.Item>
        <Descriptions.Item label="停挂时间">{bookingRule?.stopTime}</Descriptions.Item>
        <Descriptions.Item label="退号时间">{bookingRule?.quitTime}</Descriptions.Item>
        <Descriptions.Item label="预约规则">{bookingRule?.rule.map((item, index) => {
          return (
            <div key={index}>
              {index + 1}.{item}
            </div>
          )
        })}
        </Descriptions.Item>
      </Descriptions>

      <Button style={{ marginTop: 20 }} onClick={() => {
        navigator(-1)
      }}>返回</Button>
    </Card>
  )
}
