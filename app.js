const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.json());

const postsRoute = require('./routes/posts');
const interactionsRoute = require('./routes/interactions');
const authRoute = require('./routes/auth');

app.use('/api/posts', postsRoute);
app.use('/api/user',authRoute)
app.use('/api/interactions', interactionsRoute);

app.get('/', (req, res) => {
    res.send('Homepage');
});

// Replace <password> with your actual password
const mongoConnectionString = "mongodb+srv://ayubhersi34:S0malia123@cluster0.itmlt35.mongodb.net/piazza?retryWrites=true&w=majority";

mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB is now connected!');
        app.listen(3000, () => {
            console.log('Server is up and running on port 3000...');
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
