// import bcrypt from "bcrypt";
// import { db } from "@vercel/postgres";
// import { users, events } from "../../lib/placeholder-data";

// const client = await db.connect();

// async function seedUsers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS users (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         username VARCHAR(50) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//     );
//   `;

//   const insertedUsers = await Promise.all(
//     users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       return client.sql`
//         INSERT INTO users (id, name, username, password)
//         VALUES (${user.id}, ${user.name}, ${user.username}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//     }),
//   );

//   return insertedUsers;
// }

// async function seedEvents() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS events (
//     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     datetime TIMESTAMP WITH TIME ZONE NOT NULL,
//     location VARCHAR(255),
//     speaker VARCHAR(255),
//     pic_url TEXT,
//     description TEXT,
//     created_by UUID REFERENCES users(id),
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );
//     `;

//   const insertedEvents = await Promise.all(
//     events.map(
//       (event) => client.sql`
//           INSERT INTO events (datetime, description, location, pic_url, speaker, created_by, title)
//           VALUES (${event.datetime}, ${event.description}, ${event.location}, ${event.pic_url}, ${event.speaker}, ${event.created_by}, ${event.title})
//           ON CONFLICT (id) DO NOTHING;
//         `,
//     ),
//   );

//   return insertedEvents;
// }

// export async function GET() {
//   try {
//     await client.sql`BEGIN`;
//     await seedUsers();
//     await seedEvents();
//     await client.sql`COMMIT`;

//     return Response.json({ message: "Database seeded successfully" });
//   } catch (error) {
//     await client.sql`ROLLBACK`;
//     return Response.json({ error }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  // Your file upload logic here, e.g., saving the file to a storage service
  return NextResponse.json({ message: "File uploaded successfully" });
}
