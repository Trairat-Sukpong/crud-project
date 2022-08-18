const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/lernning-express-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});