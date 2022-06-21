import Svg, { Path } from "react-native-svg";

export default function Add({ width, height, color }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width={width}
      height={height}
    >
      <Path
        d="M 14.970703 2.9726562 A 2.0002 2.0002 0 0 0 13 5 L 13 13 L 5 13 A 2.0002 2.0002 0 1 0 5 17 L 13 17 L 13 25 A 2.0002 2.0002 0 1 0 17 25 L 17 17 L 25 17 A 2.0002 2.0002 0 1 0 25 13 L 17 13 L 17 5 A 2.0002 2.0002 0 0 0 14.970703 2.9726562 z"
        fill={color}
      />
    </Svg>
  );
}
