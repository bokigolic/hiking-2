const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const Glupost = require('../models/glupost-model');
const User = require('../models/user-model');
const AuthSession = require('../models/auth-session-model');
const Tour = require('../models/tour-model');
const Review = require('../models/review-model');
const Participation = require('../models/participation-model');


// HELPERS

// const JWT_SECRET = 'NEKA_SUPER_TAJNA_STVAR'; // sad ga uzimamo iz config fajla

const tokenCreate = (user_id) => {
  // create jsonwebtoken token
  const token = jwt.sign(
    { user_id: user_id },
    config.JWT_SECRET
  );
  return token;
};

const checkIsLoggedIn = async (token) => {
  // If context is not provided, the request object is passed as the context.
  console.log('checkIsLoggedIn helper');
  console.log(token);
  let is_logged_in = false;
  let user_id = null;
  // sad kad smo dobili token mora da proverimo u bazi utabeli sessions da li ima taj token kao ulogovan
  const session = await AuthSession.findOne({
    token: token
  });
  console.log(session);
  if (session.user_id) {
    user_id = session.user_id; // id korisnika koji je ulogovan
    is_logged_in = true;
  }
  return {
    is_logged_in,
    user_id
  };
}


// GRAPPHQL RESOLVERS (u hraphql resolveri se zovu funkcije koje formiraju odgovore na pitanja)
var root = {

  hello: () => {
    return 'Hello world!';
  },

  random: () => {
    return Math.random();
  },

  testContext: (args, context) => {
    console.log('testContext(args, context) If context is not provided, the request object is passed as the context.');
    // If context is not provided, the request object is passed as the context.
    console.log('context');
    console.log(context);
    console.log('context.headers');
    console.log(context.headers);
    console.log('args');
    console.log(args);
    return 'We just tested arguments for resolver';
  },

  napraviGlupost: async () => {
    // proba uspisa necega u mongo bazu
    const results = await Glupost.create({
      nesto: 'blabla',
      nesto2: 'cicaglisa'
    });

    console.log(results)

    return 'Kreiranje glupost i mongo bazu uspelo!';
  },

  authRegister: async (args, context) => {
    console.log('authRegister resolver')
    console.log('args');
    console.log(args);
    // sad kad smo primili argumente sad imamo sve sto treba za upis u bazu
    if (args.password === args.password2) {
      // proba uspisa necega u mongo bazu
      const results = await User.create({
        username: args.username,
        password: args.password
      });
      console.log(results); // rezultat koji vraca mongo baza
      return 'Vracamo neki odgovor od authRegister'
    } else {
      return 'Error: registracija nije uspela password i password2 se razlikuju'
    }
  },


  authLogin: async (args, context) => {
    console.log('authLogin resolver')
    console.log('args');
    console.log(args);

    // najpre provera dali u bazu u tabeli users ima korisnik sa istim username i password
    const results = await User.findOne({
      username: args.username,
      password: args.password
    });
    console.log(results); // ako ne pronadje korisnika onda je null
    if (results && results._id) {
      const user_id = results._id;
      console.log('user_id', user_id);
      const token = tokenCreate(user_id);
      console.log('token', token);
      // sad mora da upisemo token u sessions
      await AuthSession.create({
        user_id: user_id,
        token: token
      });
      // return token;
      return token;
    } else {
      return 'Zao nam je ovo nije token. Korisnik sa tim username i password ne postoji :('
    }
  },


  authLogout: async (args, context) => {
    // If context is not provided, the request object is passed as the context.
    console.log('authLogout resolver')
    // console.log('args');
    // console.log(args);
    // const token = args.token;
    // console.log(token);
    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];
    // const token = args.token;
    console.log(token);
    // mora iz baze sesija da obrise onu sa ovim tokenom
    await AuthSession.findOneAndDelete({
      token: token
    });
    return true; // izlogvan ismo
  },


  myUserData: async (args, context) => {
    // If context is not provided, the request object is passed as the context.
    console.log('myUserData resolver');
    console.log('args');
    console.log(args);
    // console.log('context');
    // console.log(context);
    const req = context;
    // console.log(req.headers); 
    const token = req.headers[config.TOKEN_HEADER_KEY];
    // const token = args.token;
    console.log(token);
    // sad kad smo dobili token mora da proverimo u bazi utabeli sessions da li ima taj token kao ulogovan
    /*
    const session = await AuthSession.findOne({
      token: token
    });
    console.log(session);
    */
    const auth = await checkIsLoggedIn(token); // zovemo helper daproveri da li je sa tim tokenom korinik ulogovan i koji je to korisnik
    if (auth.is_logged_in) {
      const user_id = auth.user_id; // id korisnika koji je ulogovan
      // jos jedan potez u bazi
      // const user = // NASTAVITI OVDE DA SE UZME TAJ KORINIK IZ BAZE
      // PA ZATIM DA SE PRIPREMI ODGOVOR ZA FRONTEND I POAALJE...
      const user = await User.findOne({
        _id: user_id,
      });
      console.log(user);
      if (user && user._id && user.username) {
        // uspesno pronadjen ulogovan ikorisnik
        return {
          _id: user._id,
          is_success: true,
          username: user.username,
        };
      }
    }
  },


  tourCreate: async (args, context) => {
    console.log('tourCreate resolver');
    // If context is not provided, the request object is passed as the context.
    console.log('args');
    console.log(args);
    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];
    console.log(token);
    const auth = await checkIsLoggedIn(token);
    if (auth.is_logged_in) {
      // ulogovani smo, sad mozemo da kreiramo turu
      const user_id = auth.user_id;
      // sad u bazi kreiramo turu
      const results = await Tour.create({
        user_id: user_id,
        name: args.name,
        description: args.description,
        date: args.date,
        difficulty: args.difficulty,
        trail_length: args.trail_length,
        max_participants: args.max_participants
      });
      console.log(results);
      return true;
    } else {
      // ako nismo ulogvani necemo ni da kreiramo turu
      return false;
    }
  },


  tourUpdate: async (args, context) => {
    console.log('tourUpdate resolver');
    // If context is not provided, the request object is passed as the context.
    console.log('args');
    console.log(args);
    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];
    console.log(token);
    const auth = await checkIsLoggedIn(token);
    if (auth.is_logged_in) {
      // ulogovani smo, sad mozemo da kreiramo turu
      const user_id = auth.user_id;
      // sad u bazi kreiramo turu
      const results = await Tour.findOneAndUpdate({
        _id: args.tour_id,
        user_id: user_id
      }, {
        // user_id: user_id,
        name: args.name,
        description: args.description,
        date: args.date,
        difficulty: args.difficulty,
        trail_length: args.trail_length,
        max_participants: args.max_participants
      });
      console.log(results);
      return true;
    } else {
      // ako nismo ulogvani necemo ni da kreiramo turu
      return false;
    }
  },


  tourDelete: async (args, context) => {
    console.log('tourDelete resolver');
    // If context is not provided, the request object is passed as the context.
    console.log('args');
    console.log(args);
    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];
    console.log(token);
    const auth = await checkIsLoggedIn(token);
    if (auth.is_logged_in) {
      // ulogovani smo, sad mozemo da kreiramo turu
      const user_id = auth.user_id;
      // sad u bazi kreiramo turu
      const results = await Tour.findOneAndDelete({
        _id: args.tour_id,
        user_id: user_id
      });
      // TODO: ne sme da obrise nista cak i ako id ne valja
      console.log('mongoose results');
      console.log(results);
      return true;
    } else {
      // ako nismo ulogvani necemo ni da kreiramo turu
      return false;
    }
  },


  tourGetAll: async (args, context) => {
    console.log('tourGetAll resolver');
    // NAPOMENA obo je PUBLIC API i ne proveravamo token
    const results = await Tour.find({}); // cita iz baze sve iz tabele tour
    return results;
  },


  tourJoin: async (args, context) => {
    console.log('tourJoin resolver');
    // If context is not provided, the request object is passed as the context.
    console.log('args');
    console.log(args);
    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];
    console.log(token);
    const auth = await checkIsLoggedIn(token);
    if (auth.is_logged_in) {
      // ulogovani smo, sad mozemo da kreiramo turu
      const user_id = auth.user_id;
      // sad u bazi upisujumo participate odnosno joinovanje ture
      const results = Participation.create({
        user_id: user_id,
        tour_id: args.tour_id,
      });
      console.log(results);
      return true;
    } else {
      // ako nismo ulogvani necemo ni da kreiramo turu
      return false;
    }
  },


  reviewCreate: async (args, context) => {
    console.log('reviewCreate resolver');
    // If context is not provided, the request object is passed as the context.
    console.log('args');
    console.log(args);
    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];
    console.log(token);
    const auth = await checkIsLoggedIn(token);
    if (auth.is_logged_in) {
      // ulogovani smo, sad mozemo da kreiramo turu
      const user_id = auth.user_id;
      // sad u bazi kreiramo turu
      const results = await Review.create({
        user_id: user_id,
        tour_id: args.tour_id,
        rating: args.rating,
        text: args.text
      });
      console.log(results);
      return true;
    } else {
      // ako nismo ulogvani necemo ni da kreiramo turu
      return false;
    }
  },


  reviewGetAll: async (args, context) => {
    console.log('reviewGetAll resolver');
    // NAPOMENA obo je PUBLIC API i ne proveravamo token
    const results = await Review.find({}); // cita iz baze sve iz tabele review
    return results;
  },


  userProfileGet: async (args, context) => {
    console.log('userProfileGet resolver');
    // NAPOMENA obo je PUBLIC API i ne proveravamo token
    const results = await User.findOne({
      _id: args.user_id
    }); // cita iz baze sve iz tabele review
    return results;
  },


};

module.exports = root;