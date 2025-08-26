import { Component, createSignal } from 'solid-js';
import { generateSwatChart, SwatChartConfig } from '../../dist/swat.export';

import { defaultChartConfig } from '../constants/defaultChart';
import { Controls } from './controls';
import { Footer } from './footer';
import { NavBar } from './navBar';

export const TestShell: Component = () => {
  const [svgContent, setSvgContent] = createSignal<SwatChartConfig>(defaultChartConfig);

  const copyConfig = () => navigator.clipboard.writeText(JSON.stringify(svgContent()));

  return (
    <>
      <NavBar />
      <div class="display" innerHTML={generateSwatChart(svgContent())} />
      <Controls onChange={(func) => setSvgContent(func(svgContent()))} copyConfig={copyConfig} />
      <Footer />
    </>
  );
};
