const FlowWebpackPlugin = require("flow-webpack-plugin");

const PUBLIC_PATH = process.env.PUBLIC_PATH || "http://localhost:5000/";

module.exports = {
  use: [
    [
      "neutrino-preset-react",
      {
        babel: {
          plugins: [
            "transform-flow-strip-types",
            ["relay", { schema: "./schema.graphql" }]
          ]
        },
        html: {
          title: "Relay AWS Demo"
        },
        devServer: {
          publicPath: PUBLIC_PATH,
          historyApiFallback: {
            rewrites: [{ from: /^\/$/, to: "/index.html" }]
          }
        }
      }
    ],
    ["neutrino-middleware-env", ["GRAPHQL_URL"]],
    ({ config, options }) => {
      config.output.publicPath(PUBLIC_PATH);

      config.when(options.command === "start", config => {
        config.devServer.headers({ "Access-Control-Allow-Origin": "*" });
      });

      config.plugin("flow").use(FlowWebpackPlugin, []);
    }
  ]
};
