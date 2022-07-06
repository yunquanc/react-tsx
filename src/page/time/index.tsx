import React, { useEffect, useState } from "react";
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { DatePicker, Form, Button, DatePickerProps } from "antd";
import { CAPI } from "../../lib";
import "./index.less";
const { RangePicker } = DatePicker;
const _CAPI = new CAPI();
const Time = (props: any) => {
  // 初始值
  const [data, setData] = useState([]);

  const loadList = () => {
    _CAPI.list().then((res) => {
      console.log(res.data.data.name);
      setData(res.data.data.name);
    });
  };

  const [form] = Form.useForm();
  const _props: any = props;
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 8 },
    },
  };
  return (
    <div>
      {data.map((e) => {
        return <div key={e["_id"]}>{e["date"]}</div>;
      })}
      <Button type="primary" htmlType="submit" onClick={() => loadList()}>
        +
      </Button>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <DatePicker onChange={onChange} picker="month" />
        </Form.Item>
        <Form.List
          name="names"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(new Error("At least 2 passengers"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => {
                return (
                  <Form.Item
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    label={index === 0 ? "Passengers" : ""}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item noStyle>
                      <Form.Item
                        {...field}
                        noStyle
                        validateTrigger={["onChange", "onBlur"]}
                      >
                        <RangePicker
                          showTime={{ format: "HH:mm" }}
                          format="YYYY-MM-DD HH:mm"
                        />
                      </Form.Item>
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                );
              })}
              <Form.Item label="新增时间段">
                <Button type="primary" htmlType="submit" onClick={() => add()}>
                  +
                </Button>
              </Form.Item>
              <Form.ErrorList errors={errors} />
            </>
          )}
        </Form.List>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Time;
