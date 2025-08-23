import { SwatChartColour } from '@/contracts/swatChartColour';
import { SwatChartContentConfig } from '@/contracts/swatChartContentConfig';
import { SwatChartDefaults } from '@/contracts/swatChartsDefaults';

export const swatGraph = (props: {
  chart?: SwatChartContentConfig; //
  colour?: SwatChartColour;
}) => {
  const chartWidth = props.chart?.width ?? SwatChartDefaults.chart.width;
  const chartHeight = props.chart?.height ?? SwatChartDefaults.chart.height;
  const paddingX = props.chart?.padding?.x ?? SwatChartDefaults.padding.x;
  const paddingY = props.chart?.padding?.y ?? SwatChartDefaults.padding.y;
  const lineWidth = props.chart?.lineWidth ?? SwatChartDefaults.lineWidth;
  const chartStroke = props.colour?.stroke ?? SwatChartDefaults.colour.stroke;

  const totalWidth = chartWidth + paddingX;
  const halfWidth = totalWidth / 2;
  const totalHeight = chartHeight + paddingY;
  const halfHeight = totalHeight / 2;

  const arrowCenter = props.chart?.arrowWidth ?? lineWidth * 2;
  const arrowHeight = arrowCenter * 1.5;

  // const debugLines = [
  //     `<line id="debug-y-axis" x1="${halfWidth}" y1="0" x2="${halfWidth}" y2="${totalHeight}" stroke="#ff0000" stroke-width="1" />`,
  //     `<line id="debug-x-axis" x1="0" y1="${halfHeight}" x2="${totalWidth}" y2="${halfHeight}" stroke="#ff0000" stroke-width="1" />`,
  //   ];

  return `<g id="graph">
    <use href="#arrow" x="${halfWidth - arrowCenter}" y="0" />
    <use href="#arrow" x="${halfHeight - arrowCenter}" y="${-totalWidth}" style="transform: rotate(90deg)" />
    <use href="#arrow" x="${-halfWidth - arrowCenter}" y="${-totalHeight}"
      style="transform: rotate(180deg)" />
    <use href="#arrow" x="${-halfHeight - arrowCenter}" y="0" style="transform: rotate(270deg)" />

    <rect id="x-axis" width="${totalWidth - arrowHeight * 2}" height="${lineWidth}" x="${arrowHeight}"
      y="${(totalHeight - lineWidth) / 2}" fill="${chartStroke}" />
    <rect id="y-axis" width="${lineWidth}" height="${totalHeight - arrowHeight * 2}"
      x="${(totalWidth - lineWidth) / 2}" y="${arrowHeight}" fill="${chartStroke}" />
  </g>`;
};
