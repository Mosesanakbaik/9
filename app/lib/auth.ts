import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import sql from "@/app/lib/db";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("DEBUG — Credentials received:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password");
          return null;
        }

        const email = String(credentials.email).trim().toLowerCase();
        const password = String(credentials.password);

        console.log("DEBUG — Searching user:", email);

        const rows = await sql`
          SELECT * FROM users WHERE LOWER(email) = LOWER(${email})
        `;

        console.log("DEBUG — DB result:", rows);

        const user = rows[0];

        if (!user) {
          console.log("User not found");
          return null;
        }

        console.log("DEBUG — User found:", user.email);

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          console.log("Password invalid");
          return null;
        }

        console.log("Login successful!");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },
});
