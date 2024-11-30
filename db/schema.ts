import { int, sqliteTable, text, real } from "drizzle-orm/sqlite-core";

export const productTable = sqliteTable("products", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text().notNull(),
  price: real().notNull(),
  stock: real().default(0),
});

export type Product = (typeof productTable)["$inferSelect"];
