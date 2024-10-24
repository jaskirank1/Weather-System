const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://kiran18202:PsqXlUzMcP4RmCdK@weathersystem.s9j6v.mongodb.net/weatherSystem');
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB Connection Error", err);
    }
};

module.exports = connectDB;