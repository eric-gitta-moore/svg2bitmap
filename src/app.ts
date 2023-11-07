import express from 'express';
import setupRoute from './route';

const app = express();
const port = 3000;

app.use(express.json());

setupRoute({ app });

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
