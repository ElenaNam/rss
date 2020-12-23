import changeSizeScreen1 from './btnFullScreenVar';

let chartWrapper;

const createChart = async() => {
    chartWrapper = document.createElement('div');
    chartWrapper.classList.add('chart-wrapper');     

    const chartHeader = document.createElement('div');
    chartHeader.classList.add('chart-header');
    chartWrapper.appendChild(chartHeader);

    changeSizeScreen1(chartWrapper, chartHeader); 

    const chart = document.createElement('canvas');    
    chart.classList.add('chart');
    chartWrapper.appendChild(chart);   

}

export { chartWrapper }
export default createChart;