import { sign } from "jsonwebtoken";

interface IWrapPayload {
  token: string;
  expire_in: number;
  created_at: number;
}

export const wrapAccessToken = (payload: IWrapPayload) => {
  const _token = sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });

  return _token;
};
