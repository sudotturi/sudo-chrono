'use client' // if you use app dir, don't forget this line
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Label } from 'flowbite-react';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const completeData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],

      borderWidth: 1,
    },
  ],
  options: {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgb(255, 99, 132)'
        }
      }
    }
  }
};
const borderCol = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
]
const colors = ['rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',];


export default function ProjectHoursChart({ data }) {
  completeData.labels = Object.keys(data);
  const backgroundColor = []
  const borderColor = []
  let currentIndex = 0;
  let currentBorderIndex = 0;
  function pickNextBorderColor() {
    // Get the current color
    const currentColor = borderCol[currentBorderIndex];

    // Increment the index for the next pick
    currentBorderIndex = (currentBorderIndex + 1) % borderCol.length;

    return currentColor;
  }
  function pickNextColor() {
    // Get the current color
    const currentColor = colors[currentIndex];

    // Increment the index for the next pick
    currentIndex = (currentIndex + 1) % colors.length;

    return currentColor;
  }

  Object.values(data).map((item, ind) => {
    backgroundColor.push(pickNextColor());
    borderColor.push(pickNextBorderColor());
  })
  console.log(borderColor)
  completeData.datasets = [{ data: Object.values(data), backgroundColor, borderColor }]
  const options = {
    plugins: {

    }
  }
  return (
    <div className='flex gap-2 p-2  flex-col text-center '>
      <Label className=''>
        Projects vs Hours
      </Label>
      <div className='flex flex-wrap w-full' >
        <div className='w-full md:w-1/2'>
          <Doughnut options={options} data={completeData} />
          <Label className=''>
            Doughnut Chart
          </Label>
        </div>
        <div className='w-full md:w-1/2'>
          <Pie options={options} data={completeData} />
          <Label className=''>
            Pie Chart
          </Label>
        </div>
      </div>
    </div>
  )

}