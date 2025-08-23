import { SwatChartColour } from '@/contracts/swatChartColour';
import { SwatChartContentConfig } from '@/contracts/swatChartContentConfig';
import { SwatChartDefaults } from '@/contracts/swatChartsDefaults';
import { SwatChartTickConfig } from '@/contracts/swatChartTick';

export const swatTicks = (props: {
  chart?: SwatChartContentConfig; //
  ticks?: SwatChartTickConfig;
  colour?: SwatChartColour;
}) => {
  const lines: Array<string> = [];

  const chartWidth = props.chart?.width ?? SwatChartDefaults.chart.width;
  const chartHeight = props.chart?.height ?? SwatChartDefaults.chart.height;
  const chartStroke = props.colour?.stroke ?? SwatChartDefaults.colour.stroke;
  const tickWidth = props.ticks?.width ?? SwatChartDefaults.tickWidth;
  const tickHeight = props.ticks?.height ?? SwatChartDefaults.tickHeight;
  const tickTextPadding = props.ticks?.textPadding ?? SwatChartDefaults.tickTextPadding;

  for (const tickX of props.ticks?.x ?? []) {
    const xTickHeight = tickHeight;
    const xTickWidth = tickWidth;

    if (tickX.hideTick != true) {
      lines.push(
        `<rect 
        x="${(chartWidth * tickX.percent) / 100 - xTickWidth / 2}"
        y="${chartHeight / 2 - xTickHeight / 2}" 
        width="${xTickWidth}" height="${xTickHeight}" fill="${chartStroke}" />`,
      );
    }

    let xPadding = 0;
    if (tickX.textAnchor == 'left') xPadding = tickTextPadding / 2;
    if (tickX.textAnchor == 'end') xPadding = -(tickTextPadding / 2);
    if (tickX.label.length > 0) {
      lines.push(`
        <text 
          x="${(chartWidth * tickX.percent) / 100 - xPadding}" 
          y="${chartHeight / 2 + tickTextPadding + xTickHeight / 2}"
          fill="${tickX.colour ?? chartStroke}" 
          text-anchor="${tickX.textAnchor ?? 'middle'}"
          alignment-baseline="hanging"
          font-size="${tickX.fontSize ?? SwatChartDefaults.fontSize}"
          font-family="${props?.chart?.fontFamily}">${tickX.label}
        </text>`);
    }
  }

  for (const tickY of props.ticks?.y ?? []) {
    const xCoord = chartWidth / 2;
    const yCoord = (chartHeight * tickY.percent) / 100;
    if (tickY.hideTick != true) {
      lines.push(
        `<rect 
        x="${xCoord - tickHeight / 2}" y="${yCoord - tickWidth / 2}"
        width="${tickHeight}" height="${tickWidth}" fill="${chartStroke}" />`,
      );
    }

    if (tickY.label.length > 0) {
      lines.push(`
        <text 
          x="${xCoord + tickTextPadding + tickHeight / 2}" y="${yCoord}" 
          fill="${tickY.colour ?? chartStroke}" 
          text-anchor="left" 
          alignment-baseline="middle"
          font-size="${tickY.fontSize ?? SwatChartDefaults.fontSize}"
          font-family="${props?.chart?.fontFamily}">${tickY.label}</text>`);
    }
  }

  return `<g id="ticks">${lines.join('\n')}</g>`;
};
