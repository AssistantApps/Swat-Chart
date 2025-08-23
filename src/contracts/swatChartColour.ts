/**
 * Colour options for rendering a SWAT chart's visual content.
 */
export type SwatChartColour = {
  /**
   * SVG's background colour.
   */
  backgroundFill?: string;
  /**
   * Top Left background colour. e.g. #ffff0020
   */
  topLeftBackground?: string;
  /**
   * Top Right background colour. e.g. #00ff0020
   */
  topRightBackground?: string;
  /**
   * Bottom Left background colour. e.g. #ff000020
   */
  bottomLeftBackground?: string;
  /**
   * Bottom Right background colour. e.g. #00ffff20
   */
  bottomRightBackground?: string;
  /**
   * Colour of the X and Y axis lines as well as the colour of the ticks.
   */
  stroke?: string;
};
