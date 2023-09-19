function ScoreMeter() { }

type ArrowProps = {
  rotate: number;
};
export function Arrow({ rotate = 0 }: ArrowProps) {
  const rotationStyle = {
    transform: `rotate(${rotate}deg)`,
  };

  return (
    <svg
      width="38"
      height="57"
      viewBox="0 0 38 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...rotationStyle, }}
    >
      <path
        d="M18.3333 56.5496L0.0750066 0.925482C0.0750066 0.925482 11.427 12.6066 20.4564 11.9654C27.9454 11.4336 37.0162 2.19932 37.0162 2.19932L18.3333 56.5496Z"
        fill="white"
      />
    </svg>
  );
}
