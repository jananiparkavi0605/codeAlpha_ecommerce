require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes.js');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/Order');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Bodyparser = require('body-parser');

const app = express();
connectDB();
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    return console.log(`Server running on http://localhost:5000`);
});
