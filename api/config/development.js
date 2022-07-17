module.exports = {
  MODE: "development",
  PORT: process.env.PORT || 4000,
  DATA_DIR: process.env.DATA_DIR,
  STATIC_DIR: process.env.STATIC_DIR || "dist/memory-game",
  DB_PATH: process.env.DB_PATH || "mongodb://localhost/memoryGame",
};
