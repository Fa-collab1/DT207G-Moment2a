import express, { Request, Response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './initializeDatabase.js'; // Importera initializeDatabase-funktionen från skriptet
import { WorkExperience } from './initializeDatabase.js'; // Importera initializeDatabase-funktionen från skriptet


dotenv.config(); // Detta läser min .env-fil och gör variablerna tillgängliga

const app = express();
const port = process.env.PORT || 3001;

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    throw new Error("MONGODB_URI är inte definierad i miljövariablerna.");
}

const client = new MongoClient(mongoURI);
let db: any;

// Funktion för att ansluta till MongoDB-databasen
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Anslutning till MongoDB lyckades');
        db = client.db();
        await initializeDatabase(); // Anropa initializeDatabase-funktionen för att konfigurera databasen
    } catch (err) {
        console.error('Misslyckades med att ansluta till MongoDB', err);
        process.exit(1);
    }
}

app.use(cors()); // Använder cors för att tillåta cross-origin requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Ange mapp för statiska filer
app.set("view engine", "ejs"); // Ange EJS som vy-motorn

// Route för att hämta alla erfarenheter eller en specifik erfarenhet
app.get("/get/:id?", async (req: Request, res: Response) => {
  const id = req.params.id;
  if (id) {
      if (!ObjectId.isValid(id)) {
          return res.status(401).json({ message: "A valid ID is required" });
      }
      try {
          const doc: WorkExperience | null = await db.collection('workexperience').findOne({ _id: new ObjectId(id) });
          if (doc) {
              // konverterar datum till strängformat innan svaret skickas
              const formattedDoc = {
                  ...doc,
                  startdate: doc.startdate.toISOString().split('T')[0],
                  enddate: doc.enddate ? doc.enddate.toISOString().split('T')[0] : null
              };
              res.status(200).json(formattedDoc);
          } else {
              res.status(404).json({ message: "Requested post not found" });
          }
      } catch (error) {
          res.status(500).json({ error: "Database error", detail: error });
      }
  } else {
      try {
          const docs: WorkExperience[] = await db.collection('workexperience').find({}).toArray();
          // konverterar datum till strängformat innan svaret skickas
          const formattedDocs = docs.map(doc => ({
              ...doc,
              startdate: doc.startdate.toISOString().split('T')[0],
              enddate: doc.enddate ? doc.enddate.toISOString().split('T')[0] : null
          }));
          res.status(200).json(formattedDocs);
      } catch (error) {
          res.status(500).json({ error: "Database error", detail: error });
      }
  }
});



function validateWorkExperience(data: WorkExperience): string[] {
  const errors: string[] = [];

  if (!data.companyname) errors.push("Company name is required");
  if (!data.jobtitle) errors.push("Job title is required");
  if (!data.location) errors.push("Location is required");
  if (!data.startdate) errors.push("Start date is required");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.startdate.toISOString().split('T')[0])) {
      errors.push("Start date must be in a valid format (YYYY-MM-DD)");
  }
  // kontrollera om enddate är tillgängligt och inte redan är ett Date-objekt
  if (data.enddate && !(data.enddate instanceof Date)) {
      data.enddate = new Date(data.enddate);
  }
  // kontrollera om enddate är tillgängligt och inte är ett giltigt datum
  if (data.enddate && isNaN(data.enddate.getTime())) {
      errors.push("End date must be a valid date");
  }
  // kontrollera om enddate är tillgängligt och är mindre än startdate
  if (data.enddate && data.enddate < data.startdate) {
      errors.push("End date must be greater than or equal to start date");
  }

  return errors;
}


// Route för att posta ny erfarenhet
app.post("/post", async (req: Request, res: Response) => {
    const data: WorkExperience = req.body;
    const errors: string[] = validateWorkExperience(data);

    if (errors.length > 0) {
        return res.status(400).json({ error: errors });
    }

    try {
        const result = await db.collection('workexperience').insertOne(data);
        res.status(201).json({ message: "Work experience added successfully", id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: "Database problem, request failed!", detail: error });
    }
});

// Route för att uppdatera befintlig erfarenhet
app.put("/put/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const data: WorkExperience = req.body;
    const errors: string[] = validateWorkExperience(data);

    if (!ObjectId.isValid(id)) errors.push("ID is not valid");

    if (errors.length > 0) {
        return res.status(400).json({ error: errors });
    }

    try {
        const result = await db.collection('workexperience').updateOne({ _id: new ObjectId(id) }, {
            $set: {
                ...data,
                startdate: new Date(data.startdate),
                enddate: data.enddate ? new Date(data.enddate) : null
            }
        });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "No record found with ID " + id });
        }
        res.status(200).json({ message: "Work experience with id " + id + " updated" });
    } catch (error) {
        res.status(500).json({ error: "Updating the record for id " + id + " failed!", detail: error });
    }
});

// Route för att ta bort erfarenhet
app.delete("/delete/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(401).json({ message: "ID is not valid" });
    }

    try {
        const result = await db.collection('workexperience').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No record found with ID " + id });
        }
        res.status(200).json({ message: "Work experience with id " + id + " deleted" });
    } catch (error) {
        res.status(500).json({ error: "Request failed!", detail: error });
    }
});

// Route för "Index" sidan
app.get("/", (req: any, res: any) => {
    res.render("index"); // En infosida om hur API-grejerna fungerar
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    connectToMongoDB();
});
