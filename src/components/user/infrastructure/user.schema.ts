
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class User {
    @Prop({required : true})
    email: string; 

    @Prop({required: true})
    password: string; 

    @Prop()
    username: string;

    @Prop()
    avatar: string;

    @Prop()
    isActive: boolean;

    @Prop()
    address: string;

    @Prop()
    code: string;

    @Prop()
    code_expired: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
