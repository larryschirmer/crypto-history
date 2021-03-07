import { select } from 'd3-selection';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import { line, area, curveMonotoneX } from 'd3-shape';
import { brushX } from 'd3-brush';
import sub from 'date-fns/sub';

import { History } from '@redux/history/types';

import { Dimensions, Margin } from './types';

type Chart = {
  dimensions: Dimensions;
  margin: Margin;
  chart: SVGSVGElement;
  data?: History;
  rooted?: boolean;
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

  focus.append('path').attr('class', 'line');
  context.append('path').attr('class', 'area');
  context.append('g').attr('class', 'context-brush');
};

export const updateChart = (props: Chart): void => {
  const { dimensions, margin, chart, data, rooted = false } = props;
  const chartData = data.map(({ day, portfolio }) => ({
    day: new Date(day),
    total: portfolio.reduce((sum, { amount, value }) => sum + Number(amount) * Number(value), 0),
  }));
  type Datum = typeof chartData[number];

  const svg = select(chart);
  const focusChart = svg.selectAll('.line');
  const focusAxixX = svg.selectAll('.focus-axis-x');
  const focusAxisY = svg.selectAll('.focus-axis-y');
  const contextChart = svg.selectAll('.area');
  const contextAxisX = svg.selectAll('.context-axis-x');
  const contextBrush = svg.selectAll('.context-brush');

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

  const [minDate, maxDate] = extent(chartData.map(({ day }) => day));
  const [minTotal, maxTotal] = extent(chartData.map(({ total }) => total));
  const defaultDomainRange = [sub(maxDate, { weeks: 1 }), maxDate];

  const scaleFocusX = scaleTime().domain(defaultDomainRange).range([0, size.focus.width]);
  const scaleFocusY = scaleLinear()
    .domain([rooted ? 0 : minTotal, maxTotal])
    .range([size.focus.height, 0]);
  const scaleContextX = scaleTime().domain([minDate, maxDate]).range([0, size.context.width]);
  const scaleContextY = scaleLinear().domain([minTotal, maxTotal]).range([size.context.height, 0]);

  const focusLine = line<Datum>()
    .x(({ day }) => scaleFocusX(day))
    .y(({ total }) => scaleFocusY(total))
    .curve(curveMonotoneX);
  const contextArea = area<Datum>()
    .x(({ day }) => scaleContextX(day))
    .y0(size.context.height)
    .y1(({ total }) => scaleContextY(total))
    .curve(curveMonotoneX);

  const defaultBrushSelection = defaultDomainRange.map(scaleContextX);
  const contextBrushArea = brushX<Datum>().extent([
    [margin.context.left, 0.5],
    [dimensions.context.width - margin.context.right, size.context.height + 0.5],
  ]);

  const xAxisFocus = axisBottom(scaleFocusX).ticks(5);
  const yAxisFocus = axisLeft(scaleFocusY);
  const xAxisContext = axisBottom(scaleContextX).ticks(5);

  const renderedChartFocus = focusChart.data([chartData]);
  renderedChartFocus.exit().remove();
  renderedChartFocus.enter().append('path').attr('class', 'line');
  renderedChartFocus.attr('d', focusLine);
  const renderedChartContext = contextChart.data([chartData]);
  renderedChartContext.exit().remove();
  renderedChartContext.enter().append('path').attr('class', 'area');
  renderedChartContext.attr('d', contextArea);

  contextBrush.call(contextBrushArea).call(contextBrushArea.move, defaultBrushSelection);

  const brushed = ({ selection }: { selection: [number, number] }) => {
    if (selection) {
      scaleFocusX.domain(selection.map(scaleContextX.invert));
      renderedChartFocus.attr('d', focusLine);
      focusAxixX.call(axisBottom(scaleFocusX).ticks(5));
    }
  };
  contextBrushArea.on('brush', brushed);

  focusAxixX.call(xAxisFocus);
  focusAxisY.call(yAxisFocus);
  contextAxisX.call(xAxisContext);
};
