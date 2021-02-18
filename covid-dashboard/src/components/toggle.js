import { state } from './state';

let toggleState;
let togglePeriod;
let toggleValue;

const toggleData = setTimeout(() => {
    toggleState = {
        cases: true,
        dead: true,
        recovered: true,
    }

    togglePeriod = {
        allTime: true,
        lastDay: false,
    }
    toggleValue = {
        valueAbs: true,
        value100: false,
    }
}, 1000)  

export { toggleState }
export { togglePeriod }
export { toggleValue }
export default toggleData;