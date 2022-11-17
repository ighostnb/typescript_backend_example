import mongoose, { Schema } from 'mongoose';
import logger from '../config/logger';
import IShoppingCart from '../interfaces/shopping_cart';

const ShoppingCartSchema: Schema = new Schema(
    {
        user_uid: { type: String, required: true },
        goods_uid: { type: Array<String>, required: true },
    }, 
    {
        timestamps: true,
    },
);

ShoppingCartSchema.post<IShoppingCart>('save', () =>
    logger.info('MongoDB', 'Shopping cart saved', this),
);

export default mongoose.model<IShoppingCart>('Cart', ShoppingCartSchema);
