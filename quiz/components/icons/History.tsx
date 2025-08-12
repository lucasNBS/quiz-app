import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

type SvgComponentProps = {
  width: number;
  height: number;
  fill: string;
};

export default function SvgComponent(props: SvgComponentProps) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <G>
        <Path d="M3 5.675V3a1 1 0 0 0-2 0v4a2 2 0 0 0 2 2h4a1 1 0 1 0 0-2H4.522c.02-.025.04-.05.058-.078a8.991 8.991 0 1 1-1.515 6.083c-.061-.548-.508-.997-1.06-.997-.553 0-1.01.45-.959 1A11 11 0 1 0 3 5.675Z" />
        <Path d="M12 5a1 1 0 0 0-1 1v6.467s0 .26.127.457c.084.166.217.31.39.41l4.62 2.668a1 1 0 0 0 1-1.732L13 11.88V6a1 1 0 0 0-1-1Z" />
      </G>
    </Svg>
  );
}
