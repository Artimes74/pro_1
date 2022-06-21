import { color } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

export default function BellDevices({ width, height, color }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
    >
      <Path
        d="M 12 2 C 11.172 2 10.5 2.672 10.5 3.5 L 10.5 4.1953125 C 7.913 4.8623125 6 7.205 6 10 L 6 16 L 4 18 L 4 19 L 20 19 L 20 18 L 18 16 L 18 10 C 18 7.205 16.087 4.8642656 13.5 4.1972656 L 13.5 3.5 C 13.5 2.672 12.828 2 12 2 z M 10 20 C 10 21.105 10.896 22 12 22 C 13.104 22 14 21.104 14 20 L 10 20 z"
        fill={color}
      />
    </Svg>
  );
}
