import Svg, { Path } from "react-native-svg";

export default function Location({ width, height, color }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={width}
      height={height}
    >
      <Path
        d="M 24 4 C 14.629252 4 7 11.629252 7 21 C 7 25.20679 8.5433056 29.064832 11.078125 32.03125 L 11.085938 32.039062 L 11.091797 32.046875 C 11.091797 32.046875 18.323729 40.299027 20.898438 42.755859 C 22.622568 44.39966 25.375478 44.39966 27.099609 42.755859 C 30.034388 39.956663 36.910156 32.042969 36.910156 32.042969 L 36.914062 32.037109 L 36.919922 32.03125 C 39.456988 29.064801 41 25.20679 41 21 C 41 11.629252 33.370748 4 24 4 z M 24 7 C 31.749252 7 38 13.250748 38 21 C 38 24.47521 36.733544 27.632586 34.638672 30.082031 C 34.625032 30.097631 27.590036 38.143501 25.029297 40.585938 C 24.435428 41.152136 23.562619 41.152136 22.96875 40.585938 C 20.828579 38.543748 13.381099 30.106639 13.359375 30.082031 L 13.357422 30.080078 C 11.265326 27.630829 10 24.474248 10 21 C 10 13.250748 16.250748 7 24 7 z M 24 15 C 22.125 15 20.528815 15.757133 19.503906 16.910156 C 18.478997 18.063179 18 19.541667 18 21 C 18 22.458333 18.478997 23.936821 19.503906 25.089844 C 20.528815 26.242867 22.125 27 24 27 C 25.875 27 27.471185 26.242867 28.496094 25.089844 C 29.521003 23.936821 30 22.458333 30 21 C 30 19.541667 29.521003 18.063179 28.496094 16.910156 C 27.471185 15.757133 25.875 15 24 15 z M 24 18 C 25.124999 18 25.778816 18.367867 26.253906 18.902344 C 26.728997 19.436821 27 20.208333 27 21 C 27 21.791667 26.728997 22.563179 26.253906 23.097656 C 25.778816 23.632133 25.124999 24 24 24 C 22.875001 24 22.221184 23.632133 21.746094 23.097656 C 21.271003 22.563179 21 21.791667 21 21 C 21 20.208333 21.271003 19.436821 21.746094 18.902344 C 22.221184 18.367867 22.875001 18 24 18 z"
        fill={color}
      />
    </Svg>
  );
}