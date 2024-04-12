const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/User');

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));
  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use('/user', userRoutes);


app.use(errorController.get404);

sequelize.sync().then((result) => {
    // console.log(result);
    app.listen(3000);
}).catch(err => console.log(err));
