import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import ShoppingCart from '../models/shopping_cart';

const createShoppingCart = (req: Request, res: Response, next: NextFunction) => {
    let { good_uid, user_uid } = req.body;

    const cart = new ShoppingCart({
        _id: new mongoose.Types.ObjectId(),
        user_uid,
        good_uid, 
    });

    return cart
        .save()
        .then((result) => {
            return res.status(201).json({
                cart: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getShoppingCart = (req: Request, res: Response, next: NextFunction) => {
    ShoppingCart.findOne({ user_uid: req.header('user_uid') })
        .exec()
        .then((cart) => {
            return res.status(200).json({
                'cart': cart,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const removeCart = (req: Request, res: Response, next: NextFunction) => {
    let uid = req.header('uid');

    ShoppingCart.findByIdAndRemove({ _id: uid })
        .exec()
        .then((cart) => {
            return res.status(200).json({
                'cart': cart,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const addToCart = (req: Request, res: Response, next: NextFunction) => {
    let user_uid = req.header('user_uid');
    let goods_uid = req.header('goods_uid');
    ShoppingCart.findOne({ user_uid: user_uid })
        .exec()
        .then((cart) => {
            let goodsArray = cart?.goods_uid ?? [];
            goodsArray.push(goods_uid as String);

            cart!.goods_uid = goodsArray;
            cart?.save().then((value) => {
                return res.status(200).json({
                    'cart': cart,
                });
            })
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const removeFromCart = (req: Request, res: Response, next: NextFunction) => {
    let user_uid = req.header('user_uid');
    let goods_uid = req.header('goods_uid');
    ShoppingCart.findOne({ user_uid: user_uid })
        .exec()
        .then((cart) => {
            let goodsArray = cart?.goods_uid ?? [];
            delete goodsArray[goodsArray.findIndex(item => item == goods_uid)];

            cart!.goods_uid = goodsArray;
            cart?.save().then((value) => {
                return res.status(200).json({
                    'cart': cart,
                });
            })
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { removeFromCart, addToCart, removeCart, getShoppingCart, createShoppingCart };
