import * as express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/user.routes';


const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/v1', router);

export default app;
