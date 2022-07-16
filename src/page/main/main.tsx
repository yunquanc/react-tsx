import React from "react";
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
import "antd/dist/antd.css";
import { ConfigProvider, Layout } from "antd";
import "./main.less";
import zhCN from "antd/lib/locale/zh_CN";
import HeaderMenu from "../../components/menu";

const { Header, Footer, Sider, Content } = Layout;

const Main = (props: any) => {
  const _props: any = props;
  console.log("main-------->", props);
  return (
    <div className="main">
      <ConfigProvider locale={zhCN}>
        <Layout>
          <Header>
            <HeaderMenu></HeaderMenu>
          </Header>
          <Content>
            <Outlet></Outlet>
          </Content>
          <Footer>
            <a href="https://beian.miit.gov.cn">沪ICP备19037710号-1</a>
          </Footer>
        </Layout>
      </ConfigProvider>
    </div>
  );
};

export default Main;
