import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const P1 =
  'M165.287 23.1828C168.153 21.8649 171.549 23.113 172.871 25.9705C175.846 32.4021 179.786 37.072 189.087 43.6524C191.661 45.4736 192.267 49.0306 190.44 51.5968C188.613 54.163 185.045 54.767 182.471 52.9459C172.086 45.5983 166.544 39.5057 162.491 30.7434C161.169 27.8859 162.421 24.5007 165.287 23.1828Z';
const P2 =
  'M161.674 53.6797C153.736 46.0834 162.626 40.7014 167.072 44.8165L176.279 53.6797H161.674Z';
const P3 =
  'M174.692 9.99745C177.848 9.9976 180.407 12.5485 180.407 15.6952C180.407 18.8419 177.848 21.3928 174.692 21.393C171.535 21.393 168.977 18.842 168.977 15.6952C168.977 12.5484 171.535 9.99745 174.692 9.99745Z';

export default function WelcomeIllustration({ width, height }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 350 64"
      fill="none"
      accessible
      accessibilityLabel="Prayer figure mark"
    >
      <Path d={P1} fill="#D9AA55" />
      <Path d={P1} fill="url(#welcomeGrad0)" />
      <Path d={P2} fill="#D9AA55" />
      <Path d={P2} fill="url(#welcomeGrad1)" />
      <Path d={P3} fill="#D9AA55" />
      <Path d={P3} fill="url(#welcomeGrad2)" />
      <Defs>
        <LinearGradient
          id="welcomeGrad0"
          x1="174.998"
          y1="9.99852"
          x2="174.995"
          y2="53.9975"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F9C971" />
          <Stop offset="0.5" stopColor="#A68241" />
          <Stop offset="1" stopColor="#5C3C01" />
        </LinearGradient>
        <LinearGradient
          id="welcomeGrad1"
          x1="174.998"
          y1="9.99852"
          x2="174.995"
          y2="53.9975"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F9C971" />
          <Stop offset="0.5" stopColor="#A68241" />
          <Stop offset="1" stopColor="#5C3C01" />
        </LinearGradient>
        <LinearGradient
          id="welcomeGrad2"
          x1="174.998"
          y1="9.99852"
          x2="174.995"
          y2="53.9975"
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
