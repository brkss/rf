import { AuthorizationCode } from "simple-oauth2";

export const generateToken = async (code: string) => {
  let _token = null;
  const config = {
    client: {
      id: process.env.UID!,
      secret: process.env.SEC!,
    },
    auth: {
      tokenHost: "https://api.intra.42.fr",
    },
  };

  const client = new AuthorizationCode(config);
  const tokenParams = {
    code: code,
    redirect_uri: "http://localhost:3000",
    scope: "public",
  };

  try {
    _token = await client.getToken(tokenParams);
  } catch (error) {
    console.log("Access Token Error", error.message);
  }
  return _token;
};
