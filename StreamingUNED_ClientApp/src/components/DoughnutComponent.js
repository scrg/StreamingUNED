import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { render } from 'react-dom';
import { Doughnut } from 'react-chartjs-2'


export const DoughnutComponent = (props) => {


  return (
    <>
      <Doughnut data={
        {
          labels: ['Red', 'Green', 'Blue'],
          datasets: [
            {
              data: [5, 7, 6],
              backgroundColor: ['red', 'green', 'blue']
            }
          ]
        }
      } />
    </>
  )
}

export default DoughnutComponent;