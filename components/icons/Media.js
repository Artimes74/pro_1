import Svg, { Path } from "react-native-svg";

export default function Media({ width, height, color }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={width}
      height={height}
    >
      <Path
        d="M 14.5 5 C 12.032499 5 10 7.0324991 10 9.5 L 10 18.253906 A 1.50015 1.50015 0 0 0 10 18.740234 L 10 39.5 C 10 41.967501 12.032499 44 14.5 44 L 33.5 44 C 35.967501 44 38 41.967501 38 39.5 L 38 18.746094 A 1.50015 1.50015 0 0 0 38 18.259766 L 38 9.5 C 38 7.0324991 35.967501 5 33.5 5 L 14.5 5 z M 14.5 8 L 33.5 8 C 34.346499 8 35 8.6535009 35 9.5 L 35 17 L 13 17 L 13 9.5 C 13 8.6535009 13.653501 8 14.5 8 z M 13 20 L 35 20 L 35 39.5 C 35 40.346499 34.346499 41 33.5 41 L 14.5 41 C 13.653501 41 13 40.346499 13 39.5 L 13 20 z M 24 22 C 19.599487 22 16 25.59949 16 30 C 16 34.40051 19.599487 38 24 38 C 28.400513 38 32 34.40051 32 30 C 32 25.59949 28.400513 22 24 22 z M 24 25 C 26.779194 25 29 27.220808 29 30 C 29 32.779192 26.779194 35 24 35 C 21.220806 35 19 32.779192 19 30 C 19 27.220808 21.220806 25 24 25 z M 24 27.5 A 2.5 2.5 0 0 0 24 32.5 A 2.5 2.5 0 0 0 24 27.5 z"
        fill={color}
      />
    </Svg>
  );
}
