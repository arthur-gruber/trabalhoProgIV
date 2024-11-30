import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import path from "path";

const dbpath = path.resolve(process.env.DB_FILE_NAME!);
const db = drizzle("file:" + dbpath);

export default db;
