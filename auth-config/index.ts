import type { NextAuthOptions, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import { OAuthConfig } from "next-auth/providers/oauth";
import { LinkedInProfile } from "next-auth/providers/linkedin";

const LinkedinProvider = (
  config: Partial<OAuthConfig<LinkedInProfile>>,
): OAuthConfig<LinkedInProfile> => ({
  id: "linkedin",
  name: "LinkedIn",
  type: "oauth",
  client: { token_endpoint_auth_method: "client_secret_post" },
  issuer: "https://www.linkedin.com",
  profile: (profile) => ({
    id: profile.sub,
    name: profile.name,
    email: profile.email,
    image: profile.picture,
  }),
  wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
  authorization: {
    params: {
      scope: "openid profile email",
    },
  },
  ...config,
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        console.log("🚀 ~ credentials:", credentials);

        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
    LinkedinProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt(jwtOptions) {
      console.log("🚀 ~ jwtOptions:", jwtOptions);
      const { token, account } = jwtOptions;

      if (account && account.provider === "github") {
        return token;
      }

      if (account && account.provider === "google") {
        return token;
      }

      if (account && account.provider === "linkedin") {
        return token;
      }

      return token;
    },
    async session(sessionOptions) {
      // console.log("🚀 ~ sessionOptions:", sessionOptions);
      const { session, token } = sessionOptions;

      if (token) {
        // session.user.id = token.id;
        // session.user.name = token.name;
        // session.user.email = token.email;
        // session.user.loginType = token.loginType;
        // session.user.coName = token.coName;
        // session.accessToken = token.accessToken;
        // session.error = token.error; // Passa o erro para a sessão.
      }
      return session;
    },
  },
};
