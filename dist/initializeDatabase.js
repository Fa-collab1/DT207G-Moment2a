"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.initializeDatabase = exports.WorkExperience = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importStar(require("mongoose"));
dotenv_1.default.config();
if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI är inte definierad i miljövariablerna.");
}
const mongoURI = process.env.MONGODB_URI;
const workExperienceSchema = new mongoose_1.Schema({
    companyname: { type: String, required: true },
    jobtitle: { type: String, required: true },
    location: { type: String, required: true },
    startdate: { type: Date, required: true },
    enddate: { type: Date },
    description: { type: String }
});
const WorkExperience = mongoose_1.default.model('WorkExperience', workExperienceSchema);
exports.WorkExperience = WorkExperience;
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(mongoURI);
        console.log('Anslutning till MongoDB lyckades');
        yield insertInitialData();
    });
}
exports.initializeDatabase = initializeDatabase;
function insertInitialData() {
    return __awaiter(this, void 0, void 0, function* () {
        // Kontrollerar om det redan finns några poster
        const exists = yield WorkExperience.countDocuments();
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
            yield WorkExperience.insertMany(initialData);
            console.log("Initial data har lagts till framgångsrikt.");
        }
        else {
            console.log("Initial data finns redan, inga nya poster tillagda.");
        }
    });
}
