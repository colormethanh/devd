const dotenv = require("dotenv").config();
const StartApp = require("./app");
const { ConnectDB, Controllers } = require("./database");

const StartServer = async () => {
  const PORT = process.env.PORT || 3000;
  await ConnectDB();

  StartApp(Controllers).listen(PORT, () => {
    console.log(
      `Server running on port http://localhost:${PORT} on NODE_ENV:${process.env.NODE_ENV}`
    );
  });
};

StartServer();

module.exports = StartServer;
