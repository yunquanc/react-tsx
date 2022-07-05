import React from "react";
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

const Main = (props: any) => {
  const _props: any = props;
  console.log("main-------->", props);
  return (
    <div>
      {/* <p>Main123</p>
      <Button type="primary">Primary Button</Button>
      <Link to="/home">home</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/home/123/a">home/a</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/home/456/b">home/b</Link> */}
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>
            <Outlet></Outlet>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Main;
