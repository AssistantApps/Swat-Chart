/**
 * Options for rendering a "tick" on the SWAT chart.
 * A "tick" is the line on the axis representing a value on that axis.
 */
export type SwatChartTick = {
  /**
   * Text to be displayed.
   */
  label: string;
  /**
   * Colour of the tick.
   */
  colour?: string;
  /**
   * Hide the "tick" (line on the axis).
   */
  hideTick?: boolean;
  /**
   * Size of the text.
   */
  fontSize?: number;
  /**
   * Position of the text.
   */
  textAnchor?: 'left' | 'middle' | 'end';
};
export type SwatChartXTick = SwatChartTick & {
  /**
   * Percentage from the left.
   * 0% is far left.
   * 100% is the far right side.
   */
  percent: number;
};
export type SwatChartYTick = SwatChartTick & {
  /**
   * Percentage from the top.
   * 0% is at the top.
   * 100% is at the bottom.
   */
  percent: number;
};

/**
 * Options for configuring "ticks" on the SWAT chart.
 * A "tick" is the line on the axis representing a value on that axis.
 */
export type SwatChartTickConfig = {
  /**
   * Width of a "tick".
   * On the X axis of the chart, this value controls the height of the rectangle (tick)
   */
  width?: number;
  /**
   * Height of a "tick".
   * On the X axis of the chart, this value controls the width of the rectangle (tick)
   */
  height?: number;
  /**
   * Additional control on how far the label should be from the tick.
   */
  textPadding?: number;
  /**
   * Ticks for the X axis.
   */
  x?: Array<SwatChartXTick>;
  /**
   * Ticks for the Y axis.
   */
  y?: Array<SwatChartYTick>;
};
