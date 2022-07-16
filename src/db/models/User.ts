import db from "../index";

const UserSchema = new db.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  erros: {
    type: Number,
    required: true,
  },
  dificulty: {
    type: Number,
    required: true,
  }
});

export default db.model("User", UserSchema);
