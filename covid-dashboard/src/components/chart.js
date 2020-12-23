

let chartWrapper;

const createChart = async() => {
    chartWrapper = document.createElement('div');
    chartWrapper.classList.add('chart-wrapper');
    chartWrapper.innerHTML = '<span>Здесь будет график</span>'
    

}

export { chartWrapper }
export default createChart;