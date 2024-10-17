const extractProjectId = (req, res, next) => {
  req.project_id = req.params.project_id;
  return next();
};

module.exports = { extractProjectId };
