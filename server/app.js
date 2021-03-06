require('dotenv').config();

const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
const passportConfig = require('./lib/passport');
const { errorMiddleware } = require('./middlewares/error');

const { sequelize } = require('./models');
const { seed } = require('./seeder');

sequelize
  .authenticate()
  .then(() => console.log('🚀Connection Created!'))
  .catch((err) => {
    console.log(err);
  });

process.env.IS_DEMO === 'true'
  ? sequelize.sync({ force: true }).then(() => seed())
  : sequelize.sync({ force: false });

const router = require('./routes');
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  // 개발환경에서 build.js 없으면 에러를 띄워서 조건문 처리했음..
}
app.use(passport.initialize());
passportConfig(); // strategy 등록
app.use('/api', router);
app.use((req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));

// error handler
app.use(errorMiddleware);

module.exports = app;
