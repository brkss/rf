import { MiddlewareFn } from "type-graphql";
import { IContext } from "../types/Context";
import { verify } from "jsonwebtoken";

export const isUserAuth: MiddlewareFn<IContext> = ({ context }, next) => {
  const auth = context.req.headers["authorization"];
  if (!auth) {
    throw new Error("Not authenticated!");
  }
  const _token = auth.split(" ")[1];
  if (!_token) {
    throw new Error("No token found !");
  }
  try {
    const payload = verify(_token, process.env.JWT_SECRET!);
    context.payload = payload;
  } catch (e) {
    console.log("token verf error => ", e);
    throw new Error("Something went varifying token !");
  }
  next();
};
