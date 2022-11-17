import { Document } from "mongoose";

export default interface IGoods extends Document {
    name: String,
    seller: String,
    price: number,
    description: String,
}