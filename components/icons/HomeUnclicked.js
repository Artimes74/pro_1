import Svg, { Path } from "react-native-svg";

export default function HomeUnclicked({ width, height, color }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={width}
      height={height}
    >
      <Path
        d="M 25 4 C 24.14576 4 23.375653 4.355113 22.460938 4.8671875 C 21.546221 5.379262 20.522309 6.0871324 19.417969 6.9433594 C 18.376819 7.7505927 17.190157 8.9746405 16.054688 10 L 16 10 L 16 10.048828 C 14.744165 11.18518 13.534674 12.143262 12.283203 13.427734 C 9.8811765 15.893102 7.6067012 18.513454 5.9082031 20.869141 C 4.209705 23.224825 3 25.1834 3 27 A 1.0001 1.0001 0 0 0 4 28 L 8.3984375 28 L 6.0117188 43.851562 A 1.0001 1.0001 0 0 0 7 45 L 18.929688 45 L 31.070312 45 L 43 45 A 1.0001 1.0001 0 0 0 43.988281 43.851562 L 41.601562 28 L 46 28 A 1.0001 1.0001 0 0 0 47 27 C 47 25.183333 45.790452 23.224823 44.091797 20.869141 C 42.393141 18.513458 40.118943 15.893094 37.716797 13.427734 C 36.465264 12.143266 35.255847 11.185175 34 10.048828 L 34 10 L 33.945312 10 C 32.809835 8.9746455 31.623127 7.750586 30.582031 6.9433594 C 29.477748 6.0871395 28.453625 5.3792576 27.539062 4.8671875 C 26.624501 4.3551174 25.854167 4 25 4 z M 25 6 C 25.145833 6 25.781749 6.1761326 26.5625 6.6132812 C 27.343251 7.0504299 28.303502 7.7097355 29.355469 8.5253906 C 29.848287 8.9075033 30.451299 9.5552856 30.978516 10 L 19.019531 10 C 19.54675 9.5552885 20.149743 8.9075 20.642578 8.5253906 C 21.694581 7.7097426 22.656631 7.0504255 23.4375 6.6132812 C 24.218369 6.176137 24.85374 6 25 6 z M 16.820312 12 L 33.177734 12 C 34.23657 12.97621 35.230809 13.742177 36.283203 14.822266 C 38.631057 17.231906 40.856859 19.799042 42.470703 22.037109 C 43.659513 23.685742 44.308067 25.029264 44.652344 26 L 5.3476562 26 C 5.6918969 25.029245 6.3406015 23.685739 7.5292969 22.037109 C 9.1429863 19.799046 11.36712 17.231898 13.714844 14.822266 C 14.767179 13.74218 15.761504 12.976205 16.820312 12 z M 10.421875 28 L 39.578125 28 L 41.837891 43 L 30.933594 43 L 30.376953 34.912109 L 30.376953 34.90625 C 30.152126 32.137045 27.799975 30 25 30 C 22.200025 30 19.847879 32.137004 19.623047 34.90625 L 19.623047 34.912109 L 19.066406 43 L 8.1621094 43 L 10.421875 28 z M 25 32 C 26.794025 32 28.241645 33.329605 28.382812 35.068359 L 28.927734 43 L 21.072266 43 L 21.617188 35.068359 C 21.758355 33.329605 23.205975 32 25 32 z"
        fill={color}
      />
    </Svg>
  );
}
