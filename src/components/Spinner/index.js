import React from "react";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";


const Spinner = ()=>{
  const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
`;
return (
  <div className="sweet-loading">
        <BarLoader
            css={override}
            size={150}
            color={"#123abc"}
            loading={true}
          />
  </div>
)
}

export default Spinner;
