import './SkincareProductsList';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import Chart from 'chart.js/auto';

function RecommendedChart(props) {

    const { recommendedProducts } = props.recommended;

    const truncateWords = (input) => {
        let result = ''
        let words = input.split(' ');
        words.forEach(el => {
            if (result.length + el.length < 40) {
                result += `${el} `;
            }
        });
        return result;
    }

    let products = recommendedProducts.map(prod => truncateWords(prod.productName));
    let yesCounts = recommendedProducts.map(prod => prod.yesCount);
    let noCounts = recommendedProducts.map(prod => prod.noCount);

    return (
        <div className="recommended-chart-wrapper">
            <div className="recommended-chart">
                <Bar
                    data={{
                        labels: products,
                        datasets: [
                            {
                                label: 'Recommended',
                                data: yesCounts,
                                backgroundColor: '#3792A0',
                            },
                            {
                                label: 'Not Recommended',
                                data: noCounts,
                                backgroundColor: '#A75C3B',
                            }
                        ],
                    }}
                    height={null}
                    width={null}
                    options={{
                        indexAxis: 'y',
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'User Recommendations',
                                font: {
                                    weight: 'bold',
                                    size: 18
                                }
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        recommended: state.recommended
    }
}


export default connect(mapStateToProps)(RecommendedChart);

