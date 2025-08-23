import { SwatChartColour } from './swatChartColour';
import { SwatChartContentConfig } from './swatChartContentConfig';
import { SwatChartGridLineConfig } from './swatChartGridLine';
import { SwatChartPointConfig } from './swatChartPoint';
import { SwatChartTickConfig } from './swatChartTick';

/**
 * Configuration options for rendering a SWAT chart.
 */
export type SwatChartConfig = {
  chart?: SwatChartContentConfig;
  colour?: SwatChartColour;
  point?: SwatChartPointConfig;
  gridLines?: SwatChartGridLineConfig;
  ticks?: SwatChartTickConfig;
};
