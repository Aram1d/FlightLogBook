import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ApolloServerContextFn } from '../../contextFns';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AddAircraftInput = {
  brand: Scalars['String']['input'];
  capabilities: Array<AircraftCapabilities>;
  model: Scalars['String']['input'];
  registration: Scalars['String']['input'];
};

export type AddFlightInput = {
  aircraft?: InputMaybe<Scalars['ID']['input']>;
  aircraftClass: AircraftClass;
  arrival: JunctureInput;
  departure: JunctureInput;
  ifrApproaches: Scalars['Int']['input'];
  landings: LandingsInput;
  operationalTime: OperationalTimeInput;
  pic: Scalars['ID']['input'];
  pilotFunctionTime: PilotFunctionTimeInput;
  remarks: Scalars['String']['input'];
  simulatorType?: InputMaybe<Scalars['String']['input']>;
  totalFlightTime: Scalars['Int']['input'];
};

export type AddPilotInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Aircraft = {
  __typename?: 'Aircraft';
  brand: Scalars['String']['output'];
  capabilities: Array<AircraftCapabilities>;
  id: Scalars['ID']['output'];
  model: Scalars['String']['output'];
  registration: Scalars['String']['output'];
};

export enum AircraftCapabilities {
  IsIfr = 'isIFR',
  IsMultiEngine = 'isMultiEngine'
}

export enum AircraftClass {
  MultiEngine = 'multiEngine',
  MultiPilot = 'multiPilot',
  SingleEngine = 'singleEngine'
}

export type AircraftsPage = {
  __typename?: 'AircraftsPage';
  items: Array<Aircraft>;
  total: Scalars['Int']['output'];
};

export type BaseFlightStats = {
  flightAmount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  totalCOPI: Scalars['Int']['output'];
  totalDC: Scalars['Int']['output'];
  totalFlightTime: Scalars['Int']['output'];
  totalInstructor: Scalars['Int']['output'];
  totalPIC: Scalars['Int']['output'];
};

export type ByAcftStatsInput = {
  mergeByModel?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ByAircraftModelStats = BaseFlightStats & {
  __typename?: 'ByAircraftModelStats';
  aircraftModel: Scalars['String']['output'];
  byAircraft: Array<ByAircraftStats>;
  byInstructor: Array<ByInstructorStats>;
  flightAmount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  totalCOPI: Scalars['Int']['output'];
  totalDC: Scalars['Int']['output'];
  totalFlightTime: Scalars['Int']['output'];
  totalInstructor: Scalars['Int']['output'];
  totalPIC: Scalars['Int']['output'];
};

export type ByAircraftStats = BaseFlightStats & {
  __typename?: 'ByAircraftStats';
  aircraft: Aircraft;
  byAircraftModel: Array<ByAircraftModelStats>;
  byInstructor: Array<ByInstructorStats>;
  flightAmount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  totalCOPI: Scalars['Int']['output'];
  totalDC: Scalars['Int']['output'];
  totalFlightTime: Scalars['Int']['output'];
  totalInstructor: Scalars['Int']['output'];
  totalPIC: Scalars['Int']['output'];
};

export type ByInstructorStats = BaseFlightStats & {
  __typename?: 'ByInstructorStats';
  byAircraft: Array<ByAircraftStats>;
  byAircraftModel: Array<ByAircraftModelStats>;
  flightAmount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  instructor: Pilot;
  totalCOPI: Scalars['Int']['output'];
  totalDC: Scalars['Int']['output'];
  totalFlightTime: Scalars['Int']['output'];
  totalInstructor: Scalars['Int']['output'];
  totalPIC: Scalars['Int']['output'];
};

export type Credential = {
  __typename?: 'Credential';
  id: Scalars['ID']['output'];
  ipv4: Scalars['String']['output'];
  isThisConnection: Scalars['Boolean']['output'];
  lastUsed: Scalars['String']['output'];
  userAgent: Scalars['String']['output'];
};

export type Email = {
  __typename?: 'Email';
  address: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type Flight = {
  __typename?: 'Flight';
  aircraft?: Maybe<Aircraft>;
  aircraftClass: AircraftClass;
  arrival: Juncture;
  departure: Juncture;
  id: Scalars['ID']['output'];
  ifrApproaches: Scalars['Int']['output'];
  landings: Landings;
  operationalTime: OperationalTime;
  pic: Pilot;
  pilot: Pilot;
  pilotFunctionTime: PilotFunctionTime;
  remarks: Scalars['String']['output'];
  simulatorType?: Maybe<Scalars['String']['output']>;
  totalFlightTime: Scalars['Int']['output'];
};

export type FlightPageTotals = {
  __typename?: 'FlightPageTotals';
  copilot: FlightTotals;
  dualCommand: FlightTotals;
  id: Scalars['ID']['output'];
  instructor: FlightTotals;
  landings: LandingTotals;
  multiEngine: FlightTotals;
  pic: FlightTotals;
  singleEngine: FlightTotals;
  totalFlightTime: FlightTotals;
};

export type FlightStats = BaseFlightStats & {
  __typename?: 'FlightStats';
  byAircraft: Array<ByAircraftStats>;
  byAircraftModel: Array<ByAircraftModelStats>;
  byInstructor: Array<ByInstructorStats>;
  flightAmount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  totalCOPI: Scalars['Int']['output'];
  totalDC: Scalars['Int']['output'];
  totalFlightTime: Scalars['Int']['output'];
  totalInstructor: Scalars['Int']['output'];
  totalPIC: Scalars['Int']['output'];
};

export type FlightTotals = {
  __typename?: 'FlightTotals';
  actual: Scalars['Float']['output'];
  page: Scalars['Float']['output'];
  preceding: Scalars['Float']['output'];
};

export type FlightsPage = {
  __typename?: 'FlightsPage';
  items: Array<Flight>;
  total: Scalars['Int']['output'];
};

export type Juncture = {
  __typename?: 'Juncture';
  date: Scalars['Date']['output'];
  place: Scalars['String']['output'];
};

export type JunctureInput = {
  date: Scalars['Date']['input'];
  place: Scalars['String']['input'];
};

export type LandingTotals = {
  __typename?: 'LandingTotals';
  day: FlightTotals;
  night: FlightTotals;
};

export type Landings = {
  __typename?: 'Landings';
  day: Scalars['Int']['output'];
  night: Scalars['Int']['output'];
};

export type LandingsInput = {
  day: Scalars['Int']['input'];
  night: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAircraft: Aircraft;
  addFlight: Flight;
  addPilot: Pilot;
  signIn: Scalars['String']['output'];
  signOut: Scalars['Boolean']['output'];
  signUp: Scalars['String']['output'];
  updateAircraft: Aircraft;
  updateFlight: Flight;
  updatePilot: Pilot;
};


export type MutationAddAircraftArgs = {
  aircraft: AddAircraftInput;
};


export type MutationAddFlightArgs = {
  input: AddFlightInput;
};


export type MutationAddPilotArgs = {
  pilot: AddPilotInput;
};


export type MutationSignInArgs = {
  login: Scalars['String']['input'];
  pwdHash: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  pwdHash: Scalars['String']['input'];
  pwdHash2: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateAircraftArgs = {
  aircraft: UpdateAircraftInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateFlightArgs = {
  id: Scalars['ID']['input'];
  input: UpdateFlightInput;
};


export type MutationUpdatePilotArgs = {
  id: Scalars['ID']['input'];
  pilot: UpdatePilotInput;
};

export type OperationalTime = {
  __typename?: 'OperationalTime';
  ifr: Scalars['Int']['output'];
  night: Scalars['Int']['output'];
};

export type OperationalTimeInput = {
  ifr: Scalars['Int']['input'];
  night: Scalars['Int']['input'];
};

export type PagerInput = {
  fieldSearches?: InputMaybe<Array<SearchInput>>;
  globalSearch?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<PaginationInput>;
  sorts?: InputMaybe<Array<SortInput>>;
};

export type PaginationInput = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  shift?: InputMaybe<Scalars['Int']['input']>;
};

export type Password = {
  __typename?: 'Password';
  createdAt: Scalars['String']['output'];
};

export type Pilot = {
  __typename?: 'Pilot';
  credentials: Array<Credential>;
  email: Email;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  passwords: Array<Password>;
  username: Scalars['String']['output'];
};

export type PilotFunctionTime = {
  __typename?: 'PilotFunctionTime';
  coPilot: Scalars['Int']['output'];
  dualCommand: Scalars['Int']['output'];
  instructor: Scalars['Int']['output'];
  pic: Scalars['Int']['output'];
};

export type PilotFunctionTimeInput = {
  coPilot: Scalars['Int']['input'];
  dualCommand: Scalars['Int']['input'];
  instructor: Scalars['Int']['input'];
  pic: Scalars['Int']['input'];
};

export type PilotsPage = {
  __typename?: 'PilotsPage';
  items: Array<Pilot>;
  total: Scalars['Int']['output'];
};

export type PlaceTupleStat = {
  __typename?: 'PlaceTupleStat';
  arrival: Scalars['String']['output'];
  departure: Scalars['String']['output'];
  times: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  aircraft: Aircraft;
  aircrafts: AircraftsPage;
  currentPilot?: Maybe<Pilot>;
  flight: Flight;
  flightPlaceStats: Array<PlaceTupleStat>;
  flightStats: FlightStats;
  fromDateFlightStats: FlightStats;
  lastFlightDate?: Maybe<Scalars['Date']['output']>;
  ocaiCodes: Array<Scalars['String']['output']>;
  ownFlights: FlightsPage;
  ownFlightsTotals: FlightPageTotals;
  pilot: Pilot;
  pilots: PilotsPage;
};


export type QueryAircraftArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAircraftsArgs = {
  pager?: InputMaybe<PagerInput>;
};


export type QueryFlightArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFromDateFlightStatsArgs = {
  date?: InputMaybe<Scalars['Date']['input']>;
};


export type QueryOwnFlightsArgs = {
  pager?: InputMaybe<PagerInput>;
};


export type QueryOwnFlightsTotalsArgs = {
  pager?: InputMaybe<PagerInput>;
};


export type QueryPilotArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPilotsArgs = {
  pager?: InputMaybe<PagerInput>;
};

export type SearchInput = {
  field: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type SinglePilotFlightTime = {
  __typename?: 'SinglePilotFlightTime';
  multiEngine: Scalars['Int']['output'];
  singleEngine: Scalars['Int']['output'];
};

export type SinglePilotFlightTimeInput = {
  multiEngine: Scalars['Int']['input'];
  singleEngine: Scalars['Int']['input'];
};

export type SortInput = {
  field: Scalars['String']['input'];
  order: SortOrder;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type UpdateAircraftInput = {
  brand?: InputMaybe<Scalars['String']['input']>;
  capabilities?: InputMaybe<Array<AircraftCapabilities>>;
  model?: InputMaybe<Scalars['String']['input']>;
  registration?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFlightInput = {
  aircraft?: InputMaybe<Scalars['ID']['input']>;
  aircraftClass?: InputMaybe<AircraftClass>;
  arrival?: InputMaybe<JunctureInput>;
  departure?: InputMaybe<JunctureInput>;
  ifrApproaches?: InputMaybe<Scalars['Int']['input']>;
  landings?: InputMaybe<LandingsInput>;
  operationalTime?: InputMaybe<OperationalTimeInput>;
  pic?: InputMaybe<Scalars['ID']['input']>;
  pilotFunctionTime?: InputMaybe<PilotFunctionTimeInput>;
  remarks?: InputMaybe<Scalars['String']['input']>;
  simulatorType?: InputMaybe<Scalars['String']['input']>;
  totalFlightTime?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdatePilotInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
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


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = ResolversObject<{
  BaseFlightStats: ( ByAircraftModelStatsDb ) | ( ByAircraftStatsDb ) | ( ByInstructorStatsDb ) | ( FlightStatsDb );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddAircraftInput: AddAircraftInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  AddFlightInput: AddFlightInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  AddPilotInput: AddPilotInput;
  Aircraft: ResolverTypeWrapper<AircraftDb>;
  AircraftCapabilities: AircraftCapabilities;
  AircraftClass: AircraftClass;
  AircraftsPage: ResolverTypeWrapper<Omit<AircraftsPage, 'items'> & { items: Array<ResolversTypes['Aircraft']> }>;
  BaseFlightStats: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseFlightStats']>;
  ByAcftStatsInput: ByAcftStatsInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ByAircraftModelStats: ResolverTypeWrapper<ByAircraftModelStatsDb>;
  ByAircraftStats: ResolverTypeWrapper<ByAircraftStatsDb>;
  ByInstructorStats: ResolverTypeWrapper<ByInstructorStatsDb>;
  Credential: ResolverTypeWrapper<Credential>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Email: ResolverTypeWrapper<Email>;
  Flight: ResolverTypeWrapper<FlightDb>;
  FlightPageTotals: ResolverTypeWrapper<FlightPageTotals>;
  FlightStats: ResolverTypeWrapper<FlightStatsDb>;
  FlightTotals: ResolverTypeWrapper<FlightTotals>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  FlightsPage: ResolverTypeWrapper<Omit<FlightsPage, 'items'> & { items: Array<ResolversTypes['Flight']> }>;
  Juncture: ResolverTypeWrapper<Juncture>;
  JunctureInput: JunctureInput;
  LandingTotals: ResolverTypeWrapper<LandingTotals>;
  Landings: ResolverTypeWrapper<LandingsDb>;
  LandingsInput: LandingsInput;
  Mutation: ResolverTypeWrapper<{}>;
  OperationalTime: ResolverTypeWrapper<OperationalTimeDb>;
  OperationalTimeInput: OperationalTimeInput;
  PagerInput: PagerInput;
  PaginationInput: PaginationInput;
  Password: ResolverTypeWrapper<Password>;
  Pilot: ResolverTypeWrapper<PilotDb>;
  PilotFunctionTime: ResolverTypeWrapper<PilotFunctionTimeDb>;
  PilotFunctionTimeInput: PilotFunctionTimeInput;
  PilotsPage: ResolverTypeWrapper<Omit<PilotsPage, 'items'> & { items: Array<ResolversTypes['Pilot']> }>;
  PlaceTupleStat: ResolverTypeWrapper<PlaceTupleStat>;
  Query: ResolverTypeWrapper<{}>;
  SearchInput: SearchInput;
  SinglePilotFlightTime: ResolverTypeWrapper<SinglePilotFlightTime>;
  SinglePilotFlightTimeInput: SinglePilotFlightTimeInput;
  SortInput: SortInput;
  SortOrder: SortOrder;
  UpdateAircraftInput: UpdateAircraftInput;
  UpdateFlightInput: UpdateFlightInput;
  UpdatePilotInput: UpdatePilotInput;
  AdditionalEntityFields: AdditionalEntityFields;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddAircraftInput: AddAircraftInput;
  String: Scalars['String']['output'];
  AddFlightInput: AddFlightInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  AddPilotInput: AddPilotInput;
  Aircraft: AircraftDb;
  AircraftsPage: Omit<AircraftsPage, 'items'> & { items: Array<ResolversParentTypes['Aircraft']> };
  BaseFlightStats: ResolversInterfaceTypes<ResolversParentTypes>['BaseFlightStats'];
  ByAcftStatsInput: ByAcftStatsInput;
  Boolean: Scalars['Boolean']['output'];
  ByAircraftModelStats: ByAircraftModelStatsDb;
  ByAircraftStats: ByAircraftStatsDb;
  ByInstructorStats: ByInstructorStatsDb;
  Credential: Credential;
  Date: Scalars['Date']['output'];
  Email: Email;
  Flight: FlightDb;
  FlightPageTotals: FlightPageTotals;
  FlightStats: FlightStatsDb;
  FlightTotals: FlightTotals;
  Float: Scalars['Float']['output'];
  FlightsPage: Omit<FlightsPage, 'items'> & { items: Array<ResolversParentTypes['Flight']> };
  Juncture: Juncture;
  JunctureInput: JunctureInput;
  LandingTotals: LandingTotals;
  Landings: LandingsDb;
  LandingsInput: LandingsInput;
  Mutation: {};
  OperationalTime: OperationalTimeDb;
  OperationalTimeInput: OperationalTimeInput;
  PagerInput: PagerInput;
  PaginationInput: PaginationInput;
  Password: Password;
  Pilot: PilotDb;
  PilotFunctionTime: PilotFunctionTimeDb;
  PilotFunctionTimeInput: PilotFunctionTimeInput;
  PilotsPage: Omit<PilotsPage, 'items'> & { items: Array<ResolversParentTypes['Pilot']> };
  PlaceTupleStat: PlaceTupleStat;
  Query: {};
  SearchInput: SearchInput;
  SinglePilotFlightTime: SinglePilotFlightTime;
  SinglePilotFlightTimeInput: SinglePilotFlightTimeInput;
  SortInput: SortInput;
  UpdateAircraftInput: UpdateAircraftInput;
  UpdateFlightInput: UpdateFlightInput;
  UpdatePilotInput: UpdatePilotInput;
  AdditionalEntityFields: AdditionalEntityFields;
}>;

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']['input'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String']['input'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = ApolloServerContextFn, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AircraftResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Aircraft'] = ResolversParentTypes['Aircraft']> = ResolversObject<{
  brand?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  capabilities?: Resolver<Array<ResolversTypes['AircraftCapabilities']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  registration?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AircraftsPageResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['AircraftsPage'] = ResolversParentTypes['AircraftsPage']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['Aircraft']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BaseFlightStatsResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['BaseFlightStats'] = ResolversParentTypes['BaseFlightStats']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ByAircraftModelStats' | 'ByAircraftStats' | 'ByInstructorStats' | 'FlightStats', ParentType, ContextType>;
  flightAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  totalCOPI?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalDC?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalFlightTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalInstructor?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPIC?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type ByAircraftModelStatsResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['ByAircraftModelStats'] = ResolversParentTypes['ByAircraftModelStats']> = ResolversObject<{
  aircraftModel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  byAircraft?: Resolver<Array<ResolversTypes['ByAircraftStats']>, ParentType, ContextType>;
  byInstructor?: Resolver<Array<ResolversTypes['ByInstructorStats']>, ParentType, ContextType>;
  flightAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  totalCOPI?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalDC?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalFlightTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalInstructor?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPIC?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ByAircraftStatsResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['ByAircraftStats'] = ResolversParentTypes['ByAircraftStats']> = ResolversObject<{
  aircraft?: Resolver<ResolversTypes['Aircraft'], ParentType, ContextType>;
  byAircraftModel?: Resolver<Array<ResolversTypes['ByAircraftModelStats']>, ParentType, ContextType>;
  byInstructor?: Resolver<Array<ResolversTypes['ByInstructorStats']>, ParentType, ContextType>;
  flightAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  totalCOPI?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalDC?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalFlightTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalInstructor?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPIC?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ByInstructorStatsResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['ByInstructorStats'] = ResolversParentTypes['ByInstructorStats']> = ResolversObject<{
  byAircraft?: Resolver<Array<ResolversTypes['ByAircraftStats']>, ParentType, ContextType>;
  byAircraftModel?: Resolver<Array<ResolversTypes['ByAircraftModelStats']>, ParentType, ContextType>;
  flightAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  instructor?: Resolver<ResolversTypes['Pilot'], ParentType, ContextType>;
  totalCOPI?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalDC?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalFlightTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalInstructor?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPIC?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  aircraft?: Resolver<Maybe<ResolversTypes['Aircraft']>, ParentType, ContextType>;
  aircraftClass?: Resolver<ResolversTypes['AircraftClass'], ParentType, ContextType>;
  arrival?: Resolver<ResolversTypes['Juncture'], ParentType, ContextType>;
  departure?: Resolver<ResolversTypes['Juncture'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ifrApproaches?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  landings?: Resolver<ResolversTypes['Landings'], ParentType, ContextType>;
  operationalTime?: Resolver<ResolversTypes['OperationalTime'], ParentType, ContextType>;
  pic?: Resolver<ResolversTypes['Pilot'], ParentType, ContextType>;
  pilot?: Resolver<ResolversTypes['Pilot'], ParentType, ContextType>;
  pilotFunctionTime?: Resolver<ResolversTypes['PilotFunctionTime'], ParentType, ContextType>;
  remarks?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  simulatorType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalFlightTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FlightPageTotalsResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['FlightPageTotals'] = ResolversParentTypes['FlightPageTotals']> = ResolversObject<{
  copilot?: Resolver<ResolversTypes['FlightTotals'], ParentType, ContextType>;
  dualCommand?: Resolver<ResolversTypes['FlightTotals'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  instructor?: Resolver<ResolversTypes['FlightTotals'], ParentType, ContextType>;
  landings?: Resolver<ResolversTypes['LandingTotals'], ParentType, ContextType>;
  multiEngine?: Resolver<ResolversTypes['FlightTotals'], ParentType, ContextType>;
  pic?: Resolver<ResolversTypes['FlightTotals'], ParentType, ContextType>;
  singleEngine?: Resolver<ResolversTypes['FlightTotals'], ParentType, ContextType>;
  totalFlightTime?: Resolver<ResolversTypes['FlightTotals'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FlightStatsResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['FlightStats'] = ResolversParentTypes['FlightStats']> = ResolversObject<{
  byAircraft?: Resolver<Array<ResolversTypes['ByAircraftStats']>, ParentType, ContextType>;
  byAircraftModel?: Resolver<Array<ResolversTypes['ByAircraftModelStats']>, ParentType, ContextType>;
  byInstructor?: Resolver<Array<ResolversTypes['ByInstructorStats']>, ParentType, ContextType>;
  flightAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  totalCOPI?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalDC?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalFlightTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalInstructor?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPIC?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FlightTotalsResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['FlightTotals'] = ResolversParentTypes['FlightTotals']> = ResolversObject<{
  actual?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  preceding?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FlightsPageResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['FlightsPage'] = ResolversParentTypes['FlightsPage']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['Flight']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type JunctureResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Juncture'] = ResolversParentTypes['Juncture']> = ResolversObject<{
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  place?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LandingTotalsResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['LandingTotals'] = ResolversParentTypes['LandingTotals']> = ResolversObject<{
  day?: Resolver<ResolversTypes['FlightTotals'], ParentType, ContextType>;
  night?: Resolver<ResolversTypes['FlightTotals'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LandingsResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Landings'] = ResolversParentTypes['Landings']> = ResolversObject<{
  day?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  night?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addAircraft?: Resolver<ResolversTypes['Aircraft'], ParentType, ContextType, RequireFields<MutationAddAircraftArgs, 'aircraft'>>;
  addFlight?: Resolver<ResolversTypes['Flight'], ParentType, ContextType, RequireFields<MutationAddFlightArgs, 'input'>>;
  addPilot?: Resolver<ResolversTypes['Pilot'], ParentType, ContextType, RequireFields<MutationAddPilotArgs, 'pilot'>>;
  signIn?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'login' | 'pwdHash'>>;
  signOut?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  signUp?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'email' | 'firstName' | 'lastName' | 'pwdHash' | 'pwdHash2' | 'username'>>;
  updateAircraft?: Resolver<ResolversTypes['Aircraft'], ParentType, ContextType, RequireFields<MutationUpdateAircraftArgs, 'aircraft' | 'id'>>;
  updateFlight?: Resolver<ResolversTypes['Flight'], ParentType, ContextType, RequireFields<MutationUpdateFlightArgs, 'id' | 'input'>>;
  updatePilot?: Resolver<ResolversTypes['Pilot'], ParentType, ContextType, RequireFields<MutationUpdatePilotArgs, 'id' | 'pilot'>>;
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

export type PilotsPageResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['PilotsPage'] = ResolversParentTypes['PilotsPage']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['Pilot']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaceTupleStatResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['PlaceTupleStat'] = ResolversParentTypes['PlaceTupleStat']> = ResolversObject<{
  arrival?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  departure?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  times?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  aircraft?: Resolver<ResolversTypes['Aircraft'], ParentType, ContextType, RequireFields<QueryAircraftArgs, 'id'>>;
  aircrafts?: Resolver<ResolversTypes['AircraftsPage'], ParentType, ContextType, Partial<QueryAircraftsArgs>>;
  currentPilot?: Resolver<Maybe<ResolversTypes['Pilot']>, ParentType, ContextType>;
  flight?: Resolver<ResolversTypes['Flight'], ParentType, ContextType, RequireFields<QueryFlightArgs, 'id'>>;
  flightPlaceStats?: Resolver<Array<ResolversTypes['PlaceTupleStat']>, ParentType, ContextType>;
  flightStats?: Resolver<ResolversTypes['FlightStats'], ParentType, ContextType>;
  fromDateFlightStats?: Resolver<ResolversTypes['FlightStats'], ParentType, ContextType, Partial<QueryFromDateFlightStatsArgs>>;
  lastFlightDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  ocaiCodes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  ownFlights?: Resolver<ResolversTypes['FlightsPage'], ParentType, ContextType, Partial<QueryOwnFlightsArgs>>;
  ownFlightsTotals?: Resolver<ResolversTypes['FlightPageTotals'], ParentType, ContextType, Partial<QueryOwnFlightsTotalsArgs>>;
  pilot?: Resolver<ResolversTypes['Pilot'], ParentType, ContextType, RequireFields<QueryPilotArgs, 'id'>>;
  pilots?: Resolver<ResolversTypes['PilotsPage'], ParentType, ContextType, Partial<QueryPilotsArgs>>;
}>;

export type SinglePilotFlightTimeResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['SinglePilotFlightTime'] = ResolversParentTypes['SinglePilotFlightTime']> = ResolversObject<{
  multiEngine?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  singleEngine?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ApolloServerContextFn> = ResolversObject<{
  Aircraft?: AircraftResolvers<ContextType>;
  AircraftsPage?: AircraftsPageResolvers<ContextType>;
  BaseFlightStats?: BaseFlightStatsResolvers<ContextType>;
  ByAircraftModelStats?: ByAircraftModelStatsResolvers<ContextType>;
  ByAircraftStats?: ByAircraftStatsResolvers<ContextType>;
  ByInstructorStats?: ByInstructorStatsResolvers<ContextType>;
  Credential?: CredentialResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Email?: EmailResolvers<ContextType>;
  Flight?: FlightResolvers<ContextType>;
  FlightPageTotals?: FlightPageTotalsResolvers<ContextType>;
  FlightStats?: FlightStatsResolvers<ContextType>;
  FlightTotals?: FlightTotalsResolvers<ContextType>;
  FlightsPage?: FlightsPageResolvers<ContextType>;
  Juncture?: JunctureResolvers<ContextType>;
  LandingTotals?: LandingTotalsResolvers<ContextType>;
  Landings?: LandingsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OperationalTime?: OperationalTimeResolvers<ContextType>;
  Password?: PasswordResolvers<ContextType>;
  Pilot?: PilotResolvers<ContextType>;
  PilotFunctionTime?: PilotFunctionTimeResolvers<ContextType>;
  PilotsPage?: PilotsPageResolvers<ContextType>;
  PlaceTupleStat?: PlaceTupleStatResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
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
  capabilities: Array<AircraftCapabilities>,
  _id: ObjectId,
  model: string,
  registration: string,
};

export type ByAircraftModelStatsDb = {
  aircraftModel: string,
  flightAmount: number,
  totalCOPI: number,
  totalDC: number,
  totalFlightTime: number,
  totalInstructor: number,
  totalPIC: number,
  _id: string,
  flightsIds: ObjectId[],
};

export type ByAircraftStatsDb = {
  aircraft: AircraftDb,
  flightAmount: number,
  _id: ObjectId,
  totalCOPI: number,
  totalDC: number,
  totalFlightTime: number,
  totalInstructor: number,
  totalPIC: number,
  flightsIds: ObjectId[],
};

export type ByInstructorStatsDb = {
  flightAmount: number,
  _id: ObjectId,
  instructor: PilotDb,
  totalCOPI: number,
  totalDC: number,
  totalFlightTime: number,
  totalInstructor: number,
  totalPIC: number,
  flightsIds: ObjectId[],
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
  aircraft?: Maybe<AircraftDb['_id']>,
  aircraftClass: AircraftClass,
  arrival: JunctureDb,
  departure: JunctureDb,
  _id: ObjectId,
  ifrApproaches: number,
  landings: LandingsDb,
  operationalTime: OperationalTimeDb,
  pic: PilotDb['_id'],
  pilot: PilotDb['_id'],
  pilotFunctionTime: PilotFunctionTimeDb,
  remarks: string,
  totalFlightTime: number,
};

export type FlightStatsDb = {
  flightAmount: number,
  id: string,
  totalCOPI: number,
  totalDC: number,
  totalFlightTime: number,
  totalInstructor: number,
  totalPIC: number,
  flightsIds: ObjectId[],
};

export type JunctureDb = {
  date: any,
  place: string,
};

export type LandingsDb = {
  day: number,
  night: number,
};

export type OperationalTimeDb = {
  ifr: number,
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

export type PilotFunctionTimeDb = {
  coPilot: number,
  dualCommand: number,
  instructor: number,
  pic: number,
};

export type SinglePilotFlightTimeDb = {
  multiEngine: number,
  singleEngine: number,
};
