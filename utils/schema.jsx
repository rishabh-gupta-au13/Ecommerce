const { pgTable, varchar,serial } = require("drizzle-orm/pg-core");

export const userInfo=pgTable('userInfo',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    userName:varchar('userName').notNull(),

})