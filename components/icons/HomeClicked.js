import Svg, { Path } from "react-native-svg";

export default function HomeClicked({ width, height, color }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={width}
      height={height}
    >
      <Path
        d="M43.99 43.86c.04.29-.04.58-.24.8C43.57 44.87 43.29 45 43 45H30l-.62-9.01C29.2 33.73 27.3 32 25 32s-4.2 1.73-4.38 3.99L20 45H7c-.29 0-.57-.13-.76-.34-.19-.22-.27-.51-.23-.8L8.12 29h33.76L43.99 43.86zM34.6 10H15.4c3.96-3.45 7.78-6 9.6-6S30.64 6.55 34.6 10zM47 26c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1 0-3 4.9-9.02 10.2-14h23.6C42.1 16.98 47 23 47 26z"
        fill={color}
      />
    </Svg>
  );
}
