import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import CollectionModel from "../models/collection.model";
import GoodieModel from "../models/goodie.model";

export const createCollection = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const image = data.image;

      if (image) {
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "DevStyle/Collections",
        });

        data.image = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const results = await CollectionModel.create(data);

      res.status(201).json({
        message: results,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const getAllCollections = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const results = await CollectionModel.find();

    res.status(201).json({
      message: results,
    });

    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const getOneCollection = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await CollectionModel.findOne({ _id: req.params.id });

      res.status(201).json({
        message: results,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const getOneCollectionAndGoodies = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const collections = await CollectionModel.findOne({
        slug: req.params.slug,
      });

      const goodie = await GoodieModel.find({
        fromCollection: collections?._id,
      });

      res.status(201).json({
        message: {
          collections,
          goodie,
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const updateOneCollection = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await CollectionModel.findOneAndUpdate(
        { slug: req.params.slug },
        { ...req.body },
        { new: true }
      );

      res.status(201).json({
        message: results,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const deleteOneCollection = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const results = await CollectionModel.deleteOne({ slug: req.params.slug });

    res.status(201).json({
      message: results,
    });

    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
