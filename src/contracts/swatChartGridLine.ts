/**
 * Options for rendering of a grid line in the SWAT chart.
 */
export type SwatChartGridLine = {
  /**
   * Colour of the grid line.
   */
  colour?: string;
  /**
   * Level of visibility of the grid line.
   */
  opacity?: number;
  /**
   * SVG property that allows customising the frequency of the dashes in a line.
   * @default '5 3'
   */
  dashArray?: string;
};

export type SwatChartXGridLine = SwatChartGridLine & {
  /**
   * Percentage from the left.
   * 0% is far left.
   * 100% is the far right side.
   */
  percent: number;
};

export type SwatChartYGridLine = SwatChartGridLine & {
  /**
   * Percentage from the top.
   * 0% is at the top.
   * 100% is at the bottom.
   */
  percent: number;
};

export type SwatChartGridLineConfig = {
  /**
   * Distance from the edge of the chart to where the grid line starts and ends.
   * For an X axis Grid line, this would start the line the specified units away from the top and bottom edge of the chart.
   */
  spacing?: number;
  /**
   * Grid lines on the X axis.
   */
  x?: Array<SwatChartXGridLine>;
  /**
   * Grid lines on the Y axis.
   */
  y?: Array<SwatChartYGridLine>;
};
