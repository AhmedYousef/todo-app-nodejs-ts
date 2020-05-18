import path from "path";
import bunyan from "bunyan";

const level: any = process.env.NODE_LOGGING_LEVEL || "info";

const log = bunyan.createLogger({
  name: "myapp",
  streams: [
    {
      level,
      stream: process.stdout,
    },
    {
      level,
      path: path.resolve(__dirname, "..", "..", "logs.json"),
    },
  ],
});

export default log;
