import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


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

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);


class NodeEntity {
    type: string;
    action: string;
    positionX: number;
    positionY: number;
}

class WorkflowEntity {
    name: string;
    nodes: NodeEntity[];
}

