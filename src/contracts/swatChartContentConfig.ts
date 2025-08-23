/**
 * Configuration options for rendering a SWAT chart's visual content.
 */
export type SwatChartContentConfig = {
  /**
   * Width of the chart.
   */
  width?: number;

  /**
   * Height of the chart.
   */
  height?: number;

  /**
   * Padding around the chart content.
   */
  padding?: {
    /**
     * Vertical padding.
     */
    y?: number;

    /**
     * Horizontal padding.
     */
    x?: number;
  };

  /**
   * Inline CSS styles to apply directly to the SVG.
   * Keys are CSS property names in kebab-case.
   */
  inLineStyles?: Record<string, string | number>;

  /**
   * BorderRadius of the SVG element.
   */
  borderRadius?: number;

  /**
   * Stroke width for the X and Y axis lines of the chart.
   */
  lineWidth?: number;

  /**
   * Width of arrowheads on the ends of the X and Y axis lines of the chart.
   */
  arrowWidth?: number;

  /**
   * Font family used for text labels.
   * Example: "Arial", "Helvetica", "sans-serif"
   */
  fontFamily?: string;

  /**
   * Font size for text labels.
   */
  fontSize?: number;
};
