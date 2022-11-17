import { Document } from "mongoose";

export default interface IShoppingCart extends Document {
    user_uid: String,
    goods_uid: Array<String>,
}