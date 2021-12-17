import { sign } from "jsonwebtoken";

interface IWrapAcessPayload {
  token: string;
  expire_in: number;
  created_at: number;
  usr_id: string;
}
interface IWrapRefreshPayload {
  token: string;
  usr_id: string;
}

export const wrapAccessToken = (payload: IWrapAcessPayload) => {
  const _token = sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });

  return _token;
};

export const wrapRefreshToken = (payload: IWrapRefreshPayload) => {
  const _token = sign(payload, process.env.JWT_REFRESH!, {
    expiresIn: "7d",
  });

  return _token;
};
