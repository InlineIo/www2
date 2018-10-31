const fs = require("fs");

function createDir(output) {
  return (path) => {
    fs.mkdir(path);
    output(path);
  };
}

function createFile(output) {
  return (path) => {
    fs.writeFileSync(path);
    output(path);
  };
}

module.exports = {
  cmd(output) {
    return (name, cmd) => {
      const baseDir = `${__dirname}/../../modules/${name}`,
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
        dirs = [baseDir,
          clientDir,
          serverDir,
          controllersDir,
          routesDir, viewsDir, componentsDir],
        files = [viewsList,
          viewsComponentsListItems, routesIndex,
          routesApi, routesPages, clientIndex, controller];

      output("Creating files");
      dirs.forEach(createDir(output));
      files.forEach(createFile(output));
      output("Finished");
    };
  }
}