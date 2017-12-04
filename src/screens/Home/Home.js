import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import Collection from "./../Collection";
import { Link } from "found";
import { Menu, Icon, Carousel, Layout, Card } from "antd";
import { Col, Row } from "react-flexbox-grid";

const MenuItemGroup = Menu.ItemGroup;

const { Header, Footer, Sider, Content } = Layout;

const Home = ({ match, shop, relay }) => {
  return shop.collections.edges.map(({ node }) => {
    return <Collection key={node.id} collection={node} />;
  });
};

export default createFragmentContainer(
  Home,
  graphql`
    fragment Home_shop on Shop {
      collections(first: 3) {
        edges {
          node {
            id
            ...Collection_collection
          }
        }
      }
    }
  `
);
