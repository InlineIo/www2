const fs = require("fs");

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

function processTemplate(cont) {
  return (f) => {
    const content = "process temp";
    cont(f.path, content);
  };
}

module.exports = {
  cmd(output) {
    return (name, cmd) => {
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
        tempDir = `${__dirname}/../templates/modules`;
        dirs = [baseDir,
          clientDir,
          serverDir,
          controllersDir,
          routesDir, viewsDir, componentsDir],
        files = [
          { cmd: cmd, path: viewsList, tmp: `${tempDir}/viewsList.ejs`},
          { cmd: cmd, path: viewsComponentsListItems, tmp: `` },
          { cmd: cmd, path: routesIndex, tmp: `` },
          { cmd: cmd, path: routesApi, tmp: `` },
          { cmd: cmd, path: routesPages, tmp: `` },
          { cmd: cmd, path: clientIndex, tmp: `` },
          { cmd: cmd, path: controller, tmp: `` }
        ];

      output("Creating files");
      dirs.forEach(createDir(output));
      files.forEach(processTemplate(createFile(output)));
      output("Finished");
    };
  }
}