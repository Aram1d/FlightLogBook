import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ApolloServerContextFn } from './contextFns';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export type AddAircraftInput = {
  brand: Scalars['String'];
  capabilities: Array<AircraftCapabilities>;
  model: Scalars['String'];
  registration: Scalars['String'];
};

export type AddFlightInput = {
  aircraft?: InputMaybe<Scalars['ID']>;
  aircraftClass: AircraftClass;
  arrival: JunctureInput;
  departure: JunctureInput;
  ifrApproaches: Scalars['Int'];
  landings: LandingsInput;
  operationalTime: OperationalTimeInput;
  pic: Scalars['ID'];
  pilotFunctionTime: PilotFunctionTimeInput;
  remarks: Scalars['String'];
  simulatorType?: InputMaybe<Scalars['String']>;
  totalFlightTime: Scalars['Int'];
};

export type AddPilotInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
};

export type Aircraft = {
  __typename?: 'Aircraft';
  brand: Scalars['String'];
  capabilities: Array<AircraftCapabilities>;
  id: Scalars['ID'];
  model: Scalars['String'];
  registration: Scalars['String'];
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
  total: Scalars['Int'];
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
  aircraft?: Maybe<Aircraft>;
  aircraftClass: AircraftClass;
  arrival: Juncture;
  departure: Juncture;
  id: Scalars['ID'];
  ifrApproaches: Scalars['Int'];
  landings: Landings;
  operationalTime: OperationalTime;
  pic: Pilot;
  pilot: Pilot;
  pilotFunctionTime: PilotFunctionTime;
  remarks: Scalars['String'];
  simulatorType?: Maybe<Scalars['String']>;
  totalFlightTime: Scalars['Int'];
};

export type FlightStats = {
  __typename?: 'FlightStats';
  flightAmount: Scalars['Int'];
  totalCOPI: Scalars['Int'];
  totalDC: Scalars['Int'];
  totalFlightTime: Scalars['Int'];
  totalInstructor: Scalars['Int'];
  totalPIC: Scalars['Int'];
};

export type FlightsPage = {
  __typename?: 'FlightsPage';
  items: Array<Flight>;
  total: Scalars['Int'];
};

export type Juncture = {
  __typename?: 'Juncture';
  date: Scalars['Date'];
  place: Scalars['String'];
};

export type JunctureInput = {
  date: Scalars['Date'];
  place: Scalars['String'];
};

export type Landings = {
  __typename?: 'Landings';
  day: Scalars['Int'];
  night: Scalars['Int'];
};

export type LandingsInput = {
  day: Scalars['Int'];
  night: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAircraft: Aircraft;
  addFlight: Flight;
  addPilot: Pilot;
  signIn: Scalars['String'];
  signOut: Scalars['Boolean'];
  signUp: Scalars['String'];
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


export type MutationUpdateAircraftArgs = {
  aircraft: UpdateAircraftInput;
  id: Scalars['ID'];
};


export type MutationUpdateFlightArgs = {
  id: Scalars['ID'];
  input: UpdateFlightInput;
};


export type MutationUpdatePilotArgs = {
  id: Scalars['ID'];
  pilot: UpdatePilotInput;
};

export type OperationalTime = {
  __typename?: 'OperationalTime';
  ifr: Scalars['Int'];
  night: Scalars['Int'];
};

export type OperationalTimeInput = {
  ifr: Scalars['Int'];
  night: Scalars['Int'];
};

export type PagerInput = {
  fieldSearches?: InputMaybe<Array<SearchInput>>;
  globalSearch?: InputMaybe<Scalars['String']>;
  pagination?: InputMaybe<PaginationInput>;
  sorts?: InputMaybe<Array<SortInput>>;
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

export type PilotFunctionTimeInput = {
  coPilot: Scalars['Int'];
  dualCommand: Scalars['Int'];
  instructor: Scalars['Int'];
  pic: Scalars['Int'];
};

export type PilotsPage = {
  __typename?: 'PilotsPage';
  items: Array<Pilot>;
  total: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  aircraft: Aircraft;
  aircrafts: AircraftsPage;
  currentPilot?: Maybe<Pilot>;
  flight: Flight;
  flightStats: FlightStats;
  lastFlightDate?: Maybe<Scalars['Date']>;
  ocaiCodes: Array<Scalars['String']>;
  ownFlights: FlightsPage;
  pilot: Pilot;
  pilots: PilotsPage;
};


export type QueryAircraftArgs = {
  id: Scalars['ID'];
};


export type QueryAircraftsArgs = {
  pager?: InputMaybe<PagerInput>;
};


export type QueryFlightArgs = {
  id: Scalars['ID'];
};


export type QueryOwnFlightsArgs = {
  pager?: InputMaybe<PagerInput>;
};


export type QueryPilotArgs = {
  id: Scalars['ID'];
};


export type QueryPilotsArgs = {
  pager?: InputMaybe<PagerInput>;
};

export type SearchInput = {
  field: Scalars['String'];
  value: Scalars['String'];
};

export type SinglePilotFlightTime = {
  __typename?: 'SinglePilotFlightTime';
  multiEngine: Scalars['Int'];
  singleEngine: Scalars['Int'];
};

export type SinglePilotFlightTimeInput = {
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

export type UpdateAircraftInput = {
  brand?: InputMaybe<Scalars['String']>;
  capabilities?: InputMaybe<Array<AircraftCapabilities>>;
  model?: InputMaybe<Scalars['String']>;
  registration?: InputMaybe<Scalars['String']>;
};

export type UpdateFlightInput = {
  aircraft?: InputMaybe<Scalars['ID']>;
  aircraftClass?: InputMaybe<AircraftClass>;
  arrival?: InputMaybe<JunctureInput>;
  departure?: InputMaybe<JunctureInput>;
  ifrApproaches?: InputMaybe<Scalars['Int']>;
  landings?: InputMaybe<LandingsInput>;
  operationalTime?: InputMaybe<OperationalTimeInput>;
  pic?: InputMaybe<Scalars['ID']>;
  pilotFunctionTime?: InputMaybe<PilotFunctionTimeInput>;
  remarks?: InputMaybe<Scalars['String']>;
  simulatorType?: InputMaybe<Scalars['String']>;
  totalFlightTime?: InputMaybe<Scalars['Int']>;
};

export type UpdatePilotInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

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
  AddAircraftInput: AddAircraftInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  AddFlightInput: AddFlightInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  AddPilotInput: AddPilotInput;
  Aircraft: ResolverTypeWrapper<AircraftDb>;
  AircraftCapabilities: AircraftCapabilities;
  AircraftClass: AircraftClass;
  AircraftsPage: ResolverTypeWrapper<Omit<AircraftsPage, 'items'> & { items: Array<ResolversTypes['Aircraft']> }>;
  Credential: ResolverTypeWrapper<Credential>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Email: ResolverTypeWrapper<Email>;
  Flight: ResolverTypeWrapper<FlightDb>;
  FlightStats: ResolverTypeWrapper<FlightStats>;
  FlightsPage: ResolverTypeWrapper<Omit<FlightsPage, 'items'> & { items: Array<ResolversTypes['Flight']> }>;
  Juncture: ResolverTypeWrapper<Juncture>;
  JunctureInput: JunctureInput;
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
  String: Scalars['String'];
  AddFlightInput: AddFlightInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  AddPilotInput: AddPilotInput;
  Aircraft: AircraftDb;
  AircraftsPage: Omit<AircraftsPage, 'items'> & { items: Array<ResolversParentTypes['Aircraft']> };
  Credential: Credential;
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  Email: Email;
  Flight: FlightDb;
  FlightStats: FlightStats;
  FlightsPage: Omit<FlightsPage, 'items'> & { items: Array<ResolversParentTypes['Flight']> };
  Juncture: Juncture;
  JunctureInput: JunctureInput;
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

export type FlightStatsResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['FlightStats'] = ResolversParentTypes['FlightStats']> = ResolversObject<{
  flightAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalCOPI?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalDC?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalFlightTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalInstructor?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPIC?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export type QueryResolvers<ContextType = ApolloServerContextFn, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  aircraft?: Resolver<ResolversTypes['Aircraft'], ParentType, ContextType, RequireFields<QueryAircraftArgs, 'id'>>;
  aircrafts?: Resolver<ResolversTypes['AircraftsPage'], ParentType, ContextType, Partial<QueryAircraftsArgs>>;
  currentPilot?: Resolver<Maybe<ResolversTypes['Pilot']>, ParentType, ContextType>;
  flight?: Resolver<ResolversTypes['Flight'], ParentType, ContextType, RequireFields<QueryFlightArgs, 'id'>>;
  flightStats?: Resolver<ResolversTypes['FlightStats'], ParentType, ContextType>;
  lastFlightDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  ocaiCodes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  ownFlights?: Resolver<ResolversTypes['FlightsPage'], ParentType, ContextType, Partial<QueryOwnFlightsArgs>>;
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
  Credential?: CredentialResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Email?: EmailResolvers<ContextType>;
  Flight?: FlightResolvers<ContextType>;
  FlightStats?: FlightStatsResolvers<ContextType>;
  FlightsPage?: FlightsPageResolvers<ContextType>;
  Juncture?: JunctureResolvers<ContextType>;
  Landings?: LandingsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OperationalTime?: OperationalTimeResolvers<ContextType>;
  Password?: PasswordResolvers<ContextType>;
  Pilot?: PilotResolvers<ContextType>;
  PilotFunctionTime?: PilotFunctionTimeResolvers<ContextType>;
  PilotsPage?: PilotsPageResolvers<ContextType>;
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
