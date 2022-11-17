import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Goods from '../models/goods';

const createGoods = (req: Request, res: Response, next: NextFunction) => {
    let { name, seller, price, description } = req.body;

    const goods = new Goods({
        _id: new mongoose.Types.ObjectId(),
        name,
        seller,
        price,
        description,
    });

    return goods
        .save()
        .then((result) => {
            return res.status(201).json({
                goods: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllGoods = (req: Request, res: Response, next: NextFunction) => {
    Goods.find()
        .exec()
        .then((goods) => {
            return res.status(200).json({
                'goods': goods,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getGoods = (req: Request, res: Response, next: NextFunction) => {
    let uid = req.header('uid');

    Goods.findById({ _id: uid })
        .exec()
        .then((good) => {
            return res.status(200).json({
                'good': good,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const removeGoods = (req: Request, res: Response, next: NextFunction) => {
    let uid = req.header('uid');

    Goods.findByIdAndRemove({ _id: uid })
        .exec()
        .then((good) => {
            return res.status(200).json({
                'good': good,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { removeGoods, getAllGoods, getGoods, createGoods };