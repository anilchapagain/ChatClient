// create new user and save it to db
import { User } from "./../models/user.js";
import {cookieOption, sendToken} from '../utils/features.js';
import { compare } from "bcrypt";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "../middlewares/error.js";
const newUsers = async (req, res) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "id",
    url: "url",
  };
  const user = await User.create({ name, username, password, bio, avatar });
  sendToken(res, user, 201, "User Created");
};

const login = TryCatch( async(req, res,next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select(["+password"]);
  if (!user) return next(new ErrorHandler("Invalid UserName OR Password", 404));
  const isMatch = await compare(password, user.password);
  if (!isMatch)
    return next(new ErrorHandler("Invalid UserName OR Password", 404));
  sendToken(res, user, 200, "welcome Back");
});
// user must be login
const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);
  res.status(200).json({
    success: true,
    user,
  });
});
const logout = TryCatch(async (req, res) => {
 return res.status(200).cookie('secret-token','',{...cookieOption,maxAge:0}).json({
  success:true,
  message:'Logged Out Successfully'
 })
});
const searchUser = TryCatch(async (req, res) => {

  const {name} = req.query;
  
  return res
    .status(200)   
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});
export { login, newUsers, getMyProfile,logout,searchUser };
