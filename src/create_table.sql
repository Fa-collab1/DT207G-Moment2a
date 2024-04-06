DO $$
BEGIN
    -- Kontrollerar om tabellen workexperience redan finns
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'workexperience') THEN
        CREATE TABLE workexperience (
            id SERIAL PRIMARY KEY,
            companyname VARCHAR(255) NOT NULL,
            jobtitle VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            startdate DATE NOT NULL,
            enddate DATE,
            description TEXT
        );

        -- Infogar exempeldata i den nyskapade tabellen
        INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) 
        VALUES 
            ('Telia Sverige AB', 'Billing Specialist', 'Solna, Sweden', '2019-06-01', NULL, 'EDI and complex cases and also some development/automation work.'),
            ('apotea.se', 'System Developer', 'Stockholm, Sweden', '2018-07-01', '2018-12-31', NULL),
            ('Plantvision AB', 'System Developer', 'Stockholm, Sweden', '2018-04-01', '2018-06-30', 'Internship in education for system developers'),
            ('Semantix AB', 'Group Business Controller', 'Stockholm, Sweden', '2015-11-01', '2017-02-28', 'BI analyst'),
            ('Semantix AB', 'BI Analyst', 'Stockholm, Sweden', '2009-08-01', '2015-11-30', 'BI business and procurement analyst'),
            ('TolkJouren AB / Semantix AB', 'Interpreter Coordinator / Business Developer / Business System Requirement Specifier', 'Stockholm, Sweden', '2001-10-01', '2009-08-31', NULL),
            ('Stockholm City', 'Healthcare Assistant', 'Stockholm, Sweden', '2001-06-01', '2004-05-31', 'Intermittant work while studying'),
            ('Linköping Municipality', 'Healthcare Assistant', 'Linköping, Sweden', '2001-01-01', '2001-06-30', 'Intermittant work while studying'),
            ('Ericsson Radio Access AB - TDMA', 'Modeling and Simulation', 'Stockholm, Sweden', '2000-06-01', '2000-08-31', 'Internship in the Master of Science in Engineering program'),
            ('Malung Municipality', 'Healthcare Assistant/Teacher', 'Malung, Sweden', '1997-06-01', '2000-12-31', 'Intermittant work while studying'),
            ('Humle Pedagogik', 'Mathematics Teacher', 'Transtrand, Sweden', '1999-01-01', '1999-06-30', 'Adult Education: Mathematics B + C'),
            ('Studieförbundet Vuxenskolan', 'English Teacher', 'Malung, Sweden', '1997-09-01', '1997-12-31', 'Adult Education: English B');
    END IF;
END $$;