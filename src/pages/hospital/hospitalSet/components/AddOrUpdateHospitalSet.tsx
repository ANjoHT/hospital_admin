import { reqAddHospitalSets, reqGetHospitalSet, reqUpdateHospitalSet } from "@/api/hospital/hospitalSet"
import { Card, Form, Input, Button, message } from "antd"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function AddOrUpdateHoospitalSet() {

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const id = useLocation().state as number

  useEffect(() => {
    async function fetch() {
      const res = await reqGetHospitalSet(id)
      form.setFieldsValue(res)
    }
    if (id) fetch()
  }, [])


  async function onFinish(values: any) {
    if (id) {
      values.id = id
      await reqUpdateHospitalSet(values)
      message.success('修改成功')
    }
    else {
      await reqAddHospitalSets(values)
      message.success("添加成功")
    }
    navigate(-1)

  }

  return (
    <Card>
      <Form
        labelCol={{ span: 3 }}
        form={form}
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item
          label="医院名称"
          name="hosname"
          rules={[{ required: true, message: '请输入医院名称' }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          label="医院编码"
          name="hoscode"
          rules={[{ required: true, message: '请输入医院编码' }]}
        >
          <Input placeholder="医院编码" />
        </Form.Item>
        <Form.Item
          label="api基础路径"
          name="apiUrl"
          rules={[{ required: true, message: '请输入api基础路径' }]}
        >
          <Input placeholder="api基础路径" />
        </Form.Item>
        <Form.Item
          label="联系人姓名"
          name="contactsName"
          rules={[{ required: true, message: '请输入联系人姓名' }]}
        >
          <Input placeholder="联系人姓名" />
        </Form.Item>
        <Form.Item
          label="联系人手机号"
          name="contactsPhone"
          rules={[{
            required: true,
            message: '请输入联系人手机号',
            pattern: /^1[3-9]\d{9}$/,
          }]}
        >
          <Input placeholder="联系人手机号" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            onClick={() => { navigate(-1) }}
          >返回 </ Button>
        </Form.Item>


      </Form>
    </Card >
  )
}