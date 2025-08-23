import { SwatChartColour } from '@/contracts/swatChartColour';
import { SwatChartContentConfig } from '@/contracts/swatChartContentConfig';
import { SwatChartGridLineConfig } from '@/contracts/swatChartGridLine';
import { SwatChartDefaults } from '@/contracts/swatChartsDefaults';

export const swatGridLines = (props: {
  chart?: SwatChartContentConfig; //
  gridLines?: SwatChartGridLineConfig;
  colour?: SwatChartColour;
}) => {
  const lines: Array<string> = [];

  const chartWidth = props.chart?.width ?? SwatChartDefaults.chart.width;
  const chartHeight = props.chart?.height ?? SwatChartDefaults.chart.height;
  const paddingX = props.chart?.padding?.x ?? SwatChartDefaults.padding.x;
  const paddingY = props.chart?.padding?.y ?? SwatChartDefaults.padding.y;
  const chartStroke = props.colour?.stroke ?? SwatChartDefaults.colour.stroke;
  const gridLineSpacing = props.gridLines?.spacing ?? SwatChartDefaults.gridLines.spacing;

  const halfPaddingX = paddingX / 2;
  const halfPaddingY = paddingY / 2;
  const halfGridLineSpacing = gridLineSpacing / 2;

  for (const gridLine of props.gridLines?.x ?? []) {
    lines.push(
      `<line x1="${(chartWidth * gridLine.percent) / 100}" y1="${-halfPaddingY + halfGridLineSpacing}"
        x2="${(chartWidth * gridLine.percent) / 100}" y2="${chartHeight + halfPaddingY - halfGridLineSpacing}"
        stroke="${gridLine.colour ?? chartStroke}" opacity="${gridLine.opacity ?? 0.1}"
        ${gridLine.dashArray != null ? `stroke-dasharray="${gridLine.dashArray}"` : ''}
        stroke-width="1" />`,
    );
  }
  for (const gridLine of props.gridLines?.y ?? []) {
    lines.push(
      `<line y1="${(chartHeight * gridLine.percent) / 100}" x1="${-halfPaddingX + halfGridLineSpacing}"
        y2="${(chartHeight * gridLine.percent) / 100}" x2="${chartWidth + halfPaddingX - halfGridLineSpacing}"
        stroke="${gridLine.colour ?? chartStroke}" opacity="${gridLine.opacity ?? 0.1}"
        ${gridLine.dashArray != null ? `stroke-dasharray="${gridLine.dashArray}"` : ''}
        stroke-width="1" />`,
    );
  }

  return `<g id="grid-lines" transform="translate(${halfPaddingX} ${halfPaddingY})">
    ${lines.join('\n')}
  </g>`;
};
