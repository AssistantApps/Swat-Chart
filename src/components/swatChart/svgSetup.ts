import { SwatChartColour } from '@/contracts/swatChartColour';
import { SwatChartContentConfig } from '@/contracts/swatChartContentConfig';
import { SwatChartDefaults } from '@/contracts/swatChartsDefaults';

export const wrapWithSvgTag = (props: {
  chart?: SwatChartContentConfig; //
  content: string;
}) => {
  const chartWidth = props.chart?.width ?? SwatChartDefaults.chart.width;
  const chartHeight = props.chart?.height ?? SwatChartDefaults.chart.height;
  const chartRadius = props.chart?.borderRadius ?? SwatChartDefaults.chart.radius;
  const paddingX = props.chart?.padding?.x ?? SwatChartDefaults.padding.x;
  const paddingY = props.chart?.padding?.y ?? SwatChartDefaults.padding.y;

  const viewBoxValue = `0 0 ${chartWidth + paddingX} ${chartHeight + paddingY}`;
  let svgStyleRecord = props.chart?.inLineStyles ?? {};
  if (svgStyleRecord['border-radius'] == null) {
    svgStyleRecord['border-radius'] = `${chartRadius}px`;
  }
  const svgStyle = Object.keys(svgStyleRecord)
    .map((key) => `${key}: ${(svgStyleRecord[key] ?? '').toString().replace(';', '')};`)
    .join(' ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBoxValue}" style="${svgStyle}">${props.content}</svg>`;
};

export const setupDefs = (props: {
  chart?: SwatChartContentConfig; //
  colour?: SwatChartColour;
}) => {
  const lineWidth = props.chart?.lineWidth ?? SwatChartDefaults.lineWidth;
  const chartStroke = props.colour?.stroke ?? SwatChartDefaults.colour.stroke;

  const arrowCenter = props.chart?.arrowWidth ?? lineWidth * 2;
  const arrowHeight = arrowCenter * 1.5;
  const arrowPoints = [`${arrowCenter},0`, `${arrowCenter * 2},${arrowHeight}`, `0,${arrowHeight}`].join(' ');

  return `<defs>
    <polygon id="arrow" points="${arrowPoints}" fill="${chartStroke}" />
  </defs>`;
};

export const setupBackground = (props: {
  chart?: SwatChartContentConfig; //
  colour?: SwatChartColour;
}) => {
  const chartWidth = props.chart?.width ?? SwatChartDefaults.chart.width;
  const chartHeight = props.chart?.height ?? SwatChartDefaults.chart.height;
  const chartRadius = props.chart?.borderRadius ?? SwatChartDefaults.chart.radius;
  const paddingX = props.chart?.padding?.x ?? SwatChartDefaults.padding.x;
  const paddingY = props.chart?.padding?.y ?? SwatChartDefaults.padding.y;
  const backgroundFill = props.colour?.backgroundFill ?? SwatChartDefaults.colour.backgroundFill;

  return `<g id="background">
    <rect width="${chartWidth + paddingX}" height="${chartHeight + paddingY}" x="0" y="0" rx="${chartRadius}"
      fill="${backgroundFill}" />
  </g>`;
};
