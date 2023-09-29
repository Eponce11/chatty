import { connect } from "mongoose";

const connectToDB = (DB: String) => {
  connect(`${process.env.ATLAS_URI}`, { dbName: `${DB}` })
    .then(() => console.log(`Connected to ${DB}`))
    .catch((err) => console.log(`Connection failed to ${DB}`, err));
};

export default connectToDB;
