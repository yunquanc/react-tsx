import React, { useEffect, useState } from "react";
import moment from "moment";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { DatePicker, Form, Button, DatePickerProps } from "antd";
import { CAPI } from "../../lib";
import "./index.less";
const { RangePicker } = DatePicker;
const _CAPI = new CAPI();
const Insert = (props: any) => {
  const [form] = Form.useForm();
  const _props: any = props;
  console.log(form);

  let insertDAte = async (param: { date: Number; timeList: any[] }) => {
    param.timeList = param.timeList.map((e: Number[]): any => {
      e = [
        Math.floor((e[0] as any) / 1000) * 1000,
        Math.floor((e[1] as any) / 1000) * 1000,
      ];
      return e;
    });
    param.date = new Date(param.date as any).getTime();
    let res = await _CAPI.insert(param);
    console.log(res);
  };

  // 表单成功事件
  const onFinish = (values: any) => {
    console.log("Success:", values);
    insertDAte(values);
  };

  // 表单失败事件
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
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ date: moment(), timeList: [[]] }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="date"
          name="date"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <DatePicker onChange={onChange} picker="month" />
        </Form.Item>
        <Form.List
          name="timeList"
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
                          showTime={{
                            defaultValue: [
                              moment({
                                h: 0,
                                m: 0,
                                s: 0,
                                ms: 0,
                              }),
                              moment({
                                h: 0,
                                m: 0,
                                s: 0,
                                ms: 0,
                              }),
                            ],
                          }}
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
                <Button type="primary" onClick={() => add()}>
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

export default Insert;
