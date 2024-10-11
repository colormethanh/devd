module.exports = function (app) {
  app.get("/", (req, res) => {
    res.redirect(301, "/documentation");
  });

  app.get("/projects", (req, res) => {
    res.send([{ name: "test project 1" }, { name: "test project 2" }]);
  });
};
