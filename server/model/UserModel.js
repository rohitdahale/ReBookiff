import mongoose, { mongo } from "mongoose";

const schema = mongoose.Schema;

const UserSchema = schema({
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  savedbooks:{
    type:[String],
    default:[]
  }
},{
  timestamps:true
});

const UserModel = mongoose.model('usermodel',UserSchema);

export default UserModel;