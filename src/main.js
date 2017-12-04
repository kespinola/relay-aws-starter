import React from "react";
import { render } from "react-dom";
import BrowserProtocol from "farce/lib/BrowserProtocol";
import queryMiddleware from "farce/lib/queryMiddleware";
import createFarceRouter from "found/lib/createFarceRouter";
import createRender from "found/lib/createRender";
import { Resolver } from "found-relay";
import { Environment, RecordSource, Store, Network } from "relay-runtime";
import routes from "./routes";
import "./styles/app.css";

function fetchQuery(operation, variables, cacheConfig, uploadables) {
  return fetch(process.env.GRAPHQL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables
    })
  }).then(response => {
    return response.json();
  });
}

const network = Network.create(fetchQuery);

const environment = new Environment({
  network,
  store: new Store(new RecordSource())
});

const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: routes,

  render: createRender({})
});

const Main = () => <Router resolver={new Resolver(environment)} />;

export default Main;
