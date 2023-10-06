//import mongoose connection from the lib folder
import { connectMongoDB } from "@/lib/MongoConnect";
//import User model
import User from "@/models/UsersModel";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (typeof credentials !== "undefined") {
          await connectMongoDB();

          const user = await User.findOne({ email: credentials.email });

          if (user) {
            const passwordMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (!passwordMatch) {
              throw new Error("Invalid credentials");
            } else {
              const returnedUser = user.toObject();

              const validateUser = {
                firstName: returnedUser.firstName,
                lastName: returnedUser.lastName,
                username: returnedUser.username,
                email: returnedUser.email,
                id: returnedUser._id,
                mobile: returnedUser.mobile,
              };
              return { validateUser, apiToken: user.token };
            }
          } else {
            throw new Error("Invalid Credentials");
          }
        } else {
          throw new Error("Something went wrong");
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async session({ session, token }) {
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        // strip unnecessary properties
        if (c !== "iat" && c !== "exp" && c !== "jti" && c !== "apiToken") {
          return { ...p, [c]: token[c] };
        } else {
          return p;
        }
      }, {});
      return { ...session, user: sanitizedToken, apiToken: token.apiToken };
    },
    async jwt({ token, user }) {
      if (typeof user !== "undefined") {
        // user has just signed in so the user object is populated
        return user;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };