import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["secret-token"];
  if (!token)
    return next(new ErrorHandler("Need to login to access this route", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedData._id;
  next();
};
const adminOnly = (req, res, next) => {
  const token = req.cookies["admin-token"];
  if (!token)
    return next(new ErrorHandler("ONLY Admin can access this route", 401));

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);
   const adminSecretKey = process.env.ADMIN_SECRET_KEY || "aniladmin";
   const isMatch = secretKey === adminSecretKey;

   if (!isMatch) return next(new ErrorHandler("Invalid Secret Key", 401));
  

  next();
};

export { isAuthenticated ,adminOnly};
