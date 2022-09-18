
import * as mongoose from "mongoose";


export const PostSchema = new mongoose.Schema({

    body:String,
    createdAt:Date,
})