import USERS_DB from "../database";

const userPermission = (req, res, next) => {
  const decodedUser = USERS_DB.find((u) => u.email === req.decoded.email);
  const paramsUser = req.user;

  if (decodedUser.isAdmin) {
    return next();
  }

  if (decodedUser != paramsUser) {
    return res.status(403).json({ message: "You can't update another user." });
  }

  return next();
};

export default userPermission;
