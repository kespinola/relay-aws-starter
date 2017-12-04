import React from "react";
import { Row, Col } from "react-flexbox-grid";
import { Layout } from "antd";
import { createFragmentContainer, graphql } from "react-relay";
import Product from "./../../components/Product";

const Catalog = ({ children, shop }) => {
  return (
    <Row>
      <Col xs={10} xsOffset={1}>
        <Row>
          {shop.products.edges.map(({ node }) => (
            <Col key={node.id} xs={12} sm={6}>
              <Product key={node.id} product={node} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default createFragmentContainer(
  Catalog,
  graphql`
    fragment Catalog_shop on Shop {
      products(first: 20) {
        edges {
          node {
            id
            ...Product_product
          }
        }
      }
    }
  `
);
