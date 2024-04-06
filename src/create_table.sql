DO $$
BEGIN
    -- Kontrollerar om tabellen workexperience redan finns
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'workexperience') THEN
        CREATE TABLE workexperience (
            id SERIAL PRIMARY KEY,
            companyname VARCHAR(255) NOT NULL,
            jobtitle VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            startdate DATE,
            enddate DATE,
            description TEXT
        );

        -- Infogar exempeldata i den nyskapade tabellen
        INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) 
        VALUES 
            ('Telia', 'Billing Specialist', 'Solna', '2019-06-01', NULL, 'EDI and complex cases and also some development/automation work.'),
            ('apotea.se', 'Systemutvecklare', 'Stockholm', '2018-07-01', '2018-12-31', NULL),
            ('Plantvision AB', 'systemutvecklare', 'Stockholm', '2018-04-01', '2018-06-30', 'Praktik inom utbildning till systemutvecklare'),
            ('Semantix AB', 'Group Business Controller', 'Stockholm', '2015-11-01', '2017-02-28', 'BI analytiker'),
            ('Semantix AB', 'BI analytiker', 'Stockholm', '2009-08-01', '2015-11-30', 'BI business and procurement analyst'),
            ('Semantix AB / TolkJouren', 'Tolkförmedlare / verksamhetsutvecklare / affärssystemskravställare', 'Stockholm', '2001-10-01', '2009-08-31', NULL),
            ('Stockholms stad', 'Vårdbiträde', 'Stockholm', '2001-06-01', '2004-05-31', NULL),
            ('Linköpings kommun', 'Vårdbiträde', 'Linköping', '2001-01-01', '2001-06-30', NULL),
            ('Ericsson Radio Access AB - TDMA', 'Modellering och simulering', 'Stockholm', '2000-06-01', '2000-08-31', 'praktik inom civ.ing.utb.'),
            ('Malungs kommun', 'Vårdbiträde/lärare', 'Malung', '1997-06-01', '2000-12-31', 'vikarie vid behov'),
            ('Humle Pedagogik', 'Lärare i matematik', 'Transtrand', '1999-01-01', '1999-06-30', 'Komvux: Matematik B + C'),
            ('Studieförbundet Vuxenskolan', 'Lärare i engelska', 'Malung', '1997-09-01', '1997-12-31', 'Komvux: Engelska B');
    END IF;
END $$;