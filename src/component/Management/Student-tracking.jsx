import React, { useEffect, useRef, useState } from 'react';
import {
  runAllCounters, renderPieChart
} from '../../assets/js/main.js';
import './management.css'
import '../../assets/css/animation.css'

function Studenttracking() {
  const dummyData = {
    today: [20, 5, 2],
    weekly: [120, 15, 5],
    monthly: [500, 40, 20],
    yearly: [6000, 500, 100],
  };

  const chartsRef = useRef({});
  const [selectedRange,] = useState('today');

  useEffect(() => {
    runAllCounters(200);
    const timer = setTimeout(() => {
      chartsRef.current = initCharts();
    }, 50);

    return () => {
      clearTimeout(timer);
      if (chartsRef.current.feeChart) chartsRef.current.feeChart.destroy();
      if (chartsRef.current.performanceChart) chartsRef.current.performanceChart.destroy();
    };
  }, []);

  useEffect(() => {
  // Destroy old charts
  const existing = document.querySelectorAll('[data-chart-id]');
  existing.forEach((canvas) => {
    if (canvas.chartInstance) {
      canvas.chartInstance.destroy();
    }
  });

  document.querySelectorAll('[data-chart-id]').forEach((canvas) => {
    const chartId = canvas.getAttribute('data-chart-id');
    const ctx = canvas.getContext('2d');

    if (chartId === 'chart1') {
      canvas.chartInstance = renderPieChart(ctx, dummyData[selectedRange], false); 
    } else if (chartId === 'chart2') {
      canvas.chartInstance = renderPieChart(ctx, dummyData[selectedRange], true); 
    }
  });
}, [selectedRange]);

  return (
    <div className="student-tracking">
      <div className="cardBox fadeInUp">
        <div className="card fade-in">
          <div>
            <div className="numbers" data-target="1504">0</div>
            <div className="cardName"> Total Students</div>
          </div>
          <div className="iconBx"><i className="fas fa-user-graduate"></i></div>
        </div>
        <div className="card fade-in">
          <div>
            <div className="numbers" data-target="40">0</div>
            <div className="cardName">Present Today</div>
          </div>
          <div className="iconBx"><i className="fas fa-user-check"></i></div>
        </div>
        <div className="card fade-in">
          <div>
            <div className="numbers" data-target="70">0</div>
            <div className="cardName">Absent Today</div>
          </div>
          <div className="iconBx"><i className="fas fa-minus-circle"></i></div>
        </div>
        <div className="card fade-in">
          <div>
            <div className="numbers" data-target="70">0</div>
            <div className="cardName">Overall Attendance</div>
          </div>
          <div className="iconBx"><i className="fas fa-calendar-check"></i></div>
        </div>
      </div>

      {/* Double Charts */}
      <div className="Tracking-charts">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-12 md:col-span-6">
            <div className='Low-attendance' style={{ maxWidth: '400px', margin: 'auto' }}>
              <div className="flex justify-around Low-main">
                <div className="Heading text-lg">
                  <h3 className='heading'>Low Attendance</h3>
                </div>
              </div>
              <canvas data-chart-id="chart1" width={300} height={300}></canvas>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-12 md:col-span-6">
            <div className='Low-attendance' style={{ maxWidth: '400px', margin: 'auto' }}>
              <div className="flex justify-around Low-main">
                <div className="Heading text-lg">
                  <h3 className='heading'>Another Donut</h3>
                </div>
              </div>
              <canvas data-chart-id="chart2" width={300} height={300}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Studenttracking;
