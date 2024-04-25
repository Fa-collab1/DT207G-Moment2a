import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { initializeDatabase, WorkExperience } from './initializeDatabase';

dotenv.config(); // Detta läser min .env-fil och gör variablerna tillgängliga

const app = express();
const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGODB_URI;


// Isolerad funktion för att starta server och databasanslutning
async function startServer() {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

    if (!mongoURI) {
        console.log("MONGODB_URI is not defined.");
    }
    else
    console.log('Connecting to MongoDB...');
    try {
        await initializeDatabase();
    } catch (err) {
        console.log('Failed to connect to MongoDB');
        
    }
}

app.use(cors()); // Använder cors för att tillåta cross-origin requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Ange mapp för statiska filer
app.set("view engine", "ejs"); // Ange EJS som vy-motorn

// Valideringsfunktion för arbetserfarneheter
function validateWorkExperience(data: any): string[] {
    const errors: string[] = [];

    if (!data.companyname) errors.push("Company name is required");
    if (!data.jobtitle) errors.push("Job title is required");
    if (!data.location) errors.push("Location is required");
    if (!data.startdate) errors.push("Start date is required");
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
app.get("/get/:id?", async (req: Request, res: Response) => {
  const id = req.params.id;
  if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(401).json({ message: "A valid ID is required" });
      }
      try {
          const doc = await WorkExperience.findById(id);
          if (doc) {
              const formattedDoc = {
                  ...doc.toObject(),
                  startdate: doc.startdate.toISOString().split('T')[0],
                  enddate: doc.enddate ? doc.enddate.toISOString().split('T')[0] : null
              };
              res.status(200).json(formattedDoc);
          } else {
              res.status(404).json({ message: "Requested post not found" });
          }
      } catch (error) {
          res.status(500).json({ message: "Database error", detail: error });
      }
  } else {
      try {
          const docs = await WorkExperience.find({});
          const formattedDocs = docs.map(doc => ({
              ...doc.toObject(),
              startdate: doc.startdate.toISOString().split('T')[0],
              enddate: doc.enddate ? doc.enddate.toISOString().split('T')[0] : null
          }));
          res.status(200).json(formattedDocs);
      } catch (error) {
          res.status(500).json({ message: "Database error", detail: error });
      }
  }
});

// Route för att posta ny erfarenhet
app.post("/post", async (req: Request, res: Response) => {
    const message = validateWorkExperience(req.body);
    if (message.length > 0) {
        return res.status(400).json({ message });
    }

    try {
        const newExperience = new WorkExperience(req.body);
        const savedExperience = await newExperience.save();
        res.status(201).json({ message: "Work experience added successfully", id: savedExperience._id });
    } catch (error) {
        res.status(500).json({ message: "Database problem, request failed!", detail: error });
    }
});

// Route för att uppdatera befintlig erfarenhet
app.put("/put/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID is not valid" });
    }

    const message = validateWorkExperience(req.body);
    if (message.length > 0) {
        return res.status(400).json({ message });
    }

    try {
        const updatedExperience = await WorkExperience.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedExperience) {
            return res.status(404).json({ message: "No record found with ID " + id });
        }
        res.status(200).json({ message: "Work experience updated successfully", id: updatedExperience._id });
    } catch (error) {
        res.status(500).json({ message: "Updating the record for id " + id + " failed!", detail: error });
    }
});

// Route för att ta bort erfarenhet
app.delete("/delete/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(401).json({ message: "ID is not valid" });
    }

    try {
        const result = await WorkExperience.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: "Work experience deleted successfully" });
        } else {
            res.status(404).json({ message: "No record found with ID " + id });
        }
    } catch (error) {
        res.status(500).json({ message: "Deleting the record failed!", detail: error });
    }
});

// Route för "Index" sidan
app.get("/", (req, res) => {
    res.render("index"); // En infosida om hur API-grejerna fungerar
});

startServer(); // Starta servern och databasanslutning
