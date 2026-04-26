import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const P1 =
  'M16.2599 31.7647C23.1215 28.5898 31.2502 31.5966 34.4149 38.4805C41.5377 53.9748 50.97 65.2251 73.2353 81.0777C79.3975 85.4651 80.8479 94.0344 76.4747 100.217C72.1015 106.399 63.56 107.854 57.3978 103.467C32.5366 85.7657 19.27 71.0881 9.56588 49.9787C6.4013 43.0948 9.39837 34.9397 16.2599 31.7647Z';
const P2 =
  'M7.61068 105.234C-11.3923 86.9342 9.89087 73.9686 20.5325 83.8822L42.5757 105.234H7.61068Z';
const P3 =
  'M38.7751 0C46.3311 0.000372585 52.4571 6.14576 52.4571 13.7264C52.4571 21.3071 46.3311 27.4525 38.7751 27.4529C31.2188 27.4529 25.0932 21.3073 25.0932 13.7264C25.0932 6.14553 31.2188 0 38.7751 0Z';

export default function SplashMark({ width = 79, height = 106 }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 80 106"
      fill="none"
      accessibilityLabel="Namaz Mentor"
    >
      <Path d={P1} fill="url(#splashGrad0)" />
      <Path d={P2} fill="url(#splashGrad1)" />
      <Path d={P3} fill="url(#splashGrad2)" />
      <Defs>
        <LinearGradient
          id="splashGrad0"
          x1="39.5079"
          y1="0.00259399"
          x2="39.5"
          y2="106"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F9C971" />
          <Stop offset="0.5" stopColor="#A68241" />
          <Stop offset="1" stopColor="#5C3C01" />
        </LinearGradient>
        <LinearGradient
          id="splashGrad1"
          x1="39.5079"
          y1="0.00259399"
          x2="39.5"
          y2="106"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F9C971" />
          <Stop offset="0.5" stopColor="#A68241" />
          <Stop offset="1" stopColor="#5C3C01" />
        </LinearGradient>
        <LinearGradient
          id="splashGrad2"
          x1="39.5079"
          y1="0.00259399"
          x2="39.5"
          y2="106"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F9C971" />
          <Stop offset="0.5" stopColor="#A68241" />
          <Stop offset="1" stopColor="#5C3C01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
