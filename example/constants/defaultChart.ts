import { SwatChartConfig } from '../../dist';

export const defaultChartConfig: SwatChartConfig = {
  chart: {
    width: 800,
    height: 400,
    borderRadius: 0,
    fontFamily: 'Quicksand',
    lineWidth: 3,
    padding: { x: 20, y: 20 },
    arrowWidth: 5,
  },
  colour: {
    stroke: '#303030',
    backgroundFill: '#FFFFFF',
    topLeftBackground: '#FFFFDF',
    topRightBackground: '#DFFFDF',
    bottomLeftBackground: '#FFDFDF',
    bottomRightBackground: '#DFFFFF',
  },
  gridLines: {
    spacing: 10,
    x: [
      { percent: 25, colour: '#000000' },
      { percent: 55, colour: '#000000', dashArray: '5 3' },
      { percent: 75, opacity: 0.7, colour: 'red', dashArray: '30 10' },
    ],
    y: [{ percent: 75, opacity: 0.05, colour: 'blue', dashArray: '30 5' }],
  },
  ticks: {
    height: 10,
    width: 2,
    textPadding: 3,
    x: [
      { percent: 0, label: 'Weaknesses', textAnchor: 'left', hideTick: true },
      { percent: 25, label: 'Testing' },
      { percent: 75, label: '' },
      { percent: 100, label: 'Strengths', textAnchor: 'end', hideTick: true },
    ],
    y: [
      { percent: 100, label: 'Threats', hideTick: true },
      { percent: 75, label: '' },
      { percent: 25, label: '25%' },
      { percent: 0, label: 'Opportunities', hideTick: true },
    ],
  },
  point: {
    radius: 3,
    points: [
      {
        percent: {
          x: 15,
          y: 2,
        },
        label: 'This is a heading',
        colour: '#000000',
        radius: 0,
        fontSize: 20,
      },
      {
        percent: {
          x: 55,
          y: 22,
        },
        label: 'Ideal project',
        colour: '#36f036',
      },
      {
        percent: {
          x: 30,
          y: 15,
        },
        label: 'Only if we need this project',
        colour: '#acac06',
      },
      {
        percent: {
          x: 75,
          y: 75,
        },
        label: 'Better be a good project',
        colour: '#FFA500',
      },
      {
        percent: {
          x: 20,
          y: 80,
        },
        label: "Don't even think about it",
        colour: '#FF0000',
      },
    ],
  },
};
