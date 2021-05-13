const app = require('./routes');
const db = require('./db/db');

const PORT = process.env.PORT || 4000;

async function startServer() {
    try {
        console.log("Running migrations...");
        await db.migrate.latest();
        await db.seed.run();
        // console.log("Seeding database...");

        console.log("Starting express server...");
        app.listen(PORT, () => {
          console.log(`App listening on port ${PORT}`);
        })
    } catch (err) {
        console.log("Error starting app!", err);
    }
}

startServer();
