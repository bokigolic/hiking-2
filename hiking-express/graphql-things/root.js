const Glupost = require('../models/glupost-model');


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
    console.log('autgRegister resolver')
    console.log('args');
    console.log(args);
    return 'Vracamo neki odgovor od authRegister'
  }

};

module.exports = root;