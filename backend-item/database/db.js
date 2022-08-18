const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lernning-express-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});