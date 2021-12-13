import { __assign } from "tslib";
import { Observable } from '@apollo/client/core';
var OperationQueuing = (function () {
    function OperationQueuing() {
        this.queuedRequests = [];
        this.queuedRequests = [];
    }
    OperationQueuing.prototype.enqueueRequest = function (request) {
        var _this = this;
        var requestCopy = __assign({}, request);
        requestCopy.observable =
            requestCopy.observable ||
                new Observable(function (observer) {
                    _this.queuedRequests.push(requestCopy);
                    if (typeof requestCopy.subscriber === 'undefined') {
                        requestCopy.subscriber = {};
                    }
                    requestCopy.subscriber.next = requestCopy.next || observer.next.bind(observer);
                    requestCopy.subscriber.error = requestCopy.error || observer.error.bind(observer);
                    requestCopy.subscriber.complete =
                        requestCopy.complete || observer.complete.bind(observer);
                });
        return requestCopy.observable;
    };
    OperationQueuing.prototype.consumeQueue = function () {
        this.queuedRequests.forEach(function (request) {
            request.forward(request.operation).subscribe(request.subscriber);
        });
        this.queuedRequests = [];
    };
    return OperationQueuing;
}());
export { OperationQueuing };
//# sourceMappingURL=queuing.js.map