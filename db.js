const mongoose = require('mongoose');
const Category = require('./models/category');

class DB {
  constructor(host, port, name, username, password) {
    this.host = host;
    this.port = port;
    this.name = name;
    this.username = username;
    this.password = password;
  }

  async init() {
    const { host, port, name, username, password } = this;
    const dbURL = `mongodb://${username}:${password}@${host}:${port}/${name}`;
    mongoose.connect(
      dbURL,
      { useNewUrlParser: true }
    );
    mongoose.Promise = global.Promise;

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.on('open', () => {
      console.log('Connected to DB');
    });

    this.db = db;
  }

  async populateCategories() {
    const category = new Category({ _id: new mongoose.Types.ObjectId(), title: 'Animals' });
    await category.save();
    return category._id;
  }

  async getCategory() {}

  get db() {
    return this._db;
  }

  set db(db) {
    this._db = db;
  }
}

module.exports = DB;
