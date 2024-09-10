import express, { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import circularJSON from 'circular-json';
const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({
      path:'src/config/.env'
  });
}

app.use(express.json());
const port = process.env.PORT;
//

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}?q=football&apiKey=${process.env.API_KEY}`)
        const str = circularJSON.stringify(response);
        const data = JSON.parse(str);
        res.status(200).json(data.data); // return the data from the api to the user
    } catch (error : any) {
        next(new Error(error));
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});