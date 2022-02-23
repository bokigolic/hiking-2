const jwt = require('jsonwebtoken');
const Glupost = require('../models/glupost-model');
const User = require('../models/user-model');
const AuthSession = require('../models/auth-session-model');


// HELPERS

const JWT_SECRET = 'NEKA_SUPER_TAJNA_STVAR';

const tokenCreate = (user_id) => {
  const token = jwt.sign(
    { user_id: user_id },
    JWT_SECRET
  );
  return token;
};


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
    console.log('authLogout resolver')
    console.log('args');
    console.log(args);
    const token = args.token;
    console.log(token);
    // mora iz baze sesija da obrise onu sa ovim tokenom
    await AuthSession.findOneAndDelete({
      token: token
    });
    return true; // izlogvan ismo
  },

  myUserData: async (args, context) => {
    console.log('myUserData resolver')
    console.log('args');
    console.log(args);
    const token = args.token;
    console.log(token);
    // sad kad smo dobili token mora da proverimo u bazi utabeli sessions da li ima taj token kao ulogovan
    const session = await AuthSession.findOne({
      token: token
    });
    console.log(session);
    if (session.user_id) {
      const user_id = session.user_id; // id korisnika koji je ulogovan
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

};

module.exports = root;