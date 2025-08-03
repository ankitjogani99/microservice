const express = require('express');
const sequelize = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());
app.use('/api/orders', orderRoutes);

sequelize.authenticate()
  .then(() => console.log('Order Service DB connected!'))
  .catch(err => console.log('DB Error:', err));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
