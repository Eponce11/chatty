import { useState } from "react";

const CancelSvg = (props: any) => {
  const { className, onClick } = props;
  const [color, setColor] = useState<string>("#949BA4");
  return (
    <div
      onMouseLeave={() => setColor("#949BA4")}
      onMouseEnter={() => setColor("#FFFFFF")}
      className="cursor-pointer"
      onClick={onClick}
    >
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth="6"
        stroke={color}
        fill={color}
        className={className}
      >
        <line x1="8.06" y1="8.06" x2="55.41" y2="55.94" />
        <line x1="55.94" y1="8.06" x2="8.59" y2="55.94" />
      </svg>
    </div>
  );
};

export default CancelSvg;
