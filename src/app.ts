import express from 'express';
import nunjucks from 'nunjucks';
import { connectDB, closeDB } from './models/db';
import websiteRoutes from './routes/websiteRoutes';

const app = express();
const port = process.env.PORT || 3000;

// --- 1. SETUP TEMPLATE ENGINE (Nunjucks) ---
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');

// --- 2. SETUP STATIC FILES ---
app.use(express.static('public'));

// --- 3. MIDDLEWARE ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- 4. ROUTES ---
app.use('/', websiteRoutes);

// --- 5. SERVER LIFECYCLE ---
async function startServer() {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Trail Guide running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

process.on('SIGINT', async () => {
    await closeDB();
    process.exit(0);
});
