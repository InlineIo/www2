module.exports = (app) => {
  const db = app.get("db");
  app.post("/api/signup", (req, res) => {
    db.organizations.create({name: req.body.organization})
      .then((org) => {
        const newUSer = req.body;
        newUSer.orgId = org.id;
        return db.users.create(newUser)
      })
      .then(() => {
        res.send({ status: "OK" });
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });
};