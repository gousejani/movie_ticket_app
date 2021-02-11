const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
// Connect database
connectDB();

// Middle ware
app.use(express.json({ extended: false }));

// Routes
app.use('/api/users/', require('./routes/users'));
app.use('/api/bookings/', require('./routes/bookings'));
app.use('/api/movies/', require('./routes/movies'));

// Serve static assests in production
if (process.env.NODE_ENV === 'production') {
	// Static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
