const fs = require("fs");
const path = require("path");
const { buildClientSchema } = require("graphql/utilities/buildClientSchema");
const { printSchema } = require("graphql/utilities/schemaPrinter");

const schemaPath = path.join(process.cwd(), "schema.json");

fs.readFile(schemaPath, { encoding: "utf-8" }, function(err, file) {
  const { data } = JSON.parse(file);

  const schema = buildClientSchema(data);

  fs.writeFile("schema.graphql", printSchema(schema), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
});
