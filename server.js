const express = require('express');
const connectDB = require('./config/db');

const bodyParser = require('body-parser');
const passport = require('passport');

const auth = require('./routes/api/auth')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express();

// Connect Datababase
connectDB();

// Init Middleware
app.use(express.json({extended: false}));

// Define Routes
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


// Version 1
//const mongoose = require('mongoose');

// // Passport middleware
// app.use(passport.initialize());
// // Passport Config
// require('./config/passport')(passport);

// // DB Config
// const db = require('./config/keys').mongoURI;

// // Connect to MongoDB
// mongoose
//     .connect(db)
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log('Error ', err));

// // Use Routes
// app.use('/api/users', users);
// app.use('/api/profile/', profile);
// app.use('/api/posts', posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

