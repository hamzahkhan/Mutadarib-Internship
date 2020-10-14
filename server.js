const express = require('express')
const connectDB = require('./config/db');
const app = express();
// Connect Database
connectDB();


// Init Middleware
app.use(express.json());




app.get('/', (req,res) => res.send('API Running'))
app.use('/api/company', require('./routes/api/company'));
app.use('/api/postings', require('./routes/api/postings'));
app.use('/api/users', require('./routes/api/user'));





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));