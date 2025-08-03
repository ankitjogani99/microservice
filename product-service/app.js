const express = require('express');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

sequelize.authenticate()
  .then(() => console.log('Product Service DB connected!'))
  .catch(err => console.log('DB Error:', err));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
