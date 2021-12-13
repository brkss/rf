(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('@apollo/client/core')) :
    typeof define === 'function' && define.amd ? define(['exports', 'tslib', '@apollo/client/core'], factory) :
    (global = global || self, factory(global.tokenRefreshLink = {}, global.tslib, global.core));
}(this, (function (exports, tslib, core) { 'use strict';

    var OperationQueuing = (function () {
        function OperationQueuing() {
            this.queuedRequests = [];
            this.queuedRequests = [];
        }
        OperationQueuing.prototype.enqueueRequest = function (request) {
            var _this = this;
            var requestCopy = tslib.__assign({}, request);
            requestCopy.observable =
                requestCopy.observable ||
                    new core.Observable(function (observer) {
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

    var throwServerError = function (response, result, message) {
        var error = new Error(message);
        error.response = response;
        error.statusCode = response.status;
        error.result = result;
        throw error;
    };
    var parseAndCheckResponse = function (operation, accessTokenField) { return function (response) {
        return response
            .text()
            .then(function (bodyText) {
            if (typeof bodyText !== 'string' || !bodyText.length) {
                return bodyText || '';
            }
            try {
                return JSON.parse(bodyText);
            }
            catch (err) {
                var parseError = err;
                parseError.response = response;
                parseError.statusCode = response.status;
                parseError.bodyText = bodyText;
                return Promise.reject(parseError);
            }
        })
            .then(function (parsedBody) {
            if (response.status >= 300) {
                throwServerError(response, parsedBody, "Response not successful: Received status code ".concat(response.status));
            }
            if (!parsedBody.hasOwnProperty(accessTokenField)
                && (parsedBody.data && !parsedBody.data.hasOwnProperty(accessTokenField))
                && !parsedBody.hasOwnProperty('errors')) {
                throwServerError(response, parsedBody, "Server response was missing for query '".concat(operation.operationName, "'."));
            }
            return parsedBody;
        });
    }; };
    var TokenRefreshLink = (function (_super) {
        tslib.__extends(TokenRefreshLink, _super);
        function TokenRefreshLink(params) {
            var _this = _super.call(this) || this;
            _this.extractToken = function (body) {
                if (body.data) {
                    return body.data[_this.accessTokenField];
                }
                return body[_this.accessTokenField];
            };
            _this.accessTokenField = (params.accessTokenField) || 'access_token';
            _this.isTokenValidOrUndefined = params.isTokenValidOrUndefined;
            _this.fetchAccessToken = params.fetchAccessToken;
            _this.handleFetch = params.handleFetch;
            _this.handleResponse = params.handleResponse || parseAndCheckResponse;
            _this.handleError = typeof params.handleError === 'function'
                ? params.handleError
                : function (err) {
                    console.error(err);
                };
            _this.fetching = false;
            _this.queue = new OperationQueuing();
            return _this;
        }
        TokenRefreshLink.prototype.request = function (operation, forward) {
            var _this = this;
            if (typeof forward !== 'function') {
                throw new Error('[Token Refresh Link]: Token Refresh Link is a non-terminating link and should not be the last in the composed chain');
            }
            if (this.isTokenValidOrUndefined()) {
                return forward(operation);
            }
            if (!this.fetching) {
                this.fetching = true;
                this.fetchAccessToken()
                    .then(this.handleResponse(operation, this.accessTokenField))
                    .then(function (body) {
                    var token = _this.extractToken(body);
                    if (!token) {
                        throw new Error('[Token Refresh Link]: Unable to retrieve new access token');
                    }
                    return token;
                })
                    .then(this.handleFetch)
                    .catch(this.handleError)
                    .finally(function () {
                    _this.fetching = false;
                    _this.queue.consumeQueue();
                });
            }
            return this.queue.enqueueRequest({
                operation: operation,
                forward: forward,
            });
        };
        return TokenRefreshLink;
    }(core.ApolloLink));

    exports.OperationQueuing = OperationQueuing;
    exports.TokenRefreshLink = TokenRefreshLink;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bundle.umd.js.map
