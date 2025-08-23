export const DEFAULT_WIDTH = 800;

export const SwatChartDefaults = {
  chart: {
    width: 1920,
    height: 1080,
    radius: 10,
  },
  padding: {
    y: 5,
    x: 5,
  },
  lineWidth: 3,
  tickWidth: 3,
  tickHeight: 9,
  tickTextPadding: 9,
  fontSize: 10,
  colour: {
    backgroundFill: '#AFAFAF',
    stroke: '#000000',
  },
  gridLines: {
    spacing: 5,
  },
  points: {
    radius: 3,
  },
} as const;
