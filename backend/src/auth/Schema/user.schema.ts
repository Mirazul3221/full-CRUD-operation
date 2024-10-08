import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class user extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ unique: [true, 'Email already exist'] })
  email: string;
  @Prop({ required: true, select: false })
  password: string;
}

export const user_schema = SchemaFactory.createForClass(user);
export const user_model = user.name;
