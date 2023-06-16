import React, { useState } from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Typography,
  Space,
  Table,
  Tag,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { MdPieChartOutlined } from "react-icons/md";
import { Fa500Px, FaReact } from "react-icons/fa";
import { BsGit } from "react-icons/bs";
import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    <Link href="/">Dashboard</Link>,
    "1",
    <MdPieChartOutlined />,
    ),
  getItem((
    <Link href="/tech/allTechnologies">
      All Stacks
    </Link>
  ), "2", <MdPieChartOutlined />),
  getItem("Stacks", "sub1", <UserOutlined />, [
    getItem(<Link href="/stack/react/">React</Link>, "3", <FaReact />),
    getItem(<Link href="/stack/git/">Git</Link>, "4", <BsGit />),
    getItem("Next Js", "5", <Fa500Px />),
  ]),
];

const RootLayout = ({ children }) => {
  // console.log("Items",items)
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Title level={2} type="success">
          Preparation
        </Title>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>All Stacks</Breadcrumb.Item>
          </Breadcrumb> */}
          {children}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          ©2023 Created by Syed Rehaman
        </Footer>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
