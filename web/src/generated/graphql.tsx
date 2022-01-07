import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AuthDefaultResponse = {
  __typename?: 'AuthDefaultResponse';
  message?: Maybe<Scalars['String']>;
  status: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Meal = {
  __typename?: 'Meal';
  created_at: Scalars['DateTime'];
  end: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  rates: Array<Rate>;
  start: Scalars['String'];
};

export type MealBefore = {
  __typename?: 'MealBefore';
  is_yesterday: Scalars['Boolean'];
  meal: Meal;
};

export type MealTimeResponse = {
  __typename?: 'MealTimeResponse';
  is_current: Scalars['Boolean'];
  is_tomorrow: Scalars['Boolean'];
  meal: Meal;
  meal_before: MealBefore;
};

export type Mutation = {
  __typename?: 'Mutation';
  auth: AuthDefaultResponse;
  rate: RateMealResponse;
};


export type MutationAuthArgs = {
  code: Scalars['String'];
};


export type MutationRateArgs = {
  expression: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  mealStats: StatsMealResponse;
  mealTime?: Maybe<MealTimeResponse>;
  ping: Scalars['String'];
  tping: Scalars['String'];
};

export type Rate = {
  __typename?: 'Rate';
  created_at: Scalars['DateTime'];
  expression: Scalars['String'];
  id: Scalars['String'];
  meal: Meal;
  user: User;
};

export type RateMealResponse = {
  __typename?: 'RateMealResponse';
  message?: Maybe<Scalars['String']>;
  status: Scalars['Boolean'];
};

export type Stats = {
  __typename?: 'Stats';
  count: Scalars['Float'];
  ident: Scalars['String'];
  percent: Scalars['Float'];
};

export type StatsMealResponse = {
  __typename?: 'StatsMealResponse';
  message?: Maybe<Scalars['String']>;
  stats?: Maybe<Array<Stats>>;
  status: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  campus: Scalars['String'];
  campus_id: Scalars['Float'];
  created_at: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  rates: Array<Rate>;
  username: Scalars['String'];
  version: Scalars['Float'];
};

export type MealTimeQueryVariables = Exact<{ [key: string]: never; }>;


export type MealTimeQuery = { __typename?: 'Query', mealTime?: { __typename?: 'MealTimeResponse', is_current: boolean, is_tomorrow: boolean, meal_before: { __typename?: 'MealBefore', is_yesterday: boolean, meal: { __typename?: 'Meal', id: string, name: string, start: string, end: string } }, meal: { __typename?: 'Meal', id: string, name: string, start: string, end: string } } | null | undefined };

export type RateMealMutationVariables = Exact<{
  expression: Scalars['String'];
}>;


export type RateMealMutation = { __typename?: 'Mutation', rate: { __typename?: 'RateMealResponse', status: boolean, message?: string | null | undefined } };

export type MealStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type MealStatsQuery = { __typename?: 'Query', mealStats: { __typename?: 'StatsMealResponse', status: boolean, message?: string | null | undefined, stats?: Array<{ __typename?: 'Stats', count: number, ident: string, percent: number }> | null | undefined } };

export type AuthMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type AuthMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthDefaultResponse', status: boolean, message?: string | null | undefined, token?: string | null | undefined } };

export type PingQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQuery = { __typename?: 'Query', ping: string };


export const MealTimeDocument = gql`
    query MealTime {
  mealTime {
    is_current
    is_tomorrow
    meal_before {
      meal {
        id
        name
        start
        end
      }
      is_yesterday
    }
    meal {
      id
      name
      start
      end
    }
  }
}
    `;

/**
 * __useMealTimeQuery__
 *
 * To run a query within a React component, call `useMealTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMealTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMealTimeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMealTimeQuery(baseOptions?: Apollo.QueryHookOptions<MealTimeQuery, MealTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MealTimeQuery, MealTimeQueryVariables>(MealTimeDocument, options);
      }
export function useMealTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MealTimeQuery, MealTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MealTimeQuery, MealTimeQueryVariables>(MealTimeDocument, options);
        }
export type MealTimeQueryHookResult = ReturnType<typeof useMealTimeQuery>;
export type MealTimeLazyQueryHookResult = ReturnType<typeof useMealTimeLazyQuery>;
export type MealTimeQueryResult = Apollo.QueryResult<MealTimeQuery, MealTimeQueryVariables>;
export const RateMealDocument = gql`
    mutation RateMeal($expression: String!) {
  rate(expression: $expression) {
    status
    message
  }
}
    `;
export type RateMealMutationFn = Apollo.MutationFunction<RateMealMutation, RateMealMutationVariables>;

/**
 * __useRateMealMutation__
 *
 * To run a mutation, you first call `useRateMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRateMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rateMealMutation, { data, loading, error }] = useRateMealMutation({
 *   variables: {
 *      expression: // value for 'expression'
 *   },
 * });
 */
export function useRateMealMutation(baseOptions?: Apollo.MutationHookOptions<RateMealMutation, RateMealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RateMealMutation, RateMealMutationVariables>(RateMealDocument, options);
      }
export type RateMealMutationHookResult = ReturnType<typeof useRateMealMutation>;
export type RateMealMutationResult = Apollo.MutationResult<RateMealMutation>;
export type RateMealMutationOptions = Apollo.BaseMutationOptions<RateMealMutation, RateMealMutationVariables>;
export const MealStatsDocument = gql`
    query MealStats {
  mealStats {
    status
    message
    stats {
      count
      ident
      percent
    }
  }
}
    `;

/**
 * __useMealStatsQuery__
 *
 * To run a query within a React component, call `useMealStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMealStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMealStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMealStatsQuery(baseOptions?: Apollo.QueryHookOptions<MealStatsQuery, MealStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MealStatsQuery, MealStatsQueryVariables>(MealStatsDocument, options);
      }
export function useMealStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MealStatsQuery, MealStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MealStatsQuery, MealStatsQueryVariables>(MealStatsDocument, options);
        }
export type MealStatsQueryHookResult = ReturnType<typeof useMealStatsQuery>;
export type MealStatsLazyQueryHookResult = ReturnType<typeof useMealStatsLazyQuery>;
export type MealStatsQueryResult = Apollo.QueryResult<MealStatsQuery, MealStatsQueryVariables>;
export const AuthDocument = gql`
    mutation Auth($code: String!) {
  auth(code: $code) {
    status
    message
    token
  }
}
    `;
export type AuthMutationFn = Apollo.MutationFunction<AuthMutation, AuthMutationVariables>;

/**
 * __useAuthMutation__
 *
 * To run a mutation, you first call `useAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authMutation, { data, loading, error }] = useAuthMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useAuthMutation(baseOptions?: Apollo.MutationHookOptions<AuthMutation, AuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthMutation, AuthMutationVariables>(AuthDocument, options);
      }
export type AuthMutationHookResult = ReturnType<typeof useAuthMutation>;
export type AuthMutationResult = Apollo.MutationResult<AuthMutation>;
export type AuthMutationOptions = Apollo.BaseMutationOptions<AuthMutation, AuthMutationVariables>;
export const PingDocument = gql`
    query Ping {
  ping
}
    `;

/**
 * __usePingQuery__
 *
 * To run a query within a React component, call `usePingQuery` and pass it any options that fit your needs.
 * When your component renders, `usePingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePingQuery({
 *   variables: {
 *   },
 * });
 */
export function usePingQuery(baseOptions?: Apollo.QueryHookOptions<PingQuery, PingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PingQuery, PingQueryVariables>(PingDocument, options);
      }
export function usePingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PingQuery, PingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PingQuery, PingQueryVariables>(PingDocument, options);
        }
export type PingQueryHookResult = ReturnType<typeof usePingQuery>;
export type PingLazyQueryHookResult = ReturnType<typeof usePingLazyQuery>;
export type PingQueryResult = Apollo.QueryResult<PingQuery, PingQueryVariables>;