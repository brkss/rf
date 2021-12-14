import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import axios, { AxiosRequestConfig } from "axios";
import { wrapAccessToken, wrapRefreshToken } from "./wrap";

export const refreshToken = async (req: Request, res: Response) => {
  const _token = req.cookies.ujid;
  if (!_token) {
    return res.send({
      status: false,
      token: "",
    });
  }

  // decode token
  let payload: any = null;
  try {
    payload = verify(_token, process.env.JWT_REFRESH!);
  } catch (e) {
    console.log("token invalid ! =>", e);
    return res.send({
      status: false,
      token: "",
    });
  }

  // refresh oauth access token
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "https://api.intra.42.fr/oauth/token",
    data: {
      grant_type: "refresh_token",
      client_id: process.env.UID!,
      client_secret: process.env.SEC!,
      refresh_token: payload.token!,
    },
  };

  let _access = null;
  try {
    const resp = await axios.request(options);
    _access = resp.data;
  } catch (e) {
    console.log("error accured while trying to refresh token : ", e);
    return res.send({
      status: false,
      token: "",
    });
  }
  const _accessToken = wrapAccessToken({
    token: _access.access_token,
    expire_in: _access.expires_in,
    created_at: _access.created_at,
  });
  const _refreshToken = wrapRefreshToken({
    token: _access.refresh_token,
  });
  res.cookie("uid", _refreshToken, {
    httpOnly: true,
  });

  return res.send({
    status: true,
    token: _accessToken,
  });
};
