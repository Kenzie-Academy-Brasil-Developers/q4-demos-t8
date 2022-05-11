import DB from "../database";

const getUserByIdOr404 = (req, res, next) => {
  const { uuid } = req.params;

  const user = DB.find((u) => u.uuid === uuid);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  req.user = user;

  return next();
};

export default getUserByIdOr404
