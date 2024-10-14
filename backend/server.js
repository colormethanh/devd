const dotenv = require("dotenv");
const StartApp = require("./app");
const { ConnectDB, Controllers } = require("./database");
dotenv.config();

const StartServer = async () => {
  const PORT = process.env.PORT || 3000;
  await ConnectDB();

  StartApp(Controllers).listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
};

StartServer();
