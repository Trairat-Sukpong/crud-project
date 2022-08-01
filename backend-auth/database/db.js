const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lernning-express-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});