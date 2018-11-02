module.exports = {
  allProjectsForUser(db, user) {
    return db.projects.findAll({
      where: {
        organizationsId: user.organizationsId
      }
    });
  }
};
