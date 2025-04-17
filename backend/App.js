const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/UserRoutes");
app.use('/user', userRoutes);

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/VotingSystem', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
