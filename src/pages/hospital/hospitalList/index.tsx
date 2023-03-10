import { Card, Form, Select, Input, Button, Table, Space } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import React, { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { reqGetCityOrDistrictList, reqGetHospitalList, reqGetProvinceList, reqUpdateHospitalStatus } from '@/api/hospital/hospitalList'
import { IhospitalListItem, IhospitalList, IprovinceList } from '@/api/hospital/hospitalList/model/hostipalListType'
import { useNavigate } from 'react-router-dom';

export default function HospitalList() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(0)
  const [hospitalList, setHsopitalList] = useState<IhospitalList>([])
  const [provinceList, setProvinceList] = useState<IprovinceList>([])
  const [cityList, setCityList] = useState<IprovinceList>([])
  const [districtList, setDistrictList] = useState<IprovinceList>([])

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const { Option } = Select
  const navigate = useNavigate()

  let flag = false

  useEffect(() => {
    getHospitalList(page, pageSize)
    getProvince()
  }, [])

  async function getHospitalList(page: number, pageSize: number) {
    setLoading(true)
    if (flag) {
      const params = form.getFieldsValue()
      const res = await reqGetHospitalList({ page, pageSize, ...params })
      setHsopitalList(res.content)
      setTotal(res.totalElements)
    } else {
      const res = await reqGetHospitalList({ page, pageSize })
      setHsopitalList(res.content)
      setTotal(res.totalElements)
    }
    setLoading(false)
  }

  async function updateStatus(id: number, status: number) {
    await reqUpdateHospitalStatus(id, status)
    getHospitalList(page, pageSize)
  }
  async function getProvince() {
    const res = await reqGetProvinceList()
    setProvinceList(res)
  }
  async function getCityList(value: string) {
    const res = await reqGetCityOrDistrictList(value)
    setCityList(res)
  }
  async function getDistrictList(value: string) {
    const res = await reqGetCityOrDistrictList(value)
    setDistrictList(res)
  }
  const onFinish = (values: any) => {
    flag = true
    getHospitalList(page, pageSize)
    setPage(1)
  }

  const clear = () => {
    form.resetFields()
    flag = false
    getHospitalList(1, pageSize)
    setPage(1)
  }

  const columns: ColumnsType<IhospitalListItem> = [
    {
      title: "??????",
      render: (text, record, index) => {
        return index + 1
      },
      align: "center",
    },
    {
      title: "??????logo",
      dataIndex: 'logoData',
      render(text) {
        return <img src={`data:image/jpeg;base64,` + text} alt="" width={80} />
      }
    },
    {
      title: "????????????",
      dataIndex: 'hosname'
    },
    {
      title: "??????",
      render(text) {
        return text.param.hostypeString
      }
    },
    {
      title: "????????????",
      render(text) {
        return text.param.fullAddress
      }
    },
    {
      title: "??????",
      dataIndex: 'status',
      render(status) {
        return status ? "?????????" : "?????????"
      }
    },
    {
      title: "????????????",
      dataIndex: 'createTime'
    },
    {
      title: "??????",
      render: (_, record) => (
        <Space>
          <Button
            type='primary'
            onClick={() => {
              navigate(`/syt/hospital/hospitalList/show/${_.id}`)
            }}
          >
            ??????
          </Button>
          <Button
            type='primary'>
            ??????
          </Button>
          <Button
            type='primary'
            onClick={() => {
              updateStatus(record.id, Number(!record.status))
            }}
          >
            {_.status ? '??????' : '??????'}
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
        onFinish={onFinish}
        onValuesChange={() => {
          flag = false
        }}
      >
        <FormItem name="provinceCode">
          <Select
            style={{ width: 150 }}
            placeholder="????????????"
            onChange={(value) => {
              form.setFieldsValue({ cityCode: null, districtCode: null })
              getCityList(value)
            }}
          >
            {provinceList.map((item) => {
              return (
                <Option key={item.id} value={item.value}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
        </FormItem>
        <FormItem name="cityCode">
          <Select style={{ width: 150 }}
            placeholder="????????????"
            onChange={(value) => {
              getDistrictList(value)
              form.setFieldsValue({ districtCode: null })
            }}
          >
            {cityList.map((item) => {
              return (
                <Option key={item.id} value={item.value}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
        </FormItem>
        <FormItem name="districtCode">
          <Select style={{ width: 150 }} placeholder="????????????">
            {districtList.map((item) => {
              return (
                <Option key={item.id} value={item.value}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
        </FormItem>
        <FormItem name="hosname">
          <Input placeholder='????????????'></Input>
        </FormItem>
        <FormItem name="hoscode">
          <Input placeholder='????????????'></Input>
        </FormItem>
        <FormItem name="hostype">
          <Select placeholder="????????????" style={{ width: 200 }}></Select>
        </FormItem>
        <FormItem name="status">
          <Select placeholder="????????????" style={{ width: 200 }}>
            <Option value={0}> ?????????</Option>
            <Option value={1}> ?????????</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type='primary' icon={<SearchOutlined />} htmlType="submit">??????</Button>
          <Button style={{ marginLeft: 20 }} onClick={clear}>??????</Button>
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
            return `??????${total}???`
          },
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15],
          onChange(page, pageSize) {
            setPage(page)
            setPageSize(pageSize)
            setTotal(total)
            getHospitalList(page, pageSize)
          }
        }}
      />
    </Card >
  )
}
