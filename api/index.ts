import app from './server';
import connectToDatabase from './db/database.services';
import finalConfig from './config/index';

(async (): Promise<void> => {
  try {
    await connectToDatabase();

    app.listen(finalConfig.PORT, () => {
      console.log(
        `listening at http://localhost:${finalConfig.PORT} (${finalConfig.MODE} mode)`
      );
    });
  } catch (error) {
    console.log(error);
  }
})();
