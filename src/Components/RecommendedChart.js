import './SkincareProductsList';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import Chart from 'chart.js/auto';

function RecommendedChart(props) {

    const { recommendedProducts } = props.recommended;
    // map product to chart data arrays
    let products = recommendedProducts.map(prod => prod.productName);
    let yesCounts = recommendedProducts.map(prod => prod.yesCount);
    let noCounts = recommendedProducts.map(prod => prod.noCount);

    return (
        <div className="recommended-chart">
            <Bar
                data={{
                    labels: products,
                    datasets: [
                        {
                            label: 'Recommended',
                            data: yesCounts,
                            backgroundColor: 'green',
                        },
                        {
                            label: 'Not Recommended',
                            data: noCounts,
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

function mapStateToProps(state) {
    return {
        recommended: state.recommended
    }
}


export default connect(mapStateToProps)(RecommendedChart);

