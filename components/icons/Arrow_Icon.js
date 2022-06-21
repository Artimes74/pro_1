import Svg, { Path } from "react-native-svg";

export default function Arrow_Icon({ width, height, color, rotate }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 26"
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
        d="M 13 15.40625 L 21.765625 6.820313 C 22.15625 6.4375 22.78125 6.441406 23.171875 6.828125 L 24.707031 8.363281 C 25.097656 8.757813 25.097656 9.390625 24.703125 9.78125 L 13.707031 20.707031 C 13.511719 20.902344 13.257813 21 13 21 C 12.742188 21 12.488281 20.902344 12.292969 20.707031 L 1.296875 9.78125 C 0.902344 9.390625 0.902344 8.757813 1.292969 8.363281 L 2.828125 6.828125 C 3.21875 6.441406 3.84375 6.4375 4.234375 6.820313 Z"
        fill={color}
      />
    </Svg>
  );
}
