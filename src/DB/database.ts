import mongoose from "mongoose";

const dbURI =
  "mongodb+srv://foneli210:ud2kQLB4t1UW2ja0@cluster0.grdaq.mongodb.net/fonelli?retryWrites=true&w=majority";
const connectDB = async () => {
  mongoose
    .connect(dbURI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};

export default connectDB;

/*mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/<base-de-datos>?retryWrites=true&w=majority
 */
