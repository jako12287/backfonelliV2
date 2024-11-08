import mongoose, { Schema, Document } from "mongoose";
import { StatusProps } from "../types";

interface IDetails {
  size: string;
  caratage: string;
  color: string;
  initial?: string;
  name?: string;
  rocks: string[];
  long?: string;
}

interface IOrders extends Document {
  customer_id: string;
  model_name: string;
  piece: string;
  observations?: string;
  details: IDetails[];
  status?: StatusProps;
}

const DetailsSchema: Schema = new Schema({
  size: { type: String, required: true },
  caratage: { type: String, required: true },
  color: { type: String, required: true },
  initial: { type: String },
  name: { type: String },
  rocks: { type: [String], required: true },
  long: { type: String },
});

const OrdersSchema: Schema = new Schema({
  customer_id: { type: String },
  model_name: { type: String, required: true },
  piece: { type: String, required: true },
  observations: { type: String },
  status: { type: String, required: true },
  details: {
    type: [DetailsSchema],
    validate: {
      validator: (v: IDetails[]) => v.length >= 1 && v.length <= 12,
      message: "Details array must contain between 1 and 12 items",
    },
  },
});

export default mongoose.model<IOrders>("Order", OrdersSchema);
