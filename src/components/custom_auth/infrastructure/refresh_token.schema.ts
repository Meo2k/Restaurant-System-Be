
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RefreshTokenDocument = HydratedDocument<RefreshToken>;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class RefreshToken {

    @Prop({
        required : true, 
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    })
    user_id: mongoose.Types.ObjectId;

    @Prop({required : true})
    refresh_token : string

    @Prop({required: true})
    expired_at: string; 

    @Prop()
    device_id: string;

    @Prop()
    user_agent : string; 

  
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
