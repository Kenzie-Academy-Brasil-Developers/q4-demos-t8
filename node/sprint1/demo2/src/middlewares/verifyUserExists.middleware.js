import DB from "../database";

const verifyUserExists = (req, res, next) => {
  const user = req.body;

  const found_user = DB.find(
    ({ name }) => name.toLowerCase() === req.body.name.toLowerCase()
  );

  if (found_user) {
    return res.status(409).json({ message: "name already exists!" });
  }

  req.user = user;

  return next();
};

// user_exists python snake_case
// userExists js cammelCase

export default verifyUserExists;
