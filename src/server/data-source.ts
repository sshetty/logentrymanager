import { DataSource } from "typeorm";
import { LogEntry } from "../entity/LogEntry"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [LogEntry],
    subscribers: [],
    migrations: [],
})