const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const { checkApiKey } = require('./middlewares/auth.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/* const whiteList = ['http://localhost:5000'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}

app.use(cors(options)); */
app.use(cors());
require('./utils/auth');
app.use('/', express.static('public'));

app.get('/prueba', checkApiKey, (req, res) => {
  res.send('Holi, soy la ruta de prueba');
});


routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port)
