const userSchema = require('../models/UserModel');
const voteSchema = require("../models/VoteModel");
const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new userSchema({ name, email, password });
    try {
        await user.save();
        console.log('User added successfully');
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getUsers = async (req, res) => {
    try {
        const users = await userSchema.find();
        console.log('Users fetched successfully');
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userSchema.findOne({ email, password })
        if (!user) {
            return res.status(404).json('User not found');
        }
        console.log('User fetched successfully');
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const polling = async (req, res) => {
    const { candidate, user } = req.body;

    if (!candidate || !user) {
        return res.status(400).json({ message: "Candidate and user email are required." });
    }

    try {
        // Find the user by email
        const existingUser = await userSchema.findOne({ email: user });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // Save the vote
        const vote = new voteSchema({ candidate, user: existingUser._id });
        await vote.save();

        res.status(200).json({ message: "Vote submitted successfully!" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "You have already voted." });
        }
        console.error("Error saving poll entry:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const results = async(req, res) => {
    try {
        // Aggregate votes to count the number of votes for each candidate
        const results = await voteSchema.aggregate([
            {
                $group: {
                    _id: "$candidate",
                    voteCount: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    voteCount: 1,
                },
            },
        ]);

        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching results:", error);
        res.status(500).json({ message: "Error fetching results" });
    }
}
module.exports = { addUser, getUsers, login, polling, results };
