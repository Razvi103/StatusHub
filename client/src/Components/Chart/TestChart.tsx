import React, { useEffect, useRef } from 'react';
import 'chart.js/auto'
import { Bar, Doughnut, Line } from 'react-chartjs-2'


const MyComponent: React.FC = () => {

  return (
    <div>
      <h1>Bar Chart Example</h1>
      <Bar data={{
        labels: ["A", "B", "C"],
        datasets: [
            {
                label: "Test",
                data: [100, 200, 300]
            },
            {
                label: "Test1",
                data: [455, 100, 300]
            }
        ]
      }}
      
      />
    </div>
  );
};

export default MyComponent;