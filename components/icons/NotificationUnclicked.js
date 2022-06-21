import Svg, { Path } from "react-native-svg";

export default function NotificationUnclicked({ width, height, color }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={width}
      height={height}
    >
      <Path
        d="M 23.277344 4.0175781 C 15.193866 4.3983176 9 11.343391 9 19.380859 L 9 26.648438 L 6.3496094 31.980469 A 1.50015 1.50015 0 0 0 6.3359375 32.009766 C 5.2696804 34.277268 6.9957076 37 9.5019531 37 L 18 37 C 18 40.295865 20.704135 43 24 43 C 27.295865 43 30 40.295865 30 37 L 38.496094 37 C 41.002339 37 42.730582 34.277829 41.664062 32.009766 A 1.50015 1.50015 0 0 0 41.650391 31.980469 L 39 26.648438 L 39 19 C 39 10.493798 31.863289 3.6133643 23.277344 4.0175781 z M 23.417969 7.0136719 C 30.338024 6.6878857 36 12.162202 36 19 L 36 27 A 1.50015 1.50015 0 0 0 36.15625 27.667969 L 38.949219 33.289062 C 39.128826 33.674017 38.921017 34 38.496094 34 L 9.5019531 34 C 9.077027 34 8.8709034 33.674574 9.0507812 33.289062 C 9.0507812 33.289062 9.0507812 33.287109 9.0507812 33.287109 L 11.84375 27.667969 A 1.50015 1.50015 0 0 0 12 27 L 12 19.380859 C 12 12.880328 16.979446 7.3169324 23.417969 7.0136719 z M 21 37 L 27 37 C 27 38.674135 25.674135 40 24 40 C 22.325865 40 21 38.674135 21 37 z"
        fill={color}
      />
    </Svg>
  );
}