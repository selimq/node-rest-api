import mongoose from "mongoose";

import { dbUri } from "../config/index.js";

export default async () => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(dbUri, {})
    .then(() => {
      console.log("Mongo connection successful");
    })
    .catch((err) => {
      console.log(err);
    });
};
