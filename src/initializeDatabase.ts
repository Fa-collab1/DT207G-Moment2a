import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI:string|undefined = process.env.MONGODB_URI;


export async function initializeDatabase() {
    if (!mongoURI) {
        throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

const client = new MongoClient(mongoURI);
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db();  
        const collection = await db.listCollections({ name: 'workexperience' }, { nameOnly: true }).next();
        if (!collection) {
            console.log("Collection does not exist. Creating and inserting data...");
            const initialData = [                {
                    companyname: 'Telia Sverige AB',
                    jobtitle: 'Billing Specialist',
                    location: 'Solna, Sweden',
                    startdate: new Date('2019-06-01'),
                    description: 'EDI and complex cases and also some development/automation work.'
                },
                {
                    companyname: 'apotea.se',
                    jobtitle: 'System Developer',
                    location: 'Stockholm, Sweden',
                    startdate: new Date('2018-07-01'),
                    enddate: new Date('2018-12-31')
                },
                {
                    companyname: 'Plantvision AB',
                    jobtitle: 'System Developer',
                    location: 'Stockholm, Sweden',
                    startdate: new Date('2018-04-01'),
                    enddate: new Date('2018-06-30'),
                    description: 'Internship in education for system developers'
                },
                {
                    companyname: 'Semantix AB',
                    jobtitle: 'Group Business Controller',
                    location: 'Stockholm, Sweden',
                    startdate: new Date('2015-11-01'),
                    enddate: new Date('2017-02-28'),
                    description: 'BI analyst'
                },
                {
                    companyname: 'Semantix AB',
                    jobtitle: 'BI Analyst',
                    location: 'Stockholm, Sweden',
                    startdate: new Date('2009-08-01'),
                    enddate: new Date('2015-11-30'),
                    description: 'BI business and procurement analyst'
                },
                {
                    companyname: 'TolkJouren AB / Semantix AB',
                    jobtitle: 'Interpreter Coordinator / Business Developer / Business System Requirement Specifier',
                    location: 'Stockholm, Sweden',
                    startdate: new Date('2001-10-01'),
                    enddate: new Date('2009-08-31')
                },
                {
                    companyname: 'Stockholm City',
                    jobtitle: 'Healthcare Assistant',
                    location: 'Stockholm, Sweden',
                    startdate: new Date('2001-06-01'),
                    enddate: new Date('2004-05-31'),
                    description: 'Intermittant work while studying'
                },
                {
                    companyname: 'Linköping Municipality',
                    jobtitle: 'Healthcare Assistant',
                    location: 'Linköping, Sweden',
                    startdate: new Date('2001-01-01'),
                    enddate: new Date('2001-06-30'),
                    description: 'Intermittant work while studying'
                },
                {
                    companyname: 'Ericsson Radio Access AB - TDMA',
                    jobtitle: 'Modeling and Simulation',
                    location: 'Stockholm, Sweden',
                    startdate: new Date('2000-06-01'),
                    enddate: new Date('2000-08-31'),
                    description: 'Internship in the Master of Science in Engineering program'
                },
                {
                    companyname: 'Malung Municipality',
                    jobtitle: 'Healthcare Assistant/Teacher',
                    location: 'Malung, Sweden',
                    startdate: new Date('1997-06-01'),
                    enddate: new Date('2000-12-31'),
                    description: 'Intermittant work while studying'
                },
                {
                    companyname: 'Humle Pedagogik',
                    jobtitle: 'Mathematics Teacher',
                    location: 'Transtrand, Sweden',
                    startdate: new Date('1999-01-01'),
                    enddate: new Date('1999-06-30'),
                    description: 'Adult Education: Mathematics B + C'
                },
                {
                    companyname: 'Studieförbundet Vuxenskolan',
                    jobtitle: 'English Teacher',
                    location: 'Malung, Sweden',
                    startdate: new Date('1997-09-01'),
                    enddate: new Date('1997-12-31'),
                    description: 'Adult Education: English B'
                }
            ];
            await db.collection('workexperience').insertMany(initialData);
            console.log("Initial data inserted successfully.");
        } else {
            console.log("Collection already exists. No data was inserted.");
        }
    } catch (err) {
        console.error('An error occurred while setting up the database:', err);
    } finally {
        await client.close();
        console.log("MongoDB connection closed");
    }
}