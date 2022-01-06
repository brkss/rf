"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExpression = void 0;
const Rate_1 = require("../types/Rate");
const checkExpression = (exps) => {
    if (Rate_1.RATES.includes(exps))
        return true;
    return false;
};
exports.checkExpression = checkExpression;
//# sourceMappingURL=rate.checker.js.map