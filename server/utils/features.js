import { mongoose } from "mongoose";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import {v2 as cloudinary} from 'cloudinary';
import { getBase64 } from "../lib/helper.js";
const cookieOption = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "none",
  secure: true,
};
const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "chatApp" })
    .then((data) => {
      console.log("MongoDB Connected...", data.connection.host);
    })
    .catch((err) => {
      throw err;
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  return res.status(code).cookie("secret-token", token, cookieOption).json({
    success: true,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  console.log(event);
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        { resource_type: "auto", public_id: uuid() },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });
  try {
    const results = await Promise.all(uploadPromises);
    console.log("result", results);
    const formatedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.url,
    })
    
  );
  console.log('formatedResults', formatedResults);
  return formatedResults;
  } catch (error) {
    throw new Error('Error uploading file to cloudinary',error)
  }
};

const deleteFilesFromCloudinary = async (public_id) => {};

export {
  connectDB,
  sendToken,
  cookieOption,
  emitEvent,
  deleteFilesFromCloudinary,
  uploadFilesToCloudinary,
};
