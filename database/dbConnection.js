import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "PORTFOLIO",
    })
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log(`Error ${error}`);
    });
};
