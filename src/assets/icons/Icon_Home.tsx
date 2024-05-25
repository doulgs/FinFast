import { SvgXml } from "react-native-svg";
import { IconProps } from "./_IconProps";

export function Icon_Home({ color = "#ffffff", size = 28 }: IconProps) {
  const icon_svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width=${size} height=${size} fill=${color} viewBox="0 0 256 256"><path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"></path></svg>
  `;
  return <SvgXml xml={icon_svg} />;
}
