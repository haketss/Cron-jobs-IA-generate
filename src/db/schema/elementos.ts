
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const Emementos = pgTable('elementos', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    emoje: text(),
    quemCriou: text(),
    emojeBaseUm: text(),
    emojeBaseDois: text(),
    createdAt: timestamp().defaultNow().notNull()})


