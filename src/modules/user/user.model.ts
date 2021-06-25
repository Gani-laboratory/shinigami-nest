import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

// UserSchema.pre<UserDocument>(/^findOneAndUpdate$/, function (next) {
// console.log(this);
// bcrypt.genSalt(10, (err, salt) => {
//   if (err) return next(err);
//   bcrypt.hash(this.password, salt, (err, hash) => {
//     if (err) return next(err);
//     this.password = hash;
//     next();
//   });
// });
// });
