import { SwatChartColour } from '@/contracts/swatChartColour';
import { SwatChartContentConfig } from '@/contracts/swatChartContentConfig';
import { SwatChartDefaults } from '@/contracts/swatChartsDefaults';

export const swatBackgrounds = (props: {
  chart?: SwatChartContentConfig; //
  colour?: SwatChartColour;
}) => {
  const backgrounds: Array<string> = [];

  const chartWidth = props.chart?.width ?? SwatChartDefaults.chart.width;
  const chartHeight = props.chart?.height ?? SwatChartDefaults.chart.height;
  const paddingX = props.chart?.padding?.x ?? SwatChartDefaults.padding.x;
  const paddingY = props.chart?.padding?.y ?? SwatChartDefaults.padding.y;

  const totalWidth = chartWidth + paddingX;
  const totalHeight = chartHeight + paddingY;

  if (props?.colour?.topLeftBackground != null) {
    backgrounds.push(
      `<rect width="${totalWidth / 2}" height="${totalHeight / 2}" x="0" y="0" fill="${
        props?.colour?.topLeftBackground
      }" />`,
    );
  }
  if (props?.colour?.topRightBackground != null) {
    backgrounds.push(`<rect width="${totalWidth / 2}" height="${totalHeight / 2}" x="${totalWidth / 2}" y="0"
      fill="${props?.colour?.topRightBackground}" />`);
  }
  if (props?.colour?.bottomLeftBackground != null) {
    backgrounds.push(`<rect width="${totalWidth / 2}" height="${totalHeight / 2}" x="0" y="${totalHeight / 2}"
      fill="${props?.colour?.bottomLeftBackground}" />`);
  }
  if (props?.colour?.bottomRightBackground != null) {
    backgrounds.push(`<rect width="${totalWidth / 2}" height="${totalHeight / 2}" x="${totalWidth / 2}" y="${
      totalHeight / 2
    }"
      fill="${props?.colour?.bottomRightBackground}" />`);
  }

  return `<g id="area-backgrounds">${backgrounds.join('\n')}</g>`;
};
