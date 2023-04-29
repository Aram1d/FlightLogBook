import { Resolver as GraphCacheResolver, UpdateResolver as GraphCacheUpdateResolver, OptimisticMutationResolver as GraphCacheOptimisticMutationResolver, StorageAdapter as GraphCacheStorageAdapter, CacheExchangeOpts } from '@urql/exchange-graphcache';

import { DocumentNode } from 'graphql';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type Aircraft = {
  __typename?: 'Aircraft';
  brand: Scalars['String'];
  id: Scalars['ID'];
  isIFR: Scalars['Boolean'];
  isMultiEngine: Scalars['Boolean'];
  model: Scalars['String'];
};

export type Credential = {
  __typename?: 'Credential';
  id: Scalars['ID'];
  ipv4: Scalars['String'];
  isThisConnection: Scalars['Boolean'];
  lastUsed: Scalars['String'];
  userAgent: Scalars['String'];
};

export type Email = {
  __typename?: 'Email';
  address: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type Flight = {
  __typename?: 'Flight';
  arrival: Juncture;
  date: Scalars['Date'];
  departure: Juncture;
  flightTime: FlightTime;
  id: Scalars['ID'];
  ifrApproaches: Scalars['Int'];
  landings: Landings;
  operationalTime: OperationalTime;
  picName: Scalars['ID'];
  pilotFunctionTime: PilotFunctionTime;
  remarks: Scalars['String'];
  simulationTraining: SimulationTraining;
  totalFlightTime: Scalars['Int'];
};

export type FlightTime = {
  __typename?: 'FlightTime';
  multiPilot: Scalars['Int'];
  singlePilot: SinglePilotFlightTime;
};

export type Juncture = {
  __typename?: 'Juncture';
  place: Scalars['String'];
  time: Scalars['Date'];
};

export type Landings = {
  __typename?: 'Landings';
  day: Scalars['Int'];
  night: Scalars['Int'];
};

export type ListFiltersInput = {
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']>;
  sorts?: InputMaybe<Array<SortInput>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signIn: Scalars['String'];
  signOut: Scalars['Boolean'];
  signUp: Scalars['String'];
};


export type MutationSignInArgs = {
  login: Scalars['String'];
  pwdHash: Scalars['String'];
};


export type MutationSignUpArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  pwdHash: Scalars['String'];
  pwdHash2: Scalars['String'];
  username: Scalars['String'];
};

export type OperationalTime = {
  __typename?: 'OperationalTime';
  ifr: Scalars['Int'];
  night: Scalars['Int'];
};

export type PaginationInput = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type Password = {
  __typename?: 'Password';
  createdAt: Scalars['String'];
};

export type Pilot = {
  __typename?: 'Pilot';
  credentials: Array<Credential>;
  email: Email;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  passwords: Array<Password>;
  username: Scalars['String'];
};

export type PilotFunctionTime = {
  __typename?: 'PilotFunctionTime';
  coPilot: Scalars['Int'];
  dualCommand: Scalars['Int'];
  instructor: Scalars['Int'];
  pic: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  aircraft: Aircraft;
  aircrafts: Array<Aircraft>;
  me?: Maybe<Pilot>;
};


export type QueryAircraftArgs = {
  id: Scalars['ID'];
};

export type SimulationTraining = {
  __typename?: 'SimulationTraining';
  date: Scalars['Date'];
  duration: Scalars['Int'];
  type: Scalars['String'];
};

export type SinglePilotFlightTime = {
  __typename?: 'SinglePilotFlightTime';
  multiEngine: Scalars['Int'];
  singleEngine: Scalars['Int'];
};

export type SortInput = {
  field: Scalars['String'];
  order: SortOrder;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  pwdHash: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: string };

export type SignUpMutationVariables = Exact<{
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  pwdHash: Scalars['String'];
  pwdHash2: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: string };


export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pwdHash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"login"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"pwdHash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pwdHash"}}}]}]}}]} as unknown as DocumentNode;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
};
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pwdHash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pwdHash2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"pwdHash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pwdHash"}}},{"kind":"Argument","name":{"kind":"Name","value":"pwdHash2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pwdHash2"}}}]}]}}]} as unknown as DocumentNode;

export function useSignUpMutation() {
  return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument);
};
export type WithTypename<T extends { __typename?: any }> = Partial<T> & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  Aircraft?: (data: WithTypename<Aircraft>) => null | string,
  Credential?: (data: WithTypename<Credential>) => null | string,
  Email?: (data: WithTypename<Email>) => null | string,
  Flight?: (data: WithTypename<Flight>) => null | string,
  FlightTime?: (data: WithTypename<FlightTime>) => null | string,
  Juncture?: (data: WithTypename<Juncture>) => null | string,
  Landings?: (data: WithTypename<Landings>) => null | string,
  OperationalTime?: (data: WithTypename<OperationalTime>) => null | string,
  Password?: (data: WithTypename<Password>) => null | string,
  Pilot?: (data: WithTypename<Pilot>) => null | string,
  PilotFunctionTime?: (data: WithTypename<PilotFunctionTime>) => null | string,
  SimulationTraining?: (data: WithTypename<SimulationTraining>) => null | string,
  SinglePilotFlightTime?: (data: WithTypename<SinglePilotFlightTime>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    aircraft?: GraphCacheResolver<WithTypename<Query>, QueryAircraftArgs, WithTypename<Aircraft> | string>,
    aircrafts?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<Aircraft> | string>>,
    me?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<Pilot> | string>
  },
  Aircraft?: {
    brand?: GraphCacheResolver<WithTypename<Aircraft>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Aircraft>, Record<string, never>, Scalars['ID'] | string>,
    isIFR?: GraphCacheResolver<WithTypename<Aircraft>, Record<string, never>, Scalars['Boolean'] | string>,
    isMultiEngine?: GraphCacheResolver<WithTypename<Aircraft>, Record<string, never>, Scalars['Boolean'] | string>,
    model?: GraphCacheResolver<WithTypename<Aircraft>, Record<string, never>, Scalars['String'] | string>
  },
  Credential?: {
    id?: GraphCacheResolver<WithTypename<Credential>, Record<string, never>, Scalars['ID'] | string>,
    ipv4?: GraphCacheResolver<WithTypename<Credential>, Record<string, never>, Scalars['String'] | string>,
    isThisConnection?: GraphCacheResolver<WithTypename<Credential>, Record<string, never>, Scalars['Boolean'] | string>,
    lastUsed?: GraphCacheResolver<WithTypename<Credential>, Record<string, never>, Scalars['String'] | string>,
    userAgent?: GraphCacheResolver<WithTypename<Credential>, Record<string, never>, Scalars['String'] | string>
  },
  Email?: {
    address?: GraphCacheResolver<WithTypename<Email>, Record<string, never>, Scalars['String'] | string>,
    verified?: GraphCacheResolver<WithTypename<Email>, Record<string, never>, Scalars['Boolean'] | string>
  },
  Flight?: {
    arrival?: GraphCacheResolver<WithTypename<Flight>, Record<string, never>, WithTypename<Juncture> | string>,
    date?: GraphCacheResolver<WithTypename<Flight>, Record<string, never>, Scalars['Date'] | string>,
    departure?: GraphCacheResolver<WithTypename<Flight>, Record<string, never>, WithTypename<Juncture> | string>,
    flightTime?: GraphCacheResolver<WithTypename<Flight>, Record<string, never>, WithTypename<FlightTime> | string>,
    id?: GraphCacheResolver<WithTypename<Flight>, Record<string, never>, Scalars['ID'] | string>,
    ifrApproaches?: GraphCacheResolver<WithTypename<Flight>, Record<string, never>, Scalars['Int'] | string>,
    landings?: GraphCacheResolver<WithTypename<Flight>, Record<string, never>, WithTypename<Landings> | string>,
    operationalTime?: GraphCacheResolver<WithTypename<Flight>, Record<string, never>, WithTypename<OperationalTime> | string>,
    picName?: GraphCacheResolver<WithTypename<Flight>, Record<string, never>, Scalars['ID'] | string>,
    pilotFunctionTime?: GraphCacheResolver<WithTypename<Flight>, Record<string, never>, WithTypename<PilotFunctionTime> | string>,
    remarks?: GraphCacheResolver<WithTypename<Flight>, Record<string, never>, Scalars['String'] | string>,
    simulationTraining?: GraphCacheResolver<WithTypename<Flight>, Record<string, never>, WithTypename<SimulationTraining> | string>,
    totalFlightTime?: GraphCacheResolver<WithTypename<Flight>, Record<string, never>, Scalars['Int'] | string>
  },
  FlightTime?: {
    multiPilot?: GraphCacheResolver<WithTypename<FlightTime>, Record<string, never>, Scalars['Int'] | string>,
    singlePilot?: GraphCacheResolver<WithTypename<FlightTime>, Record<string, never>, WithTypename<SinglePilotFlightTime> | string>
  },
  Juncture?: {
    place?: GraphCacheResolver<WithTypename<Juncture>, Record<string, never>, Scalars['String'] | string>,
    time?: GraphCacheResolver<WithTypename<Juncture>, Record<string, never>, Scalars['Date'] | string>
  },
  Landings?: {
    day?: GraphCacheResolver<WithTypename<Landings>, Record<string, never>, Scalars['Int'] | string>,
    night?: GraphCacheResolver<WithTypename<Landings>, Record<string, never>, Scalars['Int'] | string>
  },
  OperationalTime?: {
    ifr?: GraphCacheResolver<WithTypename<OperationalTime>, Record<string, never>, Scalars['Int'] | string>,
    night?: GraphCacheResolver<WithTypename<OperationalTime>, Record<string, never>, Scalars['Int'] | string>
  },
  Password?: {
    createdAt?: GraphCacheResolver<WithTypename<Password>, Record<string, never>, Scalars['String'] | string>
  },
  Pilot?: {
    credentials?: GraphCacheResolver<WithTypename<Pilot>, Record<string, never>, Array<WithTypename<Credential> | string>>,
    email?: GraphCacheResolver<WithTypename<Pilot>, Record<string, never>, WithTypename<Email> | string>,
    firstName?: GraphCacheResolver<WithTypename<Pilot>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Pilot>, Record<string, never>, Scalars['ID'] | string>,
    lastName?: GraphCacheResolver<WithTypename<Pilot>, Record<string, never>, Scalars['String'] | string>,
    passwords?: GraphCacheResolver<WithTypename<Pilot>, Record<string, never>, Array<WithTypename<Password> | string>>,
    username?: GraphCacheResolver<WithTypename<Pilot>, Record<string, never>, Scalars['String'] | string>
  },
  PilotFunctionTime?: {
    coPilot?: GraphCacheResolver<WithTypename<PilotFunctionTime>, Record<string, never>, Scalars['Int'] | string>,
    dualCommand?: GraphCacheResolver<WithTypename<PilotFunctionTime>, Record<string, never>, Scalars['Int'] | string>,
    instructor?: GraphCacheResolver<WithTypename<PilotFunctionTime>, Record<string, never>, Scalars['Int'] | string>,
    pic?: GraphCacheResolver<WithTypename<PilotFunctionTime>, Record<string, never>, Scalars['Int'] | string>
  },
  SimulationTraining?: {
    date?: GraphCacheResolver<WithTypename<SimulationTraining>, Record<string, never>, Scalars['Date'] | string>,
    duration?: GraphCacheResolver<WithTypename<SimulationTraining>, Record<string, never>, Scalars['Int'] | string>,
    type?: GraphCacheResolver<WithTypename<SimulationTraining>, Record<string, never>, Scalars['String'] | string>
  },
  SinglePilotFlightTime?: {
    multiEngine?: GraphCacheResolver<WithTypename<SinglePilotFlightTime>, Record<string, never>, Scalars['Int'] | string>,
    singleEngine?: GraphCacheResolver<WithTypename<SinglePilotFlightTime>, Record<string, never>, Scalars['Int'] | string>
  }
};

export type GraphCacheOptimisticUpdaters = {
  signIn?: GraphCacheOptimisticMutationResolver<MutationSignInArgs, Scalars['String']>,
  signOut?: GraphCacheOptimisticMutationResolver<Record<string, never>, Scalars['Boolean']>,
  signUp?: GraphCacheOptimisticMutationResolver<MutationSignUpArgs, Scalars['String']>
};

export type GraphCacheUpdaters = {
  Mutation?: {
    signIn?: GraphCacheUpdateResolver<{ signIn: Scalars['String'] }, MutationSignInArgs>,
    signOut?: GraphCacheUpdateResolver<{ signOut: Scalars['Boolean'] }, Record<string, never>>,
    signUp?: GraphCacheUpdateResolver<{ signUp: Scalars['String'] }, MutationSignUpArgs>
  },
  Subscription?: {},
};

export type GraphCacheConfig = {
  schema?: CacheExchangeOpts['schema'],
  updates?: GraphCacheUpdaters,
  keys?: GraphCacheKeysConfig,
  optimistic?: GraphCacheOptimisticUpdaters,
  resolvers?: GraphCacheResolvers,
  storage?: GraphCacheStorageAdapter
};