import React, { FC, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@redux/index';

import { setupChart, updateChart } from './chart';

import styles from './Chart.module.scss';

const { chart: chartClass } = styles;

const dimensions = {
  width: 350,
  height: 400,
  focus: {
    width: 350,
    height: 275,
  },
  context: {
    width: 310,
    height: 125,
  },
};
const margin = {
  focus: {
    top: 10,
    right: 10,
    bottom: 40,
    left: 40,
    offsetX: 0,
    offsetY: 0,
  },
  context: {
    top: 10,
    right: 10,
    bottom: 40,
    left: 0,
    offsetX: 40,
    offsetY: 275,
  },
};

const Chart: FC = () => {
  const chartRef = useRef<SVGSVGElement>();
  const { data } = useSelector(({ history }: RootState) => ({
    data: history.data,
  }));

  // setup chart
  useEffect(() => {
    const chart = chartRef.current;
    setupChart({ dimensions, margin, chart });
  }, []);

  // update chart data
  useEffect(() => {
    const chart = chartRef.current;
    updateChart({ dimensions, margin, chart, data });
  }, [data]);

  return (
    <div className={chartClass}>
      <svg ref={chartRef} width={dimensions.width} height={dimensions.height} />
    </div>
  );
};

export default Chart;
