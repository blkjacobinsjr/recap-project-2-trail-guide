import express from 'express';
import nunjucks from 'nunjucks';
import { connectDB, closeDB } from './models/db';
import websiteRoutes from './routes/websiteRoutes';
import { requestLogger } from './middleware/logger';

const app = express();
const port = process.env.PORT || 3000;

nunjucks.configure('views', { autoescape: true, express: app });
app.set('view engine', 'html');

app.use(express.static('public'));
app.use(requestLogger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', websiteRoutes);

async function startServer() {
    try {
        await connectDB();
        app.listen(port, () => console.log(`Trail Guide running at http://localhost:${port}`));
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
process.on('SIGINT', async () => { await closeDB(); process.exit(0); });
