const mongoose = require('mongoose');
require('dotenv').config();

const Race = require('../models/Race.model');

const races = [
  {
    name: 'Formula 1 Gulf Air Bahrain Grand Prix',
    circuitName: 'Bahrain International Circuit',
    laps: 57,
    circuitLength: '5,412 km',
    lapRecord: '1:31:447 by Pedro de la Rosa (2005)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Bahrain_Circuit.png.transform/4col/image.png'
  },
  {
    name: "Formula 1 Pirelli Gran Premio Del Made In Italy E Dell'emilia Romagna",
    circuitName: 'Autodromo Enzo e Dino Ferrari',
    laps: 63,
    circuitLength: '4,909 km',
    lapRecord: '1:15.484 by Lewis Hamilton (2020)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Emilia_Romagna_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 Heineken Grandee Prémio de Portugal',
    circuitName: 'Autódromo  Internacional do Algarve',
    laps: 66,
    circuitLength: '4,653 km',
    lapRecord: '1:18.750 by Lewis Hamilton (2020)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Portugal_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 Aramco Gran Premio de España',
    circuitName: 'Circuit de Barcelona-Catalunya',
    laps: 66,
    circuitLength: '4,675 km',
    lapRecord: '1:18.149 by Max Verstappen (2021)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Spain_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 Grand Prix de Monaco',
    circuitName: 'Circuit de Monaco',
    laps: 78,
    circuitLength: '3,337 km',
    lapRecord: '1:12.909 by Lewis Hamilton (2021)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Monoco_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 Azerbaijan Grand Prix',
    circuitName: 'Baku City Circuit',
    laps: 51,
    circuitLength: '6,003 km',
    lapRecord: '1:43.009 by Charles Leclerc (2019)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Baku_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 Emirates Grand Prix de France',
    circuitName: 'Circuit Paul Ricard',
    laps: 53,
    circuitLength: '5,842 km',
    lapRecord: '1:32.740 by Sebastian Vettel (2019)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/France_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 BWT Grosser Preis Der Steiermark',
    circuitName: 'Red Bull Ring',
    laps: 71,
    circuitLength: '4,318 km',
    lapRecord: '1:05.619 by Carlos Sainz (2020)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Styria_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 BWT Grosser Preis Von Österreich',
    circuitName: 'Red Bull Ring',
    laps: 71,
    circuitLength: '4,138 km',
    lapRecord: '1:05.619 by Carlos Sainz (2020)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Austria_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 Pirelli British Grand Prix',
    circuitName: 'Silverstone Circuit',
    laps: 52,
    circuitLength: '5,891 km',
    lapRecord: '1:27.097 by Max Verstappen (2020)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Great_Britain_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 Rolex Magyar Nagydíj',
    circuitName: 'Hungaroring',
    laps: 70,
    circuitLength: '4,381 km',
    lapRecord: '1:16.627 by Lewis Hamilton (2020)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Hungary_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 Rolex Belgian Grand Prix',
    circuitName: 'Circuit de Spa-Francorchamps',
    laps: 44,
    circuitLength: '7,004 km',
    lapRecord: '1:46.286 by Valtteri Bottas (2018)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Belgium_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 Heineken Dutch Grand Prix',
    circuitName: 'Circuit Zandvoort',
    laps: 72,
    circuitLength: '4,259 km',
    lapRecord: '1:11.097 by Lewis Hamilton',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Netherlands_Circuit.png.transform/4col/image.png'
  },
  {
    name: "Formula 1 Heineken Gran Premio D'Italia",
    circuitName: 'Autodromo Nazionale Monza',
    laps: 53,
    circuitLength: '5,793 km',
    lapRecord: '1:21.046 by Rubens Barrichello (2004)',
    imageUrl:  'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Italy_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 VTB Russian Grand Prix',
    circuitName: 'Sochi Autodrom',
    laps: 53,
    circuitLength: '5,848 km',
    lapRecord: '1:35.761 by Lewis Hamilton (2019)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Russia_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 Rolex Turkish Grand Prix',
    circuitName: 'Intercity Istanbul Park',
    laps: 58,
    circuitLength: '5,338 km',
    lapRecord: '1:24.770 by Juan Pablo Montoya (2005)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Turkey_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 Aramco United States Grand Prix',
    circuitName: 'Circuit of The Americas',
    laps: 56,
    circuitLength: '5,513 km',
    lapRecord: '1:36.169 by Charles Leclerc (2019)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/USA_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 Gran Premio de la Ciudad de México',
    circuitName: 'Autódromo Hermanos Rodríguez',
    laps: 71,
    circuitLength: '4,304 km',
    lapRecord: '1:17.774 by Valtteri Bottas (2021)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Mexico_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 Heineken Grande Prêmio de São Paulo',
    circuitName: 'Autódromo José Carlos Pace',
    laps: 71,
    circuitLength: '4,309 km',
    lapRecord: '1:10.540 by Valtteri Bottas (2018)',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Brazil_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 Ooredoo Qatar Grand Prix',
    circuitName: 'Losail International Circuit',
    laps: 57,
    circuitLength: '5,38 km',
    lapRecord: '',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Qatar_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 stc Saudi Arabian Grand Prix',
    circuitName: 'Jeddah Corniche Circuit',
    laps: 50,
    circuitLength: '6,174 km',
    lapRecord: 'Not established yet',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Saudi_Arabia_Circuit.png.transform/4col/image.png'
  },
  {
    name: 'Formula 1 Etihad Airways Abu Dhabi Grand Prix',
    circuitName: 'Yas Marina Circuit',
    laps: 58,
    circuitLength: '5,281 km',
    lapRecord: 'Not established yet',
    imageUrl: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Abu_Dhabi_Circuit.png.transform/4col/image.png'
  },
];

const MONGODB_URI = process.env.MONGODB_URI

const connectToMongo = async () =>  {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to Mongo');
  } catch (err) {
    console.log('Error connecting to Mongo: ', err);
  };
};
connectToMongo();

const racesCreate = async () => {
  try {
    await Race.create(races);
    await mongoose.connection.close();
  } catch (err) {
    console.log('ERROR: ', err);
  };
};
racesCreate();