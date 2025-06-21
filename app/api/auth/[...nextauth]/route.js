import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import connectToDb from "@/lib/db";
import User from "@/models/User";

// ✅ Extract authOptions and export it
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, email }) {
      if (account.provider === "google" || account.provider === "github") {
        await connectToDb();
        const currentUser = await User.findOne({ email: user.email });

        if (!currentUser) {
          await User.create({
            email: user.email,
            name: user.name,
            provider: account.provider,
            profileImage: user.image || "https://www.gravatar.com/avatar/",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          console.log("New user created");
          return true;
        } else {
          user.name = currentUser.name;
          account.provider = currentUser.provider;
        }
        return true;
      }
      return false;
    },
  },
};

const handler = NextAuth(authOptions);

// ✅ Export handler for Next.js
export { handler as GET, handler as POST };
