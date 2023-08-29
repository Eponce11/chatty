interface cancelSvg {
  inMouseOver: boolean;
}

const CancelSvg = () => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      stroke-width="3"
      stroke="#000000"
      fill="none"
    >
      <line x1="8.06" y1="8.06" x2="55.41" y2="55.94" />
      <line x1="55.94" y1="8.06" x2="8.59" y2="55.94" />
    </svg>
  );
};

export default CancelSvg;
