import { ApolloLink, Observable, Operation, NextLink, FetchResult } from '@apollo/client/core';
export { OperationQueuing, QueuedRequest } from './queuing';
export declare type FetchAccessToken = (...args: any[]) => Promise<Response>;
export declare type HandleFetch<AccessTokenPayloadType> = (accessTokenPayload: AccessTokenPayloadType) => void;
export declare type HandleResponse = (operation: Operation, accessTokenField: string) => any;
export declare type HandleError = (err: Error) => void;
export declare type IsTokenValidOrUndefined = (...args: any[]) => boolean;
export declare namespace TokenRefreshLink {
    interface Options<AccessTokenPayloadType> {
        accessTokenField?: string;
        isTokenValidOrUndefined: IsTokenValidOrUndefined;
        handleFetch: HandleFetch<AccessTokenPayloadType>;
        fetchAccessToken: FetchAccessToken;
        handleResponse?: HandleResponse;
        handleError?: HandleError;
    }
}
export declare class TokenRefreshLink<AccessTokenPayloadType = string> extends ApolloLink {
    private accessTokenField;
    private isTokenValidOrUndefined;
    private fetchAccessToken;
    private handleFetch;
    private handleResponse;
    private handleError;
    private fetching;
    private queue;
    constructor(params: TokenRefreshLink.Options<AccessTokenPayloadType>);
    request(operation: Operation, forward: NextLink): Observable<FetchResult> | null;
    private extractToken;
}
//# sourceMappingURL=tokenRefreshLink.d.ts.map