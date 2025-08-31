import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

await reset(db, schema)

await seed(db, schema).refine((f) => {
    return {
       Emementos: {
            count: 5,
            Columns: {
                name: f.companyName(),
                emoje: f.email(),
            },
        },
       
    }
})

await sql.end()

console.log('Database reset and seeded successfully.') 