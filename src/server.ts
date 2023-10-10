// ./config/env must be first import
import Env from "./config/env";
import logger from "./config/logger";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import api from "./app/controller";
import { handle } from "./app/middleware";

// Configure database
import { connect, seed } from "./config/db";
connect();
if (Env.DB_SEED) seed();

const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));

app.use(api);
app.use(handle);

app.listen(parseInt(Env.PORT), Env.HOST, () => {
    logger.info(`Server listening on port ${Env.PORT}...`);
});

export default app;
