import * as express from 'express';
import cors from 'cors';
import helmet from 'helmet';


const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/v1');

export default app;
