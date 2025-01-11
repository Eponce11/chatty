import { useState } from "react";

const HomeSvg = () => {
  const [color, setColor] = useState<string>("#23A559");
    return (
      <div
        onMouseLeave={() => setColor("#23A559")}
        onMouseEnter={() => setColor("#FFFFFF")}
      >
      <svg
        width="30px"
        height="30px"
        fill={color}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M20 20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9zm-9-7v6h2v-6h-2z" />
        </g>
      </svg>
    </div>
  );
};

export default HomeSvg