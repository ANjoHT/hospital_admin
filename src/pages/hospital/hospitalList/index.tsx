import { Card, Form, Select, Input, Button, Table, Space } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import React, { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { reqGetHospitalList } from '@/api/hospital/hospitalList'
import { IhospitalListItem, IhospitalList } from '@/api/hospital/hospitalList/model/hostipalListType'

export default function HospitalList() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(0)
  const [hospitalList, setHsopitalList] = useState<IhospitalList>([])

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getHospitalList(page, pageSize)
  }, [])

  async function getHospitalList(page: number, pageSize: number) {
    setLoading(true)
    const res = await reqGetHospitalList(page, pageSize)
    console.log(res)
    setHsopitalList(res.content)
    setTotal(res.content.length)
    setLoading(false)
  }

  const columns: ColumnsType<IhospitalListItem> = [
    {
      title: "序号",
      render: (text, record, index) => {
        console.log(text)
        return index + 1
      },
      align: "center",
    },
    {
      title: "医院logo",
      dataIndex: 'logoData',
      render(text) {
        return <img src={`data:image/jpeg;base64,` + text} alt="" width={80} />
      }
    },
    {
      title: "医院名称",
      dataIndex: 'hosname'
    },
    {
      title: "等级",
      render(text) {
        return text.param.hostypeString
      }
    },
    {
      title: "详细地址",
      render(text) {
        return text.param.fullAddress
      }
    },
    {
      title: "状态",
      dataIndex: 'status',
      render(status) {
        return status ? "已上线" : "未上线"
      }
    },
    {
      title: "创建时间",
      dataIndex: 'createTime'
    },
    {
      title: "操作",
      render: (_, record) => (
        <Space>
          <Button
            type='primary'>
            查看
          </Button>
          <Button
            type='primary'>
            排班
          </Button>
          <Button
            type='primary'>
            {_.status ? '下线' : '上线'}
          </Button>
        </Space>
      ),
      width: 120
    }
  ]
  return (
    <Card>
      <Form
        layout='inline'
        form={form}
      >
        <FormItem>
          <Select style={{ width: 190 }} placeholder="请选择省">
          </Select>
        </FormItem>
        <FormItem>
          <Select style={{ width: 190 }} placeholder="请选泽市">
          </Select>
        </FormItem>
        <FormItem>
          <Select style={{ width: 190 }} placeholder="请选择区">
          </Select>
        </FormItem>
        <FormItem>
          <Input placeholder='医院名称'></Input>
        </FormItem>
        <FormItem>
          <Input placeholder='医院编码'></Input>
        </FormItem>
        <FormItem>
          <Select placeholder="医院类型" style={{ width: 200 }}></Select>
        </FormItem>
        <FormItem>
          <Select placeholder="医院状态" style={{ width: 200 }}></Select>
        </FormItem>
        <FormItem>
          <Button type='primary' icon={<SearchOutlined />}>查询</Button>
          <Button style={{ marginLeft: 20 }}>清空</Button>
        </FormItem>
      </Form>
      <Table
        bordered
        loading={loading}
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={hospitalList}
        rowKey={"id"}
        pagination={{
          total,
          pageSize,
          current: page,
          showTotal(total) {
            return `总共${total}条`
          },
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15],
          onChange(page, pageSize) {
            setPage(page)
            setPageSize(pageSize)

          }
        }}
      />
    </Card>
  )
}
