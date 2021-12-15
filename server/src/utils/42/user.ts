import axios, { AxiosRequestConfig } from "axios";

export const userData = async (access_token: string) => {
  //let user: any = null;

  const config: AxiosRequestConfig = {
    method: "GET",
    url: "https://api.intra.42.fr/v2/me",
    headers: { Authorization: `bearer ${access_token}` },
  };

  try {
    const res = await axios.request(config);
    const data = res.data;
    console.log("data => ", data.displayname);
    const user = {
      name: data.displayname,
      campus: data.campus[0].name,
      campus_id: data.campus[0].id,
      username: data.login,
    };
    return user;
  } catch (e) {
    console.log("something went wrong ! ", e);
    return null;
  }
};
