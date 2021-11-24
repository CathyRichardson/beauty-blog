import './SkincareProductsList';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function RecommendedChart() {
    // TODO: get actual data from redux
    return (
        <div className="recommended-chart">

            <Bar
                data={{
                    labels: ['prod1', 'prod1', 'prod1', 'prod1', 'prod1', 'prod1'],
                    datasets: [
                        {
                            label: 'Recommended',
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: 'green',
                        },
                        {
                            label: 'Not Recommended',
                            data: [6, 4, 3, 2, 1, 12],
                            backgroundColor: 'red',
                        }
                    ],
                }}
                options={{
                    // responsive: true,
                    indexAxis: 'y',
                    // maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Products Recommended by Users'
                        }
                    }
                }}
            />

        </div>
    );
}

export default RecommendedChart;
