import React, { lazy, Suspense } from 'react';
const ReactApexChart = lazy(() => import('react-apexcharts'));

function Gauge({ value = 200, title = '' }) {
  const MAX_LIMIT = 1;

  const options = {
    chart: {
      type: 'gauge',
      height: 350,
    },
    plotOptions: {
      radialBar: {
        shape: 'needle',
        startAngle: -135,
        endAngle: 135,
        min: 200,
        max: 900,
        bands: [
          { from: 200, to: 600, color: '#FF4560' },

          { from: 600, to: 820, color: '#00E396' },
          { from: 820, to: 850, color: '#FEB019' },
          { from: 850, to: 900, color: '#FF4560' },
        ],

        bandsStyle: {
          strokeWidth: '50%',
          gap: 2,
        },
        ticks: {
          show: true,
          major: {
            count: 8,
            length: 12,
            width: 1,
            color: '#fff',
            placement: 'outside',
          },
          minor: {
            count: 10,
            length: 1,
            width: 1,
            color: '#000',
            placement: 'outside',
          },
          labels: {
            show: true,
            offset: 15,
            fontSize: '15px',
            color: '#fff',
          },
        },
        needle: {
          color: '#fff',
          length: '80%',
          baseWidth: 6,
          tipWidth: 1,
        },
        hollow: {
          margin: 0,
          size: '70%',
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 32,
            fontSize: '28px',
            color: '#fff',
            fontWeight: 700,
            formatter: function (val) {
              return val;
            },
          },
        },
      },
    },
    labels: [title],
  };

  const chartValue = value / MAX_LIMIT;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={[chartValue]}
          type="gauge"
          height={350}
        />
        <div className="pb-2 text-center text-white">
          {value < 599 ? (
            'غیرعادی'
          ) : value >= 600 ? (
            <p className="m-auto w-fit rounded-[10px] bg-green-500 px-2 py-1 text-white">
              عادی
            </p>
          ) : value >= 820 ? (
            <p className="m-auto w-fit rounded-[10px] bg-red-500 px-2 py-1 text-white">
              غیر عادی
            </p>
          ) : value > 850 ? (
            'خطرناک'
          ) : value === 0 ? (
            <p>خاموش</p>
          ) : (
            ''
          )}
        </div>
      </div>
    </Suspense>
  );
}

export default Gauge;
