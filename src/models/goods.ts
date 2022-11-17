import mongoose, { Schema } from 'mongoose';
import logger from '../config/logger';
import IGoods from '../interfaces/goods';

const GoodsSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        seller: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
    }, 
    {
        timestamps: false,
    },
);

GoodsSchema.post<IGoods>('save', () =>
    logger.info('MongoDB', 'Goods saved', this),
);

export default mongoose.model<IGoods>('Cart', GoodsSchema);
