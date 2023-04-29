import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ApolloServerContextFn } from './contextFns';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
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

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Aircraft: ResolverTypeWrapper<AircraftDb>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Credential: ResolverTypeWrapper<Credential>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Email: ResolverTypeWrapper<Email>;
  Flight: ResolverTypeWrapper<FlightDb>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  FlightTime: ResolverTypeWrapper<FlightTime>;
  Juncture: ResolverTypeWrapper<Juncture>;
  Landings: ResolverTypeWrapper<Landings>;
  ListFiltersInput: ListFiltersInput;
  Mutation: ResolverTypeWrapper<{}>;
  OperationalTime: ResolverTypeWrapper<OperationalTime>;
  PaginationInput: PaginationInput;
  Password: ResolverTypeWrapper<Password>;
  Pilot: ResolverTypeWrapper<PilotDb>;
  PilotFunctionTime: ResolverTypeWrapper<PilotFunctionTime>;
  Query: ResolverTypeWrapper<{}>;
  SimulationTraining: ResolverTypeWrapper<SimulationTraining>;
  SinglePilotFlightTime: ResolverTypeWrapper<SinglePilotFlightTime>;
  SortInput: SortInput;
  SortOrder: SortOrder;
  AdditionalEntityFields: AdditionalEntityFields;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Aircraft: AircraftDb;
  String: Scalars['String'];
  ID: Scalars['ID'];
  Boolean: Scalars['Boolean'];
  Credential: Credential;
  Date: Scalars['Date'];
  Email: Email;
  Flight: FlightDb;
  Int: Scalars['Int'];
  FlightTime: FlightTime;
  Juncture: Juncture;
  Landings: Landings;
  ListFiltersInput: ListFiltersInput;
  Mutation: {};
  OperationalTime: OperationalTime;
  PaginationInput: PaginationInput;
  Password: Password;
  Pilot: PilotDb;
  PilotFunctionTime: PilotFunctionTime;
  Query: {};
  SimulationTraining: SimulationTraining;
  SinglePilotFlightTime: SinglePilotFlightTime;
  SortInput: SortInput;
  AdditionalEntityFields: AdditionalEntityFields;
}>;

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AircraftResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Aircraft'] = ResolversParentTypes['Aircraft']> = ResolversObject<{
  brand?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isIFR?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isMultiEngine?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CredentialResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Credential'] = ResolversParentTypes['Credential']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ipv4?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isThisConnection?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastUsed?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userAgent?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EmailResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Email'] = ResolversParentTypes['Email']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FlightResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Flight'] = ResolversParentTypes['Flight']> = ResolversObject<{
  arrival?: Resolver<ResolversTypes['Juncture'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  departure?: Resolver<ResolversTypes['Juncture'], ParentType, ContextType>;
  flightTime?: Resolver<ResolversTypes['FlightTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ifrApproaches?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  landings?: Resolver<ResolversTypes['Landings'], ParentType, ContextType>;
  operationalTime?: Resolver<ResolversTypes['OperationalTime'], ParentType, ContextType>;
  picName?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pilotFunctionTime?: Resolver<ResolversTypes['PilotFunctionTime'], ParentType, ContextType>;
  remarks?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  simulationTraining?: Resolver<ResolversTypes['SimulationTraining'], ParentType, ContextType>;
  totalFlightTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FlightTimeResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['FlightTime'] = ResolversParentTypes['FlightTime']> = ResolversObject<{
  multiPilot?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  singlePilot?: Resolver<ResolversTypes['SinglePilotFlightTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type JunctureResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Juncture'] = ResolversParentTypes['Juncture']> = ResolversObject<{
  place?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LandingsResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Landings'] = ResolversParentTypes['Landings']> = ResolversObject<{
  day?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  night?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  signIn?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'login' | 'pwdHash'>>;
  signOut?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  signUp?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'email' | 'firstName' | 'lastName' | 'pwdHash' | 'pwdHash2' | 'username'>>;
}>;

export type OperationalTimeResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['OperationalTime'] = ResolversParentTypes['OperationalTime']> = ResolversObject<{
  ifr?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  night?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PasswordResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Password'] = ResolversParentTypes['Password']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PilotResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Pilot'] = ResolversParentTypes['Pilot']> = ResolversObject<{
  credentials?: Resolver<Array<ResolversTypes['Credential']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['Email'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  passwords?: Resolver<Array<ResolversTypes['Password']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PilotFunctionTimeResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['PilotFunctionTime'] = ResolversParentTypes['PilotFunctionTime']> = ResolversObject<{
  coPilot?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  dualCommand?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instructor?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pic?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  aircraft?: Resolver<ResolversTypes['Aircraft'], ParentType, ContextType, RequireFields<QueryAircraftArgs, 'id'>>;
  aircrafts?: Resolver<Array<ResolversTypes['Aircraft']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['Pilot']>, ParentType, ContextType>;
}>;

export type SimulationTrainingResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['SimulationTraining'] = ResolversParentTypes['SimulationTraining']> = ResolversObject<{
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SinglePilotFlightTimeResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['SinglePilotFlightTime'] = ResolversParentTypes['SinglePilotFlightTime']> = ResolversObject<{
  multiEngine?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  singleEngine?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ApolloServerContextFn> = ResolversObject<{
  Aircraft?: AircraftResolvers<ContextType>;
  Credential?: CredentialResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Email?: EmailResolvers<ContextType>;
  Flight?: FlightResolvers<ContextType>;
  FlightTime?: FlightTimeResolvers<ContextType>;
  Juncture?: JunctureResolvers<ContextType>;
  Landings?: LandingsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OperationalTime?: OperationalTimeResolvers<ContextType>;
  Password?: PasswordResolvers<ContextType>;
  Pilot?: PilotResolvers<ContextType>;
  PilotFunctionTime?: PilotFunctionTimeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SimulationTraining?: SimulationTrainingResolvers<ContextType>;
  SinglePilotFlightTime?: SinglePilotFlightTimeResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = ApolloServerContextFn> = ResolversObject<{
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
}>;

import { ObjectId } from 'mongodb';
export type AircraftDb = {
  brand: string,
  _id: ObjectId,
  isIFR: boolean,
  isMultiEngine: boolean,
  model: string,
};

export type CredentialDb = {
  _id: ObjectId,
  ipv4: string,
  lastUsed: Date,
  userAgent: string,
  token: string,
};

export type EmailDb = {
  address: string,
  verified: boolean,
};

export type FlightDb = {
  arrival: JunctureDb,
  date: any,
  departure: JunctureDb,
  flightTime: FlightTimeDb,
  _id: ObjectId,
  ifrApproaches: number,
  landings: LandingsDb,
  operationalTime: OperationalTimeDb,
  picName: IdDb['_id'],
  pilotFunctionTime: PilotFunctionTimeDb,
  remarks: string,
  simulationTraining: SimulationTrainingDb,
  totalFlightTime: number,
};

export type FlightTimeDb = {
  multiPilot: number,
  singlePilot: SinglePilotFlightTimeDb,
};

export type JunctureDb = {
  place: string,
  time: any,
};

export type LandingsDb = {
  day: number,
  night: number,
};

export type PasswordDb = {
  createdAt: Date,
  bcrypt: string,
};

export type PilotDb = {
  credentials: Array<CredentialDb>,
  email: EmailDb,
  firstName: string,
  _id: ObjectId,
  lastName: string,
  passwords: Array<PasswordDb>,
  username: string,
};

export type SimulationTrainingDb = {
  date: any,
  duration: number,
  type: string,
};

export type SinglePilotFlightTimeDb = {
  multiEngine: number,
  singleEngine: number,
};
