import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router";

const items = [
  { label: "首页", key: "/" },
  { label: "列表", key: "/list" }, // 菜单项务必填写 key
  { label: "新增", key: "/insert" },
];
const HeaderMenu = () => {
  const [current, setCurrent] = useState("1");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    for (let i of items) {
      if (location.pathname === i.key) {
        setCurrent(i.key);
      }
    }
  }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  return (
    <Menu
      theme="dark"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default HeaderMenu;
