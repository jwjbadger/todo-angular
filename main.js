const { app, BrowserWindow } = require("electron");
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 600,
    show: false,
  });
  win.removeMenu();
  win.maximize();

  win.loadURL(`file://${__dirname}/dist/todo-app/index.html`);

  win.on("closed", function () {
    win = null;
  });

  win.once("ready-to-show", () => {
    win.show();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (win === null) {
    createWindow();
  }
});
