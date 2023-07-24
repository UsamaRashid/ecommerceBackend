const app = require("./app");
const { PORT } = process.env;

const StartApp = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

StartApp();
