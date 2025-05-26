// Name of file can be anything
import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      //!! shortcut for conversion to boolean
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        // console.log("booboo", user, account, profile);
        const existingGuest = await getGuest(user.email);
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch {
        console.log("signin error");
        return false;
      }
    },
    async session({ session, user }) {
      //callback is called after signin and signout
      // console.log("session", session, "user", user);
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session; //auth() will not return session if you don't return
    },
  },
  pages: { signIn: "/login" },
};
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
