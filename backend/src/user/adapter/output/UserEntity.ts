import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type UserDocument = HydratedDocument<UserEntity>;

@Schema()
export class UserEntity {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
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

