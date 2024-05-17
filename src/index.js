const app = require("./app.js");

const PORT = process.env.PORT || 3000;

const handleListening = () => {
  console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);
