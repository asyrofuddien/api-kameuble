var mongoose = require('mongoose');
//add database
mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, {
  useNewUrlParser: true,
  //   useFindAndModify: false,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
  console.log('Connection with database succeeded. ✔️');
});
