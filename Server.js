import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './Routers/ProductRouter.js';
import userRouter from './Routers/UserRouter.js';
import orderRouter from './Routers/OrderRouter.js';

const port = process.env.PORT || 3333;

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/petshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});
app.get('/', (req, res) => {
    res.send('server is ready');
});
app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
});