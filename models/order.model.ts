require("dotenv").config();
import mongoose, { Model, Schema } from "mongoose";
import DiffPlugin from "mongoose-history-diff";
import { IOrder } from "../lib/interfaces";

const orderSchema: Schema<IOrder> = new mongoose.Schema(
  {
    goodies: [{}],

    status: {
      type: String,
      default: "pending"
    },
    email: {
      type: String
      // required: true
    },
    initDate: { type: Date, default: Date.now() }
  },

  { timestamps: true }
);

orderSchema.plugin(DiffPlugin);

const OrderModel: Model<IOrder> = mongoose.model("Order", orderSchema);

export default OrderModel;
