import app from "./app";

const PORT: number | string = process.env.PORT || 81;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
