require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 3500;

connectDB();

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions)); // Cross Origin Resource Sharing

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use('/',express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/auth'));
app.use('/register', require('./routes/register'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use(verifyJWT);
app.use('/departments', require('./routes/api/departments'));
app.use('/employees', require('./routes/api/employees'));


app.use((req, res, next) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'), err => {
            if (err) next(err);
        });
    } else if (req.accepts('json')) {
        res.json({ 'message': 'Page Not Found' });
    } else {
        res.type('text').send('Page Not Found');
    }

})

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});
})