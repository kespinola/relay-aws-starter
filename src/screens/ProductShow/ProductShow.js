import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import { Icon, Carousel, Layout, Card } from "antd";
import { Row, Col } from "react-flexbox-grid";
import Product from "./../../components/Product";

const { Footer, Sider, Content } = Layout;

const ProductShow = ({ match, node }) => {
  return (
    <Row>
      <Col xsOffset={1} xs={10}>
        <Product product={node} />
      </Col>
    </Row>
  );
};

export default createFragmentContainer(
  ProductShow,
  graphql`
    fragment ProductShow_node on Product {
      ...Product_product
    }
  `
);
