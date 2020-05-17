const app = require("./src/app");
const PORT = process.env.PORT || 81;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
