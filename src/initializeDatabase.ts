import dotenv from 'dotenv';
import mongoose, { Schema } from 'mongoose';

dotenv.config();

const workExperienceSchema = new Schema({
    companyname: { type: String, required: true },
    jobtitle: { type: String, required: true },
    location: { type: String, required: true },
    startdate: { type: Date, required: true },
    enddate: { type: Date },
    description: { type: String }
});
const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);

let mongoURI:string ="";
if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI is not defined.");
}
else {

mongoURI = process.env.MONGODB_URI;
}

async function initializeDatabase() {
    if (mongoURI.length===0) {
        console.log("MONGODB_URI is not defined.");
        return;
    }
    console.log('mongoURI: ', mongoURI);
    await mongoose.connect(mongoURI);
    console.log('connection to MongoDB succeeded.');
    await insertInitialData();
}


async function insertInitialData() {
    // Kontrollerar om det redan finns några poster
    const exists: number = await WorkExperience.countDocuments();
    if (exists === 0) { // Endast lägga till initialdata om det inte finns några poster
        const initialData = [
        // Objekt för initial data
        

        {
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

    await WorkExperience.insertMany(initialData);
    console.log("Initial data har lagts till framgångsrikt.");
} else {
    console.log("Initial data finns redan, inga nya poster tillagda.");
}
}



export { WorkExperience, initializeDatabase };