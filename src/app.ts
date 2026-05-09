import express from 'express';
import nunjucks from 'nunjucks';
import { connectDB, closeDB } from './models/db';

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
app.use(express.urlencoded({ extended: true })); // Handle HTML Form data
app.use(express.json()); // Handle JSON data for the API

// --- 4. ROUTES (Placeholders for now) ---
app.get('/', (req, res) => {
    res.render('base');
});

// --- 5. SERVER LIFECYCLE ---
async function startServer() {
    try {
        // Open the warehouse BEFORE starting the assembly line
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

// --- 6. SHUTDOWN HANDLING ---
// When someone hits CTRL+C, close the database safely.
process.on('SIGINT', async () => {
    await closeDB();
    process.exit(0);
});
