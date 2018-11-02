const {
    signIn,
    createNewOrg
  } = require("../services"),
  {
    startSessionApi
  } = require("../../../../session-store"),
  {
    apiErrors
  } = require("../../../../responses");

module.exports = (api, db) => {
  api.post("/signin", (req, res) => {
    signIn(db, req.body)
      .then(startSessionApi(req, res))
      .catch(apiErrors(res, res, 404));
  });

  api.post("/signup", (req, res) => {
    createNewOrg(db, req.body)
      .then(startSessionApi(req, res))
      .catch(apiErrors(res, res, 409));
  });
};
