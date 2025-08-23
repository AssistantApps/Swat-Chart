import { SwatChartColour } from '@/contracts/swatChartColour';
import { SwatChartContentConfig } from '@/contracts/swatChartContentConfig';
import { SwatChartPointConfig } from '@/contracts/swatChartPoint';
import { SwatChartDefaults } from '@/contracts/swatChartsDefaults';

export const swatPoints = (props: {
  chart?: SwatChartContentConfig; //
  point?: SwatChartPointConfig;
  colour?: SwatChartColour;
}) => {
  const lines: Array<string> = [];

  const chartWidth = props.chart?.width ?? SwatChartDefaults.chart.width;
  const chartHeight = props.chart?.height ?? SwatChartDefaults.chart.height;
  const chartStroke = props.colour?.stroke ?? SwatChartDefaults.colour.stroke;
  const lineWidth = props.chart?.lineWidth ?? SwatChartDefaults.lineWidth;
  const pointRadius = props.point?.radius ?? SwatChartDefaults.points.radius;

  for (const point of props.point?.points ?? []) {
    const localPointRadius = point.radius ?? pointRadius;
    const xCoord = (chartWidth * point.percent.x) / 100;
    const yCoord = (chartHeight * point.percent.y) / 100;
    lines.push(
      `<circle 
        cx="${xCoord}"
        cy="${yCoord}"
        r="${localPointRadius}" 
        fill="${point.colour ?? chartStroke}" />`,
    );

    lines.push(
      `<text y="${(chartHeight * point.percent.y) / 100}"
        x="${xCoord + lineWidth + localPointRadius}" fill="${point.colour ?? chartStroke}"
        text-anchor="left" 
        alignment-baseline="middle"
        font-size="${point.fontSize ?? SwatChartDefaults.fontSize}"
        font-family="${props?.chart?.fontFamily}">${point.label}</text>`,
    );
  }

  return `<g id="points">${lines.join('\n')}</g>`;
};
