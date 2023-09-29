import { connect } from "mongoose";

const connectToDB = (DB: String) => {
  connect(`mongodb://localhost/${DB}`)
    .then(() => console.log(`Connected to ${DB}`))
    .catch((err) => console.log(`Connection failed to ${DB}`, err));
};

export default connectToDB;