import { select } from 'd3-selection';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import { line, area, curveMonotoneX } from 'd3-shape';

import { History } from '@redux/history/types';

import { Dimensions, Margin } from './types';

type Chart = {
  dimensions: Dimensions;
  margin: Margin;
  chart: SVGSVGElement;
  data?: History;
};
export const setupChart = (props: Chart): void => {
  const { dimensions, margin, chart } = props;

  const offset = {
    focus: {
      top: margin.focus.offsetY + margin.focus.top,
      left: margin.focus.offsetX + margin.focus.left,
    },
    context: {
      top: margin.context.offsetY + margin.context.top,
      left: margin.context.offsetX + margin.context.left,
    },
  };
  const size = {
    focus: {
      width: dimensions.focus.width - margin.focus.left - margin.focus.right,
      height: dimensions.focus.height - margin.focus.top - margin.focus.bottom,
    },
    context: {
      width: dimensions.context.width - margin.context.left - margin.context.right,
      height: dimensions.context.height - margin.context.top - margin.context.bottom,
    },
  };

  const svg = select(chart);
  const focus = svg
    .append('g')
    .attr('class', 'focus')
    .attr('transform', `translate(${offset.focus.left}, ${offset.focus.top})`);
  const context = svg
    .append('g')
    .attr('class', 'context')
    .attr('transform', `translate(${offset.context.left}, ${offset.context.top})`);

  focus
    .append('g')
    .attr('class', 'focus-axis-x')
    .attr('transform', `translate(0, ${size.focus.height})`);
  focus.append('g').attr('class', 'focus-axis-y');
  context
    .append('g')
    .attr('class', 'context-axis-x')
    .attr('transform', `translate(0, ${size.context.height})`);
};

export const updateChart = (props: Chart): void => {
  const { dimensions, margin, chart, data } = props;
  const chartData = data.map(({ day, portfolio }) => ({
    day: new Date(day),
    total: portfolio.reduce((sum, { amount, value }) => sum + Number(amount) * Number(value), 0),
  }));

  const svg = select(chart);
  const focus = svg.selectAll('.focus');
  const focusAxixX = svg.selectAll('.focus-axis-x');
  const focusAxisY = svg.selectAll('.focus-axis-y');
  const context = svg.selectAll('.context');
  const contextAxisX = svg.selectAll('.context-axis-x');

  const size = {
    focus: {
      width: dimensions.focus.width - margin.focus.left - margin.focus.right,
      height: dimensions.focus.height - margin.focus.top - margin.focus.bottom,
    },
    context: {
      width: dimensions.context.width - margin.context.left - margin.context.right,
      height: dimensions.context.height - margin.context.top - margin.context.bottom,
    },
  };

  const scaleFocusX = scaleTime()
    .domain(extent(chartData.map(({ day }) => day)))
    .range([0, size.focus.width]);
  const scaleFocusY = scaleLinear()
    .domain(extent(chartData.map(({ total }) => total)))
    .range([size.focus.height, 0]);
  const scaleContextX = scaleTime()
    .domain(extent(chartData.map(({ day }) => day)))
    .range([0, size.context.width]);
  const scaleContextY = scaleLinear()
    .domain(extent(chartData.map(({ total }) => total)))
    .range([size.context.height, 0]);

  const focusLine = line<typeof chartData[number]>()
    .x(({ day }) => scaleFocusX(day))
    .y(({ total }) => scaleFocusY(total))
    .curve(curveMonotoneX);
  const contextArea = area<typeof chartData[number]>()
    .x(({ day }) => scaleContextX(day))
    .y0(size.context.height)
    .y1(({ total }) => scaleContextY(total))
    .curve(curveMonotoneX);

  const xAxisFocus = axisBottom(scaleFocusX);
  const yAxisFocus = axisLeft(scaleFocusY);
  const xAxisContext = axisBottom(scaleContextX);

  const renderedChartFocus = focus.selectAll('.line').data([chartData]);
  renderedChartFocus.exit().remove();
  renderedChartFocus.enter().append('path').attr('class', 'line');
  renderedChartFocus.attr('d', focusLine);
  const renderedChartContext = context.selectAll('.area').data([chartData]);
  renderedChartContext.exit().remove();
  renderedChartContext.enter().append('path').attr('class', 'area');
  renderedChartContext.attr('d', contextArea);

  focusAxixX.call(xAxisFocus);
  focusAxisY.call(yAxisFocus);
  contextAxisX.call(xAxisContext);
};
