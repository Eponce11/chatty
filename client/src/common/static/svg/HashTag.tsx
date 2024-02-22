import { useState } from "react";

const HashTag = () => {
  const [color, setColor] = useState<string>("#949BA4");
  return (
    <div
      onMouseLeave={() => setColor("#949BA4")}
      onMouseEnter={() => setColor("#FFFFFF")}
    >
      <svg
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M10 4L7 20M17 4L14 20M5 8H20M4 16H19"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          ></path>{" "}
        </g>
      </svg>
    </div>
  );
};

export default HashTag;
