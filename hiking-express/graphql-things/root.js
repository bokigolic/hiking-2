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

};

module.exports = root;