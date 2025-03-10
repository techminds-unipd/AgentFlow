import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import WorkflowEntity from "src/workflow/adapter/output/WorkflowEntity";

export type UserDocument = HydratedDocument<UserEntity>;

@Schema()
export class UserEntity {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    workflows: WorkflowEntity[];
}

export const userEntitySchema = SchemaFactory.createForClass(UserEntity);
