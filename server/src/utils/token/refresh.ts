import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import axios, { AxiosRequestConfig } from "axios";
import { wrapAccessToken, wrapRefreshToken } from "./wrap";
import { User } from "../../entity/User";

export const refreshToken = async (req: Request, res: Response) => {
  console.log("=======> trying to refresh <======");

  const _token = req.cookies.uid;
  if (!_token) {
    return res.send({
      status: false,
      token: "",
      message: "Token not found !",
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
      message: "Invalid Token",
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
      message: "Something went wrong trying to refresh token !",
    });
  }
  const user = await User.findOne({ where: { id: payload.usr_id } });
  if (!user) {
    return res.send({
      status: false,
      message: "User not found !",
    });
  }
  const _accessToken = wrapAccessToken({
    token: _access.access_token,
    expire_in: _access.expires_in,
    created_at: _access.created_at,
    usr_id: user.id,
  });
  const _refreshToken = wrapRefreshToken({
    token: _access.refresh_token,
    usr_id: user.id,
  });
  res.cookie("uid", _refreshToken, {
    httpOnly: true,
  });

  return res.send({
    status: true,
    token: _accessToken,
    message: "token refreshed successfuly !",
  });
};
