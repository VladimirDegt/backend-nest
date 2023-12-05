import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CatDocument = HydratedDocument<Cat>;

@Schema({ versionKey: false, timestamps: { createdAt: true, updatedAt: true } })
export class Cat {
    @Prop()
    name: string

    @Prop()
    age: number

    @Prop()
    breed: string
}

export const CatSchema = SchemaFactory.createForClass(Cat);