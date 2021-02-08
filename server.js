const express = require('express');
const connectDB = require('./config/db');

const app = express();
// Connect database
connectDB();

// Middle ware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
	res.send('API Started');
});

// Routes
app.use('/api/users/', require('./routes/users'));
app.use('/api/bookings/', require('./routes/bookings'));
app.use('/api/movies/', require('./routes/movies'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
