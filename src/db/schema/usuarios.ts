
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const usuarios = pgTable('usuarios', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
});