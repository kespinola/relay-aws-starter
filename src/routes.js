import React from "react";
import makeRouteConfig from "found/lib/makeRouteConfig";
import Route from "found/lib/Route";
import Redirect from "found/lib/Redirect";
import { graphql } from "react-relay";

import App from "./screens/App";
import Home from "./screens/Home";
import ProductShow from "./screens/ProductShow";
import Catalog from "./screens/Catalog";

export default makeRouteConfig(
  <Route
    path="/"
    Component={App}
    query={graphql`
      query routes_App_Query {
        shop {
          ...App_shop
        }
      }
    `}
  >
    <Route
      path="home"
      Component={Home}
      query={graphql`
        query routes_Home_Query {
          shop {
            ...Home_shop
          }
        }
      `}
    />
    <Route
      path="catalog"
      Component={Catalog}
      query={graphql`
        query routes_Catalog_Query {
          shop {
            ...Catalog_shop
          }
        }
      `}
    />
    <Route
      path="products/:id"
      Component={ProductShow}
      query={graphql`
        query routes_ProductShow_Query($id: ID!) {
          node(id: $id) {
            ...ProductShow_node
          }
        }
      `}
    />
    <Redirect from="/" to="/home" />
  </Route>
);
