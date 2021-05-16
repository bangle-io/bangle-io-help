const globby = require("globby");
const fs = require("fs/promises");
const path = require("path");

const rootPath = path.join(__dirname, "..");

const DOCS_FOLDER = "docs";
const filesGlob = ["docs/**", "!**/node_modules/**", "!**/*.js", "!**/*.json"];

async function getFiles() {
  let files = await globby(filesGlob, { onlyFiles: true, gitignore: true });

  // remove docs from the path
  files = files.map((f) => f.split("/").slice(1).join("/"));

  const result = {
    files,
  };

  await fs.writeFile(
    path.join(__dirname, "..", DOCS_FOLDER, ".bangle", "files.json"),
    JSON.stringify(result),
    "utf-8"
  );
}

getFiles();
