import Svg, { Path } from "react-native-svg";

export default function FlashArrow({ width, height, color, rotate }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={width}
      height={height}
      style={{ transform: [{ rotate: rotate }] }}
    >
      <Path
        d="M12.586,35.414C12.977,35.805,13.488,36,14,36s1.023-0.195,1.414-0.586c0.781-0.781,0.781-2.047,0-2.828L8.828,26H44 c1.104,0,2-0.896,2-2s-0.896-2-2-2H8.828l6.586-6.586c0.781-0.781,0.781-2.047,0-2.828c-0.781-0.781-2.047-0.781-2.828,0l-10,10 c-0.781,0.781-0.781,2.047,0,2.828L12.586,35.414z"
        fill={color}
      />
    </Svg>
  );
}
