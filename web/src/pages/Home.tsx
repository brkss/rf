import React from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

export const Home: React.FC<any> = (props) => {
  const history = useHistory();
  const parseParams = () => {
    const params = queryString.parse(props.location.search);
    //if (!params.code) history.push("/login");

    console.log("code => ", params.code);
  };

  React.useEffect(() => {
    parseParams();
  }, []);

  return (
    <>
      <h1>This is Home ! </h1>
    </>
  );
};
