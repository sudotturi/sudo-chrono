import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getLastWeekDates } from '@/utils/constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Project Hours Over Time',
    },
  },
  maintainAspectRatio: false 
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data2 = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [2,46,3,26,3],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [2,46,3,26,3],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function BarChart({data}) {
  const xAxis = [];
  const datasets = [];
  Object.values(data).map((item)=> {
    datasets.push(item);
  })
  xAxis.labels = getLastWeekDates();
  xAxis.datasets = datasets;
  data2.labels = getLastWeekDates();
  return <Bar height={450} options={options} data={xAxis} />;
}
