import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
    
  providers: [
    
    Providers.Credentials({
      name: "Credentials",
      
      credentials: {
        username: { label: "username", type: "text", placeholder: "jordonm" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log(credentials);
        return Promise.resolve({
          id: 1,
          name: "khurram",
          email: "test@gmail.com",
        });
      },
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
