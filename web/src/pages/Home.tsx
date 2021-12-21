import React from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { usePingQuery, useAuthMutation } from "../generated/graphql";
import { getAccessToken } from "../utils/token/token";

export const Home: React.FC<any> = (props) => {
  const history = useHistory();
  const _ping = usePingQuery();
  const [auth] = useAuthMutation();

  const parseParams = () => {
    const params = queryString.parse(props.location.search);
    if (getAccessToken()) history.push("/feedback");
    if (!params.code) history.push("/login");
    if (params.code) {
      auth({
        variables: {
          code: params.code as string,
        },
        onCompleted: (res) => {
          if (res.auth.status) {
            history.push("/feedback");
          } else {
            console.log("something went wrong ! ");
          }
        },
      });
    }
    console.log("code => ", params.code);
  };

  React.useEffect(() => {
    parseParams();
  }, []);

  if (_ping.loading) return <p>loading</p>;
  return (
    <>
      <h1>This is Home ! {_ping.data!.ping} </h1>
    </>
  );
};
