import Env from "./env";
import mongoose from "mongoose";
import { TagModel } from "../domain/entity";
import tags from "../domain/json/tags.json";
import logger from "./logger";

export const connect = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(Env.DB_STRING).then(() => {
        logger.info('Successfully connected to database', {
            uri: Env.DB_STRING,
            timestamp: Date.now()
        });
    }).catch((err) => {
        logger.warn(err.message);
        throw new Error('Failed to connect to database');
    });
}

export const seed = () => {
    try {
        TagModel.collection.insertMany(tags.map((tag) => {
            return {
                ...tag,
                dateCreated: new Date(Date.now()),
                dateModified: new Date(Date.now())
            }
        }));
        logger.info('Successfully seeded database', {
            uri: Env.DB_STRING,
            timestamp: Date.now()
        });
    } catch (err: any) {
        logger.warn('Failed to seed database', {
            uri: Env.DB_STRING,
            timestamp: Date.now()
        });
        throw new Error('Failed to seed database');
    }
}
