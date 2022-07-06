import React from "react";
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
import "antd/dist/antd.css";
import { ConfigProvider, Layout } from "antd";
import "./main.less";
import zhCN from "antd/lib/locale/zh_CN";

const { Header, Footer, Sider, Content } = Layout;

const Main = (props: any) => {
  const _props: any = props;
  console.log("main-------->", props);
  return (
    <div className="main">
      <ConfigProvider locale={zhCN}>
        <Layout>
          <Header>Header</Header>
          <Content>
            <Outlet></Outlet>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </ConfigProvider>
    </div>
  );
};

export default Main;
