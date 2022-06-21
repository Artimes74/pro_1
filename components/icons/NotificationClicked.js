import Svg, { Path } from "react-native-svg";

export default function NotificationClicked({ width, height, color }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={width}
      height={height}
    >
      <Path
        d="M38.498 36H9.502c-1.205 0-2.31-.607-2.955-1.625S5.822 32.1 6.335 31.01L9 25.648v-6.267c0-8.239 6.271-14.987 14.277-15.364l0 0c4.151-.188 8.08 1.271 11.075 4.128C37.35 11.004 39 14.859 39 19v6.648l2.65 5.333c.527 1.119.448 2.377-.197 3.395S39.703 36 38.498 36zM23.348 5.516h.01H23.348zM18.09 38c.478 2.833 2.942 5 5.91 5s5.431-2.167 5.91-5H18.09z"
        fill={color}
      />
    </Svg>
  );
}
