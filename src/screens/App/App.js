/* @flow */
import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import { Col, Row } from "react-flexbox-grid";
import { Link } from "found";
import { Carousel, Menu, Layout, Card } from "antd";
import moment from "moment";
import "flexboxgrid/dist/flexboxgrid.min.css";
import "./app.css";

const { Footer, Header, Content } = Layout;

const App = ({ children, shop }) => {
  return (
    <Layout>
      <Menu selectedKeys="home" mode="horizontal" className="header--detail">
        <Menu.Item>
          <Link to="/home">Demo</Link>
        </Menu.Item>
        <Menu.Item key="catalog">
          <Link to="/catalog">Catalog</Link>
        </Menu.Item>
      </Menu>
      {children}
      <Footer>
        <Row center="xs">
          <Col>
            &#9400; {moment().format("YYYY")}, Kyle Espinola
            <address>Relay aws demo</address>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default createFragmentContainer(
  App,
  graphql`
    fragment App_shop on Shop {
      name
    }
  `
);
