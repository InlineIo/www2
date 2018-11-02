module.exports = {
  apiErrors(req, res, code) {
    return (error) => {
      if (error && error.errorCode) {
        res.status(code).send(error);
      } else {
        res.status(500).send(error);
      }
    };
  }
};
