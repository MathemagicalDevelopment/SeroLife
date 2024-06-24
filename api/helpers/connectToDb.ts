import mongoose from "mongoose";
const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_URL, DATABASE_APP_NAME } = process.env;

const URI = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_URL}?retryWrites=true&w=majority&appName=${DATABASE_APP_NAME}`;

export const connectToDb = async (): Promise<boolean> => {
    return await mongoose
        .connect(URI)
        .then(() => {
            console.log(
                `Connected to the SeroLife database`
            );
            return true;
        })
        .catch(() => {
            console.log('Cannot connect to database, eek!');
            return false;
            throw new Error('Failed to Connect')
        });
}