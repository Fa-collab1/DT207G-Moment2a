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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const initializeDatabase_1 = require("./initializeDatabase");
dotenv_1.default.config(); // Detta läser min .env-fil och gör variablerna tillgängliga
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGODB_URI;
// Isolerad funktion för att starta server och databasanslutning
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
        if (!mongoURI) {
            console.log("MONGODB_URI is not defined.");
        }
        else
            try {
                yield (0, initializeDatabase_1.initializeDatabase)();
            }
            catch (err) {
                console.log('Failed to connect to MongoDB');
                process.exit(1);
            }
    });
}
app.use((0, cors_1.default)()); // Använder cors för att tillåta cross-origin requests
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public")); // Ange mapp för statiska filer
app.set("view engine", "ejs"); // Ange EJS som vy-motorn
// Valideringsfunktion för arbetserfarneheter
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
    if (data.startdate && !/^\d{4}-\d{2}-\d{2}$/.test(data.startdate)) {
        errors.push("Start date must be in a valid format (YYYY-MM-DD)");
    }
    if (data.enddate && new Date(data.enddate).toString() === "Invalid Date") {
        errors.push("End date must be a valid date");
    }
    if (data.enddate && new Date(data.enddate) < new Date(data.startdate)) {
        errors.push("End date must be greater than or equal to start date");
    }
    return errors;
}
// Route för att hämta alla erfarenheter eller en specifik erfarenhet
app.get("/get/:id?", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (id) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(401).json({ message: "A valid ID is required" });
        }
        try {
            const doc = yield initializeDatabase_1.WorkExperience.findById(id);
            if (doc) {
                const formattedDoc = Object.assign(Object.assign({}, doc.toObject()), { startdate: doc.startdate.toISOString().split('T')[0], enddate: doc.enddate ? doc.enddate.toISOString().split('T')[0] : null });
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
            const docs = yield initializeDatabase_1.WorkExperience.find({});
            const formattedDocs = docs.map(doc => (Object.assign(Object.assign({}, doc.toObject()), { startdate: doc.startdate.toISOString().split('T')[0], enddate: doc.enddate ? doc.enddate.toISOString().split('T')[0] : null })));
            res.status(200).json(formattedDocs);
        }
        catch (error) {
            res.status(500).json({ error: "Database error", detail: error });
        }
    }
}));
// Route för att posta ny erfarenhet
app.post("/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validateWorkExperience(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    try {
        const newExperience = new initializeDatabase_1.WorkExperience(req.body);
        const savedExperience = yield newExperience.save();
        res.status(201).json({ message: "Work experience added successfully", id: savedExperience._id });
    }
    catch (error) {
        res.status(500).json({ error: "Database problem, request failed!", detail: error });
    }
}));
// Route för att uppdatera befintlig erfarenhet
app.put("/put/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID is not valid" });
    }
    const errors = validateWorkExperience(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    try {
        const updatedExperience = yield initializeDatabase_1.WorkExperience.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedExperience) {
            return res.status(404).json({ message: "No record found with ID " + id });
        }
        res.status(200).json({ message: "Work experience updated successfully", id: updatedExperience._id });
    }
    catch (error) {
        res.status(500).json({ error: "Updating the record for id " + id + " failed!", detail: error });
    }
}));
// Route för att ta bort erfarenhet
app.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(401).json({ message: "ID is not valid" });
    }
    try {
        const result = yield initializeDatabase_1.WorkExperience.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: "Work experience deleted successfully" });
        }
        else {
            res.status(404).json({ message: "No record found with ID " + id });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Deleting the record failed!", detail: error });
    }
}));
// Route för "Index" sidan
app.get("/", (req, res) => {
    res.render("index"); // En infosida om hur API-grejerna fungerar
});
startServer(); // Starta servern och databasanslutning
