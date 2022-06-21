import Svg, { Path } from "react-native-svg";

export default function Scaner({ width, height, color }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 456 456"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M76,0 C34.2506559,0 0,34.2506559 0,76 L0,133 L38,133 L38,76 C38,54.7833441 54.7833441,38 76,38 L133,38 L133,0 L76,0 Z M323,0 L323,38 L380,38 C401.216654,38 418,54.7833441 418,76 L418,133 L456,133 L456,76 C456,34.2506559 421.749346,0 380,0 L323,0 Z M0,304 L0,380 C0,421.749346 34.2506559,456 76,456 L133,456 L133,418 L76,418 C54.7833441,418 38,401.216654 38,380 L38,304 L0,304 Z M418,323 L418,380 C418,401.216654 401.216654,418 380,418 L323,418 L323,456 L380,456 C421.749346,456 456,421.749346 456,380 L456,323 L418,323 Z"
        fill={color}
      />
    </Svg>
  );
}
