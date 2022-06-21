import Svg, { Path } from "react-native-svg";

export default function Arrow({ width, height, color, rotate }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      style={{
        transform: [
          {
            rotate: rotate,
          },
        ],
      }}
    >
      <Path
        d="M5.707,10.707l5.586,5.586c0.391,0.391,1.024,0.391,1.414,0l5.586-5.586C18.923,10.077,18.477,9,17.586,9H6.414 C5.523,9,5.077,10.077,5.707,10.707z"
        fill={color}
      />
    </Svg>
  );
}
