import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "#91ff00", // Hex color code
    logo: "", // Absolute URL to image
    buttonText: "#91ff00" // Hex color code
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    })
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
