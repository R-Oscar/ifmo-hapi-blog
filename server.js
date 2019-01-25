require('dotenv').config();
const Hapi = require('hapi');
const api = require('./routes/api');
const DB = require('./db');
const path = require('path');
const Inert = require('inert');

const server = Hapi.server({
  host: 'localhost',
  port: process.env.PORT || 8000,
  router: {
    stripTrailingSlash: true
  },
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'dist')
    },
    cors: true
  }
});

server.route({
  method: 'GET',
  path: '/api/posts',
  handler: api.listAll
});

server.route({
  method: 'POST',
  path: '/api/posts',
  handler: api.add
});

server.route({
  method: 'GET',
  path: '/api/posts/{id}',
  handler: api.list
});

server.route({
  method: 'DELETE',
  path: '/api/posts/{id}',
  handler: api.remove
});

// Start the server
const start = async function() {
  try {
    const db = new DB(
      process.env.DB_HOST,
      process.env.DB_PORT,
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS
    );

    await db.init();

    await server.register(Inert);

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          index: true
        }
      }
    });

    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();
