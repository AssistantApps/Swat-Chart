/**
 * Options for rendering a point on the SWAT chart.
 */
export type SwatChartPoint = {
  /**
   * Text to be displayed.
   */
  label: string;
  /**
   * Colour of the text.
   */
  colour?: string;
  /**
   * Position of the point on the chart.
   */
  percent: {
    /**
     * Percentage from the left.
     * 0% is far left.
     * 100% is the far right side.
     */
    x: number;
    /**
     * Percentage from the top.
     * 0% is at the top.
     * 100% is at the bottom.
     */
    y: number;
  };
  /**
   * Size of the point.
   * This overrides the size provided for all points.
   */
  radius?: number;
  /**
   * Size of the text.
   */
  fontSize?: number;
};
export type SwatChartPointConfig = {
  /**
   * Size of all the points.
   */
  radius?: number;
  /**
   * List of points to display.
   */
  points: Array<SwatChartPoint>;
};
