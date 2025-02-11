const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");
const cors = require("cors");
import { fileURLToPath } from "url";

const index = express();
index.use(express.json());
index.use(cors());
index.use(express.urlencoded({ extended: true }));

index.use(express.static(path.join(__dirname, "public")));


// const url = "mongodb://localhost:27017/";
const dbconnect = new MongoClient(process.env.MONGODB_URI);
// const dbconnect = new MongoClient(url);
let tasksCollection = null;

function getUsername(req) {
    return req.headers["x-username"];
}

async function run() {
    await dbconnect.connect();
    console.log("✅ Connected to MongoDB!");

    const db = dbconnect.db("cs4241");
    tasksCollection = db.collection("tasks");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    if (process.env.NODE_ENV === "production") {
        index.use(express.static(path.join(__dirname, "../public")));

        index.get("*", (req, res) => {
            return res.sendFile(path.join(__dirname, "../public/index.html"));
        });
    }

    index.get('/api/data', async (req, res) => {
        const username = getUsername(req);
        const userTasks = await tasksCollection.find({ username: username }).toArray();
        res.json(userTasks);
    });

    index.post('/api/data', async (req, res) => {
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

    index.put('/api/update/:id', async (req, res) => {
        const { id } = req.params;
        const updatedTask = { task: req.body.task, deadline_date: req.body.deadline_date };
        const result = await tasksCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedTask });
        res.json({ message: "Task updated successfully!", modifiedCount: result.modifiedCount });
    });

    index.delete('/api/data/:id', async (req, res) => {
        const { id } = req.params;
        const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
        res.json({ message: "Task deleted successfully!", deletedCount: result.deletedCount });
    });
}

run().catch(console.error);
// module.exports = index;
const port = process.env.PORT || 3000;
index.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});
