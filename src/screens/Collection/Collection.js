import React from "react";
import { Row, Col } from "react-flexbox-grid";
import { createFragmentContainer, graphql } from "react-relay";
import Product from "./../../components/Product";

const Collection = ({ children, collection }) => {
  return collection.products.edges.map(({ node }) => (
    <Row className="collection__tile" key={node.id}>
      <Col xs={10} xsOffset={1}>
        <Product key={node.id} product={node} />
      </Col>
    </Row>
  ));
};

export default createFragmentContainer(
  Collection,
  graphql`
    fragment Collection_collection on Collection {
      title
      products(first: 5) {
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
