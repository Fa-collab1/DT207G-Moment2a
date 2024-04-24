"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const initializeDatabase_js_1 = require("./initializeDatabase.js"); // Importera initializeDatabase-funktionen från skriptet
dotenv_1.default.config(); // Detta läser min .env-fil och gör variablerna tillgängliga
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    throw new Error("MONGODB_URI är inte definierad i miljövariablerna.");
}
const client = new mongodb_1.MongoClient(mongoURI);
let db;
// Funktion för att ansluta till MongoDB-databasen
function connectToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log('Anslutning till MongoDB lyckades');
            db = client.db();
            yield (0, initializeDatabase_js_1.initializeDatabase)(); // Anropa initializeDatabase-funktionen för att konfigurera databasen
        }
        catch (err) {
            console.error('Misslyckades med att ansluta till MongoDB', err);
            process.exit(1);
        }
    });
}
app.use((0, cors_1.default)()); // Använder cors för att tillåta cross-origin requests
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public")); // Ange mapp för statiska filer
app.set("view engine", "ejs"); // Ange EJS som vy-motorn
// Route for getting specific or all work experiences
app.get("/get/:id?", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (id) {
        if (!mongodb_1.ObjectId.isValid(id)) {
            return res.status(401).json({ message: "ID (integer) is required" });
        }
        try {
            const doc = yield db.collection('workexperience').findOne({ _id: new mongodb_1.ObjectId(id) });
            if (doc) {
                // Convert dates to string format before sending the response
                const formattedDoc = Object.assign(Object.assign({}, doc), { startdate: doc.startdate.toISOString().split('T')[0], enddate: doc.enddate ? doc.enddate.toISOString().split('T')[0] : null });
                res.status(200).json(formattedDoc);
            }
            else {
                res.status(404).json({ message: "Requested post not found" });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Database error", detail: error });
        }
    }
    else {
        try {
            const docs = yield db.collection('workexperience').find({}).toArray();
            // Convert dates to string format before sending the response
            const formattedDocs = docs.map(doc => (Object.assign(Object.assign({}, doc), { startdate: doc.startdate.toISOString().split('T')[0], enddate: doc.enddate ? doc.enddate.toISOString().split('T')[0] : null })));
            res.status(200).json(formattedDocs);
        }
        catch (error) {
            res.status(500).json({ error: "Database error", detail: error });
        }
    }
}));
function validateWorkExperience(data) {
    const errors = [];
    if (!data.companyname)
        errors.push("Company name is required");
    if (!data.jobtitle)
        errors.push("Job title is required");
    if (!data.location)
        errors.push("Location is required");
    if (!data.startdate)
        errors.push("Start date is required");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.startdate.toISOString().split('T')[0])) {
        errors.push("Start date must be in a valid format (YYYY-MM-DD)");
    }
    // Check if enddate is not null or undefined and parse it as Date
    if (data.enddate && !(data.enddate instanceof Date)) {
        data.enddate = new Date(data.enddate);
    }
    // Check if enddate is provided and is a valid Date
    if (data.enddate && isNaN(data.enddate.getTime())) {
        errors.push("End date must be a valid date");
    }
    // Check if enddate is provided and is greater than startdate
    if (data.enddate && data.enddate <= data.startdate) {
        errors.push("End date must be greater than start date");
    }
    return errors;
}
// Route för att posta ny erfarenhet
app.post("/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const errors = validateWorkExperience(data);
    if (errors.length > 0) {
        return res.status(400).json({ error: errors });
    }
    try {
        const result = yield db.collection('workexperience').insertOne(data);
        res.status(201).json({ message: "Work experience added successfully", id: result.insertedId });
    }
    catch (error) {
        res.status(500).json({ error: "Database problem, request failed!", detail: error });
    }
}));
// Route för att uppdatera befintlig erfarenhet
app.put("/put/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const errors = validateWorkExperience(data);
    if (!mongodb_1.ObjectId.isValid(id))
        errors.push("ID (integer) is required");
    if (errors.length > 0) {
        return res.status(400).json({ error: errors });
    }
    try {
        const result = yield db.collection('workexperience').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
            $set: Object.assign(Object.assign({}, data), { startdate: new Date(data.startdate), enddate: data.enddate ? new Date(data.enddate) : null })
        });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "No record found with ID " + id });
        }
        res.status(200).json({ message: "Work experience with id " + id + " updated" });
    }
    catch (error) {
        res.status(500).json({ error: "Updating the record for id " + id + " failed!", detail: error });
    }
}));
// Route för att ta bort erfarenhet
app.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongodb_1.ObjectId.isValid(id)) {
        return res.status(401).json({ message: "ID (integer) is required" });
    }
    try {
        const result = yield db.collection('workexperience').deleteOne({ _id: new mongodb_1.ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No record found with ID " + id });
        }
        res.status(200).json({ message: "Work experience with id " + id + " deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Request failed!", detail: error });
    }
}));
// Route för "Index" sidan
app.get("/", (req, res) => {
    res.render("index"); // En infosida om hur API-grejerna fungerar
});
// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    connectToMongoDB();
});
