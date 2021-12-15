import axios, { AxiosRequestConfig } from "axios";

export const userData = async (access_token: string) => {
  let user: any = null;

  const config: AxiosRequestConfig = {
    method: "GET",
    url: "https://api.intra.42.fr/v2/me",
    headers: { Authorization: `bearer ${access_token}` },
  };

  try {
    const res = await axios.request(config);
    const data = res.data;
    user.name = data.usual_full_name;
    user.campus = data.compus[0].name;
    user.campus_id = data.compus[0].id;
    user.username = data.login;
    return user;
  } catch (e) {
    console.log("something went wrong ! ", e);
    return null;
  }
};
