const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// const url = "mongodb://localhost:27017/";
const dbconnect = new MongoClient(process.env.MONGO_URI);
let tasksCollection = null;

function getUsername(req) {
    return req.headers["x-username"];
}

async function run() {
    try {
        await dbconnect.connect();
        console.log("✅ Connected to MongoDB!");

        const db = dbconnect.db("cs4241");
        tasksCollection = db.collection("tasks");

        app.get('/data', async (req, res) => {
            const username = getUsername(req);
            const userTasks = await tasksCollection.find({ username: username }).toArray();
            res.json(userTasks);
        });

        app.post('/data', async (req, res) => {
            const username = getUsername(req);
            const creationDate = new Date().toISOString().split('T')[0];
            const deadlineDate = req.body.deadline_date;
            const plannedDuration = Math.ceil((new Date(deadlineDate) - new Date(creationDate)) / (1000 * 60 * 60 * 24));

            const newTask = {
                username: username,
                task: req.body.task,
                priority: req.body.priority,
                creation_date: creationDate,
                deadline_date: deadlineDate,
                planned_duration: plannedDuration
            };

            const result = await tasksCollection.insertOne(newTask);
            res.json({ message: "Task added successfully!", insertedId: result.insertedId });
        });

        app.put('/update/:id', async (req, res) => {
            const { id } = req.params;
            const updatedTask = { task: req.body.task, deadline_date: req.body.deadline_date };
            const result = await tasksCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedTask });
            res.json({ message: "Task updated successfully!", modifiedCount: result.modifiedCount });
        });

        app.delete('/data/:id', async (req, res) => {
            const { id } = req.params;
            const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
            res.json({ message: "Task deleted successfully!", deletedCount: result.deletedCount });
        });

        // ✅ Start server after DB connection
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
    }
}

run();
