import Svg, { Path } from "react-native-svg";

export default function ForwardTo({ width, height, color, rotate }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width={width}
      height={height}
      style={{ transform: [{ rotate: rotate }] }}
    >
      <Path
        d="M15,27c6.627,0,12-5.373,12-12c0-6.627-5.373-12-12-12S3,8.373,3,15C3,21.627,8.373,27,15,27z M10.293,14.293l6-6 C16.488,8.098,16.744,8,17,8s0.512,0.098,0.707,0.293c0.391,0.391,0.391,1.023,0,1.414L12.414,15l5.293,5.293 c0.391,0.391,0.391,1.023,0,1.414s-1.023,0.391-1.414,0l-6-6C9.902,15.316,9.902,14.684,10.293,14.293z"
        fill={color}
      />
    </Svg>
  );
}
