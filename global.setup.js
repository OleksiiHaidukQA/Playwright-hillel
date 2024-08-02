import dotenv from 'dotenv';

dotenv.config();

export default function () {
  if (process.env.ENV !== 'stage') {
    return;
  }
  console.log("GLOBAL SETUP");
}