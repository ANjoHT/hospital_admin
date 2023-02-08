import React, { useEffect, useState, Key } from 'react'
import { Card, Form, Input, Checkbox, Button, Table, Space, message } from 'antd';
import { SearchOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { IhospitalSetItem, IhospitalSets } from '@/api/hospital/hospitalSet/model/hostipalSetTypes';
import type { ColumnsType } from 'antd/es/table'
import { reqDelHospitalSets, reqGetHospitalSets, reqDelHospitalSet } from '@/api/hospital/hospitalSet';
import { useNavigate } from 'react-router-dom';



export default function HospitalSet() {

  let flag = false

  const [form] = Form.useForm()

  const [hospitalSets, setHospitalSets] = useState<IhospitalSets>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getHospitalSets(page, pageSize)
  }, [])

  async function getHospitalSets(pages: number, pageSize: number) {
    setLoading(true)
    if (flag) {
      const { hosname, hoscode } = form.getFieldsValue()
      const res = await reqGetHospitalSets(pages, pageSize, hoscode, hosname)
      setHospitalSets(res.records)
      setTotal(res.total)
    } else {
      const res = await reqGetHospitalSets(pages, pageSize)
      setHospitalSets(res.records)
      setTotal(res.total)
    }
    setLoading(false)
  }

  function onFinish() {
    flag = true
    setPage(1)
    getHospitalSets(1, pageSize)
  }

  function onClear() {
    form.setFieldsValue({ hosname: undefined, hoscode: undefined })
  }



  const columns: ColumnsType<IhospitalSetItem> = [
    {
      title: '序号',
      render: (text, record, index) => {

        return index + 1;

      },
      align: "center",
      width: 80
    },
    {
      title: '医院名称',
      dataIndex: 'hosname'
    },
    {
      title: '医院编号',
      dataIndex: 'hoscode'
    },
    {
      title: 'api基础路径',
      dataIndex: 'apiUrl'
    },
    {
      title: '签名',
      dataIndex: 'signKey'
    },
    {
      title: '联系人姓名',
      dataIndex: 'contactsName'
    },
    {
      title: '联系人手机号',
      dataIndex: 'contactsPhone'
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button icon={<FormOutlined />} type="primary" onClick={() => {
              navigate("/syt/hospital/hospitalSet/add", {
                state: record.id
              })
            }}></Button>
            <Button icon={<DeleteOutlined />}
              type="primary"
              danger onClick={async () => {
                reqDelHospitalSet(record.id)
                message.success("删除成功")
                getHospitalSets(page, pageSize)
              }}
            ></Button>
          </Space >
        )
      }
    },
  ]

  return (
    <Card>
      <Form
        name="horizontal_login"
        layout="inline"
        form={form}
        onFinish={onFinish}
        onValuesChange={(changedValues, allValues) => {
          flag = false
        }}
      >
        <Form.Item
          name="hosname"
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          name="hoscode"
        >
          <Input
            placeholder="医院编码"
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
            >
              查询
            </Button>
          )}
        </Form.Item>
        <Form.Item >
          <Button onClick={onClear}>
            清空
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Button type="primary" style={{ marginRight: 10 }} onClick={() => {
          navigate('/syt/hospital/hospitalSet/add')
        }}>添加</Button>
        <Button type='primary'
          disabled={!selectedRowKeys.length}
          danger
          onClick={async () => {
            await reqDelHospitalSets(selectedRowKeys)
            message.success('删除成功')
            getHospitalSets(page, pageSize)
          }} >批量删除</Button>
      </div>
      <Table
        rowKey={"id"}
        bordered
        columns={columns}
        scroll={{ x: 1500 }}
        dataSource={hospitalSets}
        loading={loading}
        pagination={{
          total,
          current: page,
          pageSize,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: [2, 5, 10],
          showTotal(total) {
            return `总共${total}条`
          },
          onChange(page, pageSize) {
            setPageSize(pageSize)
            setPage(page)
            getHospitalSets(page, pageSize)
          }
        }}
        rowSelection={{
          onChange(selectedRowKeys) {
            console.log(selectedRowKeys)
            setSelectedRowKeys(selectedRowKeys)
          }
        }}

      />


    </Card>
  )
}
