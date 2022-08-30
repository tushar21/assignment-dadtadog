import {lambdaHandler} from './index'
const event = {operation: "getAll"};

(async () => {
    await lambdaHandler(event, null)
})();


