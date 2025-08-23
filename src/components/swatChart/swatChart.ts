import { SwatChartConfig } from '@/contracts/swatChartConfig';
import { setupDefs, wrapWithSvgTag } from './svgSetup';
import { swatBackgrounds } from './swatBackgrounds';
import { swatGraph } from './swatGraph';
import { SwatChartDefaults } from '@/contracts/swatChartsDefaults';
import { swatGridLines } from './swatGridLines';
import { swatTicks } from './swatTicks';
import { swatPoints } from './swatPoints';

export const generateSwatChart = (config: SwatChartConfig) => {
  const paddingX = config.chart?.padding?.x ?? SwatChartDefaults.padding.x;
  const paddingY = config.chart?.padding?.y ?? SwatChartDefaults.padding.y;
  const svgPadding = `translate(${paddingX / 2}, ${paddingY / 2})`;

  const contentArr: Array<string> = [
    setupDefs({
      chart: config.chart,
      colour: config.colour,
    }),
    swatBackgrounds({
      chart: config.chart,
      colour: config.colour,
    }),
    swatGraph({
      chart: config.chart,
      colour: config.colour,
    }),
    swatGridLines({
      chart: config.chart,
      colour: config.colour,
      gridLines: config.gridLines,
    }),

    `<g id="swat" transform="${svgPadding}">`,
    swatTicks({
      chart: config.chart,
      colour: config.colour,
      ticks: config.ticks,
    }),
    swatPoints({
      chart: config.chart,
      colour: config.colour,
      point: config.point,
    }),
    `</g>`,
  ];

  return wrapWithSvgTag({
    chart: config.chart,
    content: contentArr.join('\n'),
  });
};
