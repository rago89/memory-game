import app from './server';
import connectToDatabase from './db/database.services';
const config = require('./config');

(async (): Promise<void> => {
  try {
    await connectToDatabase();

    app.listen(config.PORT, () => {
      console.log(
        `listening at http://localhost:${config.PORT} (${config.MODE} mode)`
      );
    });
  } catch (error) {
    console.log(error);
  }
})();
