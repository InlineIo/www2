const fs = require("fs"),
  Mustache = require("mustache");

function createDir(output) {
  return (path) => {
    fs.mkdirSync(path);
    output(path);
  };
}

function createFile(output) {
  return (path, content) => {
    fs.writeFileSync(path, content);
    output(path);
  };
}

function processTemplate(payload, cont) {
  return (f) => {
    const content = Mustache.render(fs.readFileSync(f.tmp).toString(), payload);
    cont(f.path, content);
  };
}

module.exports = {
  cmd(output) {
    return (name, singular, title, description, cmd) => {
      const baseDir = `${__dirname}/../modules/${name}`,
        clientDir = `${baseDir}/client`,
        serverDir = `${baseDir}/server`,
        controllersDir = `${clientDir}/controllers`,
        routesDir = `${serverDir}/routes`,
        viewsDir = `${serverDir}/views`,
        componentsDir = `${viewsDir}/components`,
        viewsList = `${viewsDir}/list.ejs`,
        viewsComponentsListItems = `${componentsDir}/list-items`,
        routesIndex = `${routesDir}/index.js`,
        routesApi = `${routesDir}/api.js`
      routesPages = `${routesDir}/pages.js`,
        clientIndex = `${clientDir}/index.js`,
        controller = `${controllersDir}/${name}_controller.js`,
        tempDir = `${__dirname}/templates/modules`;
        dirs = [baseDir,
          clientDir,
          serverDir,
          controllersDir,
          routesDir, viewsDir, componentsDir],
        files = [
          {path: viewsList, tmp: `${tempDir}/viewsList.ejs`},
          {path: viewsComponentsListItems, tmp: `${tempDir}/listItems.ejs` },
          {path: routesIndex, tmp: `${tempDir}/routesIndex.js` },
          {path: routesApi, tmp: `${tempDir}/routesApi.js` },
          {path: routesPages, tmp: `${tempDir}/routesPages.js` },
          {path: clientIndex, tmp: `${tempDir}/clientIndex.js` },
          {path: controller, tmp: `${tempDir}/controller.js` }
        ];

      output("Creating files");
      dirs.forEach(createDir(output));
      files.forEach(processTemplate({ name, singular, description, title }, createFile(output)));
      output("Finished");
    };
  }
}