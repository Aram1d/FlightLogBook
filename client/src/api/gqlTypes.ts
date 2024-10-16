import { offlineExchange } from "@urql/exchange-graphcache";
import {
  Resolver as GraphCacheResolver,
  UpdateResolver as GraphCacheUpdateResolver,
  OptimisticMutationResolver as GraphCacheOptimisticMutationResolver,
} from "@urql/exchange-graphcache";

import { DocumentNode } from "graphql";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date | null;
};

export type AddAircraftInput = {
  brand: Scalars["String"];
  capabilities: Array<AircraftCapabilities>;
  model: Scalars["String"];
  registration: Scalars["String"];
};

export type AddFlightInput = {
  aircraft?: InputMaybe<Scalars["ID"]>;
  aircraftClass: AircraftClass;
  arrival: JunctureInput;
  departure: JunctureInput;
  ifrApproaches: Scalars["Int"];
  landings: LandingsInput;
  operationalTime: OperationalTimeInput;
  pic: Scalars["ID"];
  pilotFunctionTime: PilotFunctionTimeInput;
  remarks: Scalars["String"];
  simulatorType?: InputMaybe<Scalars["String"]>;
  totalFlightTime: Scalars["Int"];
};

export type AddPilotInput = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  username: Scalars["String"];
};

export type Aircraft = {
  __typename?: "Aircraft";
  brand: Scalars["String"];
  capabilities: Array<AircraftCapabilities>;
  id: Scalars["ID"];
  model: Scalars["String"];
  registration: Scalars["String"];
};

export enum AircraftCapabilities {
  IsIfr = "isIFR",
  IsMultiEngine = "isMultiEngine",
}

export enum AircraftClass {
  MultiEngine = "multiEngine",
  MultiPilot = "multiPilot",
  SingleEngine = "singleEngine",
}

export type AircraftsPage = {
  __typename?: "AircraftsPage";
  items: Array<Aircraft>;
  total: Scalars["Int"];
};

export type BaseFlightStats = {
  flightAmount: Scalars["Int"];
  id: Scalars["ID"];
  totalCOPI: Scalars["Int"];
  totalDC: Scalars["Int"];
  totalFlightTime: Scalars["Int"];
  totalInstructor: Scalars["Int"];
  totalPIC: Scalars["Int"];
};

export type ByAcftStatsInput = {
  mergeByModel?: InputMaybe<Scalars["Boolean"]>;
};

export type ByAircraftModelStats = BaseFlightStats & {
  __typename?: "ByAircraftModelStats";
  aircraftModel: Scalars["String"];
  byAircraft: Array<ByAircraftStats>;
  byInstructor: Array<ByInstructorStats>;
  flightAmount: Scalars["Int"];
  id: Scalars["ID"];
  totalCOPI: Scalars["Int"];
  totalDC: Scalars["Int"];
  totalFlightTime: Scalars["Int"];
  totalInstructor: Scalars["Int"];
  totalPIC: Scalars["Int"];
};

export type ByAircraftStats = BaseFlightStats & {
  __typename?: "ByAircraftStats";
  aircraft: Aircraft;
  byAircraftModel: Array<ByAircraftModelStats>;
  byInstructor: Array<ByInstructorStats>;
  flightAmount: Scalars["Int"];
  id: Scalars["ID"];
  totalCOPI: Scalars["Int"];
  totalDC: Scalars["Int"];
  totalFlightTime: Scalars["Int"];
  totalInstructor: Scalars["Int"];
  totalPIC: Scalars["Int"];
};

export type ByInstructorStats = BaseFlightStats & {
  __typename?: "ByInstructorStats";
  byAircraft: Array<ByAircraftStats>;
  byAircraftModel: Array<ByAircraftModelStats>;
  flightAmount: Scalars["Int"];
  id: Scalars["ID"];
  instructor: Pilot;
  totalCOPI: Scalars["Int"];
  totalDC: Scalars["Int"];
  totalFlightTime: Scalars["Int"];
  totalInstructor: Scalars["Int"];
  totalPIC: Scalars["Int"];
};

export type Credential = {
  __typename?: "Credential";
  id: Scalars["ID"];
  ipv4: Scalars["String"];
  isThisConnection: Scalars["Boolean"];
  lastUsed: Scalars["String"];
  userAgent: Scalars["String"];
};

export type Email = {
  __typename?: "Email";
  address: Scalars["String"];
  verified: Scalars["Boolean"];
};

export type Flight = {
  __typename?: "Flight";
  aircraft?: Maybe<Aircraft>;
  aircraftClass: AircraftClass;
  arrival: Juncture;
  departure: Juncture;
  id: Scalars["ID"];
  ifrApproaches: Scalars["Int"];
  landings: Landings;
  operationalTime: OperationalTime;
  pic: Pilot;
  pilot: Pilot;
  pilotFunctionTime: PilotFunctionTime;
  remarks: Scalars["String"];
  simulatorType?: Maybe<Scalars["String"]>;
  totalFlightTime: Scalars["Int"];
};

export type FlightPageTotals = {
  __typename?: "FlightPageTotals";
  copilot: FlightTotals;
  dualCommand: FlightTotals;
  id: Scalars["ID"];
  instructor: FlightTotals;
  landings: LandingTotals;
  multiEngine: FlightTotals;
  pic: FlightTotals;
  singleEngine: FlightTotals;
  totalFlightTime: FlightTotals;
};

export type FlightStats = BaseFlightStats & {
  __typename?: "FlightStats";
  byAircraft: Array<ByAircraftStats>;
  byAircraftModel: Array<ByAircraftModelStats>;
  byInstructor: Array<ByInstructorStats>;
  flightAmount: Scalars["Int"];
  id: Scalars["ID"];
  totalCOPI: Scalars["Int"];
  totalDC: Scalars["Int"];
  totalFlightTime: Scalars["Int"];
  totalInstructor: Scalars["Int"];
  totalPIC: Scalars["Int"];
};

export type FlightTotals = {
  __typename?: "FlightTotals";
  actual: Scalars["Float"];
  page: Scalars["Float"];
  preceding: Scalars["Float"];
};

export type FlightsPage = {
  __typename?: "FlightsPage";
  items: Array<Flight>;
  total: Scalars["Int"];
};

export type Juncture = {
  __typename?: "Juncture";
  date: Scalars["Date"];
  place: Scalars["String"];
};

export type JunctureInput = {
  date: Scalars["Date"];
  place: Scalars["String"];
};

export type LandingTotals = {
  __typename?: "LandingTotals";
  day: FlightTotals;
  night: FlightTotals;
};

export type Landings = {
  __typename?: "Landings";
  day: Scalars["Int"];
  night: Scalars["Int"];
};

export type LandingsInput = {
  day: Scalars["Int"];
  night: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  addAircraft: Aircraft;
  addFlight: Flight;
  addPilot: Pilot;
  signIn: Scalars["String"];
  signOut: Scalars["Boolean"];
  signUp: Scalars["String"];
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
  login: Scalars["String"];
  pwdHash: Scalars["String"];
};

export type MutationSignUpArgs = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  pwdHash: Scalars["String"];
  pwdHash2: Scalars["String"];
  username: Scalars["String"];
};

export type MutationUpdateAircraftArgs = {
  aircraft: UpdateAircraftInput;
  id: Scalars["ID"];
};

export type MutationUpdateFlightArgs = {
  id: Scalars["ID"];
  input: UpdateFlightInput;
};

export type MutationUpdatePilotArgs = {
  id: Scalars["ID"];
  pilot: UpdatePilotInput;
};

export type OperationalTime = {
  __typename?: "OperationalTime";
  ifr: Scalars["Int"];
  night: Scalars["Int"];
};

export type OperationalTimeInput = {
  ifr: Scalars["Int"];
  night: Scalars["Int"];
};

export type PagerInput = {
  fieldSearches?: InputMaybe<Array<SearchInput>>;
  globalSearch?: InputMaybe<Scalars["String"]>;
  pagination?: InputMaybe<PaginationInput>;
  sorts?: InputMaybe<Array<SortInput>>;
};

export type PaginationInput = {
  limit: Scalars["Int"];
  page: Scalars["Int"];
};

export type Password = {
  __typename?: "Password";
  createdAt: Scalars["String"];
};

export type Pilot = {
  __typename?: "Pilot";
  credentials: Array<Credential>;
  email: Email;
  firstName: Scalars["String"];
  id: Scalars["ID"];
  lastName: Scalars["String"];
  passwords: Array<Password>;
  username: Scalars["String"];
};

export type PilotFunctionTime = {
  __typename?: "PilotFunctionTime";
  coPilot: Scalars["Int"];
  dualCommand: Scalars["Int"];
  instructor: Scalars["Int"];
  pic: Scalars["Int"];
};

export type PilotFunctionTimeInput = {
  coPilot: Scalars["Int"];
  dualCommand: Scalars["Int"];
  instructor: Scalars["Int"];
  pic: Scalars["Int"];
};

export type PilotsPage = {
  __typename?: "PilotsPage";
  items: Array<Pilot>;
  total: Scalars["Int"];
};

export type PlaceTupleStat = {
  __typename?: "PlaceTupleStat";
  arrival: Scalars["String"];
  departure: Scalars["String"];
  times: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  aircraft: Aircraft;
  aircrafts: AircraftsPage;
  currentPilot?: Maybe<Pilot>;
  flight: Flight;
  flightPlaceStats: Array<PlaceTupleStat>;
  flightStats: FlightStats;
  fromDateFlightStats: FlightStats;
  lastFlightDate?: Maybe<Scalars["Date"]>;
  ocaiCodes: Array<Scalars["String"]>;
  ownFlights: FlightsPage;
  ownFlightsTotals: FlightPageTotals;
  pilot: Pilot;
  pilots: PilotsPage;
};

export type QueryAircraftArgs = {
  id: Scalars["ID"];
};

export type QueryAircraftsArgs = {
  pager?: InputMaybe<PagerInput>;
};

export type QueryFlightArgs = {
  id: Scalars["ID"];
};

export type QueryFromDateFlightStatsArgs = {
  date?: InputMaybe<Scalars["Date"]>;
};

export type QueryOwnFlightsArgs = {
  pager?: InputMaybe<PagerInput>;
};

export type QueryOwnFlightsTotalsArgs = {
  pager?: InputMaybe<PagerInput>;
};

export type QueryPilotArgs = {
  id: Scalars["ID"];
};

export type QueryPilotsArgs = {
  pager?: InputMaybe<PagerInput>;
};

export type SearchInput = {
  field: Scalars["String"];
  value: Scalars["String"];
};

export type SinglePilotFlightTime = {
  __typename?: "SinglePilotFlightTime";
  multiEngine: Scalars["Int"];
  singleEngine: Scalars["Int"];
};

export type SinglePilotFlightTimeInput = {
  multiEngine: Scalars["Int"];
  singleEngine: Scalars["Int"];
};

export type SortInput = {
  field: Scalars["String"];
  order: SortOrder;
};

export enum SortOrder {
  Asc = "ASC",
  Desc = "DESC",
}

export type UpdateAircraftInput = {
  brand?: InputMaybe<Scalars["String"]>;
  capabilities?: InputMaybe<Array<AircraftCapabilities>>;
  model?: InputMaybe<Scalars["String"]>;
  registration?: InputMaybe<Scalars["String"]>;
};

export type UpdateFlightInput = {
  aircraft?: InputMaybe<Scalars["ID"]>;
  aircraftClass?: InputMaybe<AircraftClass>;
  arrival?: InputMaybe<JunctureInput>;
  departure?: InputMaybe<JunctureInput>;
  ifrApproaches?: InputMaybe<Scalars["Int"]>;
  landings?: InputMaybe<LandingsInput>;
  operationalTime?: InputMaybe<OperationalTimeInput>;
  pic?: InputMaybe<Scalars["ID"]>;
  pilotFunctionTime?: InputMaybe<PilotFunctionTimeInput>;
  remarks?: InputMaybe<Scalars["String"]>;
  simulatorType?: InputMaybe<Scalars["String"]>;
  totalFlightTime?: InputMaybe<Scalars["Int"]>;
};

export type UpdatePilotInput = {
  email?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type AircraftQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type AircraftQuery = {
  __typename?: "Query";
  aircraft: {
    __typename?: "Aircraft";
    id: string;
    brand: string;
    model: string;
    registration: string;
    capabilities: Array<AircraftCapabilities>;
  };
};

export type AircraftsQueryVariables = Exact<{
  pager?: InputMaybe<PagerInput>;
}>;

export type AircraftsQuery = {
  __typename?: "Query";
  aircrafts: {
    __typename?: "AircraftsPage";
    total: number;
    items: Array<{
      __typename?: "Aircraft";
      id: string;
      brand: string;
      model: string;
      registration: string;
      capabilities: Array<AircraftCapabilities>;
    }>;
  };
};

export type AircraftsRegsQueryVariables = Exact<{ [key: string]: never }>;

export type AircraftsRegsQuery = {
  __typename?: "Query";
  aircrafts: {
    __typename?: "AircraftsPage";
    items: Array<{
      __typename?: "Aircraft";
      id: string;
      registration: string;
      model: string;
    }>;
  };
};

export type AddAircraftMutationVariables = Exact<{
  aircraft: AddAircraftInput;
}>;

export type AddAircraftMutation = {
  __typename?: "Mutation";
  addAircraft: { __typename?: "Aircraft"; id: string };
};

export type UpdateAircraftMutationVariables = Exact<{
  id: Scalars["ID"];
  aircraft: UpdateAircraftInput;
}>;

export type UpdateAircraftMutation = {
  __typename?: "Mutation";
  updateAircraft: { __typename?: "Aircraft"; id: string };
};

export type OcaiCodesQueryVariables = Exact<{ [key: string]: never }>;

export type OcaiCodesQuery = { __typename?: "Query"; ocaiCodes: Array<string> };

export type FullFLightFragment = {
  __typename: "Flight";
  id: string;
  totalFlightTime: number;
  aircraftClass: AircraftClass;
  ifrApproaches: number;
  remarks: string;
  departure: { __typename?: "Juncture"; date: Date | null; place: string };
  arrival: { __typename?: "Juncture"; date: Date | null; place: string };
  pilot: {
    __typename?: "Pilot";
    id: string;
    firstName: string;
    lastName: string;
  };
  pic: {
    __typename?: "Pilot";
    id: string;
    firstName: string;
    lastName: string;
  };
  aircraft?: {
    __typename?: "Aircraft";
    id: string;
    registration: string;
  } | null;
  landings: { __typename?: "Landings"; day: number; night: number };
  operationalTime: {
    __typename?: "OperationalTime";
    ifr: number;
    night: number;
  };
  pilotFunctionTime: {
    __typename?: "PilotFunctionTime";
    pic: number;
    instructor: number;
    coPilot: number;
    dualCommand: number;
  };
};

export type LastFlightDateQueryVariables = Exact<{ [key: string]: never }>;

export type LastFlightDateQuery = {
  __typename?: "Query";
  lastFlightDate?: Date | null | null;
};

export type FlightQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type FlightQuery = {
  __typename?: "Query";
  flight: {
    __typename: "Flight";
    id: string;
    totalFlightTime: number;
    aircraftClass: AircraftClass;
    ifrApproaches: number;
    remarks: string;
    departure: { __typename?: "Juncture"; date: Date | null; place: string };
    arrival: { __typename?: "Juncture"; date: Date | null; place: string };
    pilot: {
      __typename?: "Pilot";
      id: string;
      firstName: string;
      lastName: string;
    };
    pic: {
      __typename?: "Pilot";
      id: string;
      firstName: string;
      lastName: string;
    };
    aircraft?: {
      __typename?: "Aircraft";
      id: string;
      registration: string;
    } | null;
    landings: { __typename?: "Landings"; day: number; night: number };
    operationalTime: {
      __typename?: "OperationalTime";
      ifr: number;
      night: number;
    };
    pilotFunctionTime: {
      __typename?: "PilotFunctionTime";
      pic: number;
      instructor: number;
      coPilot: number;
      dualCommand: number;
    };
  };
};

export type OwnFlightsQueryVariables = Exact<{
  pager?: InputMaybe<PagerInput>;
}>;

export type OwnFlightsQuery = {
  __typename?: "Query";
  ownFlights: {
    __typename?: "FlightsPage";
    total: number;
    items: Array<{
      __typename: "Flight";
      id: string;
      totalFlightTime: number;
      aircraftClass: AircraftClass;
      ifrApproaches: number;
      remarks: string;
      departure: { __typename?: "Juncture"; date: Date | null; place: string };
      arrival: { __typename?: "Juncture"; date: Date | null; place: string };
      pilot: {
        __typename?: "Pilot";
        id: string;
        firstName: string;
        lastName: string;
      };
      pic: {
        __typename?: "Pilot";
        id: string;
        firstName: string;
        lastName: string;
      };
      aircraft?: {
        __typename?: "Aircraft";
        id: string;
        registration: string;
      } | null;
      landings: { __typename?: "Landings"; day: number; night: number };
      operationalTime: {
        __typename?: "OperationalTime";
        ifr: number;
        night: number;
      };
      pilotFunctionTime: {
        __typename?: "PilotFunctionTime";
        pic: number;
        instructor: number;
        coPilot: number;
        dualCommand: number;
      };
    }>;
  };
  ownFlightsTotals: {
    __typename: "FlightPageTotals";
    id: string;
    singleEngine: {
      __typename?: "FlightTotals";
      preceding: number;
      actual: number;
      page: number;
    };
    multiEngine: {
      __typename?: "FlightTotals";
      preceding: number;
      actual: number;
      page: number;
    };
    totalFlightTime: {
      __typename?: "FlightTotals";
      preceding: number;
      actual: number;
      page: number;
    };
    landings: {
      __typename?: "LandingTotals";
      day: {
        __typename?: "FlightTotals";
        preceding: number;
        actual: number;
        page: number;
      };
      night: {
        __typename?: "FlightTotals";
        preceding: number;
        actual: number;
        page: number;
      };
    };
    pic: {
      __typename?: "FlightTotals";
      preceding: number;
      actual: number;
      page: number;
    };
    copilot: {
      __typename?: "FlightTotals";
      preceding: number;
      actual: number;
      page: number;
    };
    dualCommand: {
      __typename?: "FlightTotals";
      preceding: number;
      actual: number;
      page: number;
    };
    instructor: {
      __typename?: "FlightTotals";
      preceding: number;
      actual: number;
      page: number;
    };
  };
};

export type AddFlightMutationVariables = Exact<{
  flight: AddFlightInput;
}>;

export type AddFlightMutation = {
  __typename?: "Mutation";
  addFlight: { __typename?: "Flight"; id: string };
};

export type UpdateFlightMutationVariables = Exact<{
  id: Scalars["ID"];
  flight: UpdateFlightInput;
}>;

export type UpdateFlightMutation = {
  __typename?: "Mutation";
  updateFlight: { __typename?: "Flight"; id: string };
};

type AllStats_ByAircraftModelStats_Fragment = {
  __typename?: "ByAircraftModelStats";
  id: string;
  totalFlightTime: number;
  totalDC: number;
  totalPIC: number;
  totalCOPI: number;
  totalInstructor: number;
  flightAmount: number;
};

type AllStats_ByAircraftStats_Fragment = {
  __typename?: "ByAircraftStats";
  id: string;
  totalFlightTime: number;
  totalDC: number;
  totalPIC: number;
  totalCOPI: number;
  totalInstructor: number;
  flightAmount: number;
};

type AllStats_ByInstructorStats_Fragment = {
  __typename?: "ByInstructorStats";
  id: string;
  totalFlightTime: number;
  totalDC: number;
  totalPIC: number;
  totalCOPI: number;
  totalInstructor: number;
  flightAmount: number;
};

type AllStats_FlightStats_Fragment = {
  __typename?: "FlightStats";
  id: string;
  totalFlightTime: number;
  totalDC: number;
  totalPIC: number;
  totalCOPI: number;
  totalInstructor: number;
  flightAmount: number;
};

export type AllStatsFragment =
  | AllStats_ByAircraftModelStats_Fragment
  | AllStats_ByAircraftStats_Fragment
  | AllStats_ByInstructorStats_Fragment
  | AllStats_FlightStats_Fragment;

export type FlightStatsQueryVariables = Exact<{ [key: string]: never }>;

export type FlightStatsQuery = {
  __typename?: "Query";
  flightStats: {
    __typename?: "FlightStats";
    id: string;
    totalFlightTime: number;
    totalDC: number;
    totalPIC: number;
    totalCOPI: number;
    totalInstructor: number;
    flightAmount: number;
  };
};

export type FromDateFlightStatsQueryVariables = Exact<{
  date: Scalars["Date"];
}>;

export type FromDateFlightStatsQuery = {
  __typename?: "Query";
  fromDateFlightStats: {
    __typename?: "FlightStats";
    id: string;
    totalFlightTime: number;
    totalDC: number;
    totalPIC: number;
    totalCOPI: number;
    totalInstructor: number;
    flightAmount: number;
  };
};

export type ByAircraftStatsQueryVariables = Exact<{ [key: string]: never }>;

export type ByAircraftStatsQuery = {
  __typename?: "Query";
  flightStats: {
    __typename?: "FlightStats";
    id: string;
    byAircraft: Array<{
      __typename?: "ByAircraftStats";
      id: string;
      totalFlightTime: number;
      totalDC: number;
      totalPIC: number;
      totalCOPI: number;
      totalInstructor: number;
      flightAmount: number;
      aircraft: {
        __typename?: "Aircraft";
        id: string;
        brand: string;
        model: string;
        registration: string;
      };
    }>;
    byAircraftModel: Array<{
      __typename?: "ByAircraftModelStats";
      aircraftModel: string;
      id: string;
      totalFlightTime: number;
      totalDC: number;
      totalPIC: number;
      totalCOPI: number;
      totalInstructor: number;
      flightAmount: number;
    }>;
  };
};

export type ByInstructorStatsQueryVariables = Exact<{ [key: string]: never }>;

export type ByInstructorStatsQuery = {
  __typename?: "Query";
  flightStats: {
    __typename?: "FlightStats";
    id: string;
    byInstructor: Array<{
      __typename?: "ByInstructorStats";
      id: string;
      totalDC: number;
      instructor: {
        __typename?: "Pilot";
        id: string;
        firstName: string;
        lastName: string;
      };
      byAircraftModel: Array<{
        __typename?: "ByAircraftModelStats";
        aircraftModel: string;
        totalDC: number;
        byAircraft: Array<{
          __typename?: "ByAircraftStats";
          totalDC: number;
          aircraft: {
            __typename?: "Aircraft";
            id: string;
            brand: string;
            model: string;
            registration: string;
          };
        }>;
      }>;
    }>;
  };
};

export type CurrentPilotQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentPilotQuery = {
  __typename?: "Query";
  currentPilot?: {
    __typename?: "Pilot";
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: { __typename?: "Email"; address: string; verified: boolean };
  } | null;
};

export type PilotQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type PilotQuery = {
  __typename?: "Query";
  pilot: {
    __typename?: "Pilot";
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: { __typename?: "Email"; address: string; verified: boolean };
  };
};

export type PilotsQueryVariables = Exact<{
  pager?: InputMaybe<PagerInput>;
}>;

export type PilotsQuery = {
  __typename?: "Query";
  pilots: {
    __typename?: "PilotsPage";
    total: number;
    items: Array<{
      __typename?: "Pilot";
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: { __typename?: "Email"; address: string; verified: boolean };
    }>;
  };
};

export type PilotsListQueryVariables = Exact<{ [key: string]: never }>;

export type PilotsListQuery = {
  __typename?: "Query";
  pilots: {
    __typename?: "PilotsPage";
    items: Array<{
      __typename?: "Pilot";
      id: string;
      firstName: string;
      lastName: string;
    }>;
  };
};

export type AddPilotMutationVariables = Exact<{
  pilot: AddPilotInput;
}>;

export type AddPilotMutation = {
  __typename?: "Mutation";
  addPilot: { __typename?: "Pilot"; id: string };
};

export type UpdatePilotMutationVariables = Exact<{
  id: Scalars["ID"];
  pilot: UpdatePilotInput;
}>;

export type UpdatePilotMutation = {
  __typename?: "Mutation";
  updatePilot: { __typename?: "Pilot"; id: string };
};

export type SignInMutationVariables = Exact<{
  email: Scalars["String"];
  pwdHash: Scalars["String"];
}>;

export type SignInMutation = { __typename?: "Mutation"; signIn: string };

export type SignUpMutationVariables = Exact<{
  username: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  pwdHash: Scalars["String"];
  pwdHash2: Scalars["String"];
}>;

export type SignUpMutation = { __typename?: "Mutation"; signUp: string };

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: "Mutation"; signOut: boolean };

export const FullFLightFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FullFLight" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Flight" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "departure" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "place" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "arrival" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "place" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "totalFlightTime" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "pilot" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "pic" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "aircraft" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "registration" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "aircraftClass" } },
          { kind: "Field", name: { kind: "Name", value: "ifrApproaches" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "landings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "day" } },
                { kind: "Field", name: { kind: "Name", value: "night" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "operationalTime" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ifr" } },
                { kind: "Field", name: { kind: "Name", value: "night" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "pilotFunctionTime" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "pic" } },
                { kind: "Field", name: { kind: "Name", value: "instructor" } },
                { kind: "Field", name: { kind: "Name", value: "coPilot" } },
                { kind: "Field", name: { kind: "Name", value: "dualCommand" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "remarks" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const AllStatsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AllStats" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "BaseFlightStats" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "totalFlightTime" } },
          { kind: "Field", name: { kind: "Name", value: "totalDC" } },
          { kind: "Field", name: { kind: "Name", value: "totalPIC" } },
          { kind: "Field", name: { kind: "Name", value: "totalCOPI" } },
          { kind: "Field", name: { kind: "Name", value: "totalInstructor" } },
          { kind: "Field", name: { kind: "Name", value: "flightAmount" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const AircraftDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Aircraft" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      directives: [
        { kind: "Directive", name: { kind: "Name", value: "live" } },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "aircraft" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "brand" } },
                { kind: "Field", name: { kind: "Name", value: "model" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "registration" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "capabilities" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useAircraftQuery(
  options: Omit<Urql.UseQueryArgs<AircraftQueryVariables>, "query">,
) {
  return Urql.useQuery<AircraftQuery, AircraftQueryVariables>({
    query: AircraftDocument,
    ...options,
  });
}
export const AircraftsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Aircrafts" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pager" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "PagerInput" },
          },
        },
      ],
      directives: [
        { kind: "Directive", name: { kind: "Name", value: "live" } },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "aircrafts" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pager" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pager" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "total" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "brand" } },
                      { kind: "Field", name: { kind: "Name", value: "model" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "registration" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "capabilities" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useAircraftsQuery(
  options?: Omit<Urql.UseQueryArgs<AircraftsQueryVariables>, "query">,
) {
  return Urql.useQuery<AircraftsQuery, AircraftsQueryVariables>({
    query: AircraftsDocument,
    ...options,
  });
}
export const AircraftsRegsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AircraftsRegs" },
      directives: [
        { kind: "Directive", name: { kind: "Name", value: "live" } },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "aircrafts" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "registration" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "model" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useAircraftsRegsQuery(
  options?: Omit<Urql.UseQueryArgs<AircraftsRegsQueryVariables>, "query">,
) {
  return Urql.useQuery<AircraftsRegsQuery, AircraftsRegsQueryVariables>({
    query: AircraftsRegsDocument,
    ...options,
  });
}
export const AddAircraftDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddAircraft" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "aircraft" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AddAircraftInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addAircraft" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "aircraft" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "aircraft" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useAddAircraftMutation() {
  return Urql.useMutation<AddAircraftMutation, AddAircraftMutationVariables>(
    AddAircraftDocument,
  );
}
export const UpdateAircraftDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateAircraft" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "aircraft" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateAircraftInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateAircraft" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "aircraft" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "aircraft" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useUpdateAircraftMutation() {
  return Urql.useMutation<
    UpdateAircraftMutation,
    UpdateAircraftMutationVariables
  >(UpdateAircraftDocument);
}
export const OcaiCodesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "OcaiCodes" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "ocaiCodes" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useOcaiCodesQuery(
  options?: Omit<Urql.UseQueryArgs<OcaiCodesQueryVariables>, "query">,
) {
  return Urql.useQuery<OcaiCodesQuery, OcaiCodesQueryVariables>({
    query: OcaiCodesDocument,
    ...options,
  });
}
export const LastFlightDateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "LastFlightDate" },
      directives: [
        { kind: "Directive", name: { kind: "Name", value: "live" } },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "lastFlightDate" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useLastFlightDateQuery(
  options?: Omit<Urql.UseQueryArgs<LastFlightDateQueryVariables>, "query">,
) {
  return Urql.useQuery<LastFlightDateQuery, LastFlightDateQueryVariables>({
    query: LastFlightDateDocument,
    ...options,
  });
}
export const FlightDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Flight" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      directives: [
        { kind: "Directive", name: { kind: "Name", value: "live" } },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "flight" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "FullFLight" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FullFLight" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Flight" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "departure" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "place" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "arrival" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "place" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "totalFlightTime" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "pilot" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "pic" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "aircraft" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "registration" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "aircraftClass" } },
          { kind: "Field", name: { kind: "Name", value: "ifrApproaches" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "landings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "day" } },
                { kind: "Field", name: { kind: "Name", value: "night" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "operationalTime" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ifr" } },
                { kind: "Field", name: { kind: "Name", value: "night" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "pilotFunctionTime" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "pic" } },
                { kind: "Field", name: { kind: "Name", value: "instructor" } },
                { kind: "Field", name: { kind: "Name", value: "coPilot" } },
                { kind: "Field", name: { kind: "Name", value: "dualCommand" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "remarks" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useFlightQuery(
  options: Omit<Urql.UseQueryArgs<FlightQueryVariables>, "query">,
) {
  return Urql.useQuery<FlightQuery, FlightQueryVariables>({
    query: FlightDocument,
    ...options,
  });
}
export const OwnFlightsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "OwnFlights" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pager" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "PagerInput" },
          },
        },
      ],
      directives: [
        { kind: "Directive", name: { kind: "Name", value: "live" } },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "ownFlights" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pager" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pager" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "FullFLight" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "total" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "ownFlightsTotals" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pager" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pager" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "singleEngine" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "preceding" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "actual" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "page" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "multiEngine" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "preceding" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "actual" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "page" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "totalFlightTime" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "preceding" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "actual" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "page" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "landings" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "day" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "preceding" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "actual" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "page" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "night" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "preceding" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "actual" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "page" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pic" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "preceding" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "actual" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "page" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "copilot" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "preceding" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "actual" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "page" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dualCommand" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "preceding" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "actual" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "page" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "instructor" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "preceding" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "actual" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "page" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FullFLight" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Flight" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "departure" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "place" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "arrival" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "place" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "totalFlightTime" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "pilot" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "pic" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "aircraft" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "registration" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "aircraftClass" } },
          { kind: "Field", name: { kind: "Name", value: "ifrApproaches" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "landings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "day" } },
                { kind: "Field", name: { kind: "Name", value: "night" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "operationalTime" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ifr" } },
                { kind: "Field", name: { kind: "Name", value: "night" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "pilotFunctionTime" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "pic" } },
                { kind: "Field", name: { kind: "Name", value: "instructor" } },
                { kind: "Field", name: { kind: "Name", value: "coPilot" } },
                { kind: "Field", name: { kind: "Name", value: "dualCommand" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "remarks" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useOwnFlightsQuery(
  options?: Omit<Urql.UseQueryArgs<OwnFlightsQueryVariables>, "query">,
) {
  return Urql.useQuery<OwnFlightsQuery, OwnFlightsQueryVariables>({
    query: OwnFlightsDocument,
    ...options,
  });
}
export const AddFlightDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddFlight" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "flight" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AddFlightInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addFlight" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "flight" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useAddFlightMutation() {
  return Urql.useMutation<AddFlightMutation, AddFlightMutationVariables>(
    AddFlightDocument,
  );
}
export const UpdateFlightDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateFlight" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "flight" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateFlightInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateFlight" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "flight" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useUpdateFlightMutation() {
  return Urql.useMutation<UpdateFlightMutation, UpdateFlightMutationVariables>(
    UpdateFlightDocument,
  );
}
export const FlightStatsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FlightStats" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "flightStats" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "AllStats" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AllStats" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "BaseFlightStats" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "totalFlightTime" } },
          { kind: "Field", name: { kind: "Name", value: "totalDC" } },
          { kind: "Field", name: { kind: "Name", value: "totalPIC" } },
          { kind: "Field", name: { kind: "Name", value: "totalCOPI" } },
          { kind: "Field", name: { kind: "Name", value: "totalInstructor" } },
          { kind: "Field", name: { kind: "Name", value: "flightAmount" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useFlightStatsQuery(
  options?: Omit<Urql.UseQueryArgs<FlightStatsQueryVariables>, "query">,
) {
  return Urql.useQuery<FlightStatsQuery, FlightStatsQueryVariables>({
    query: FlightStatsDocument,
    ...options,
  });
}
export const FromDateFlightStatsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FromDateFlightStats" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "date" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Date" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fromDateFlightStats" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "date" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "date" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "AllStats" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AllStats" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "BaseFlightStats" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "totalFlightTime" } },
          { kind: "Field", name: { kind: "Name", value: "totalDC" } },
          { kind: "Field", name: { kind: "Name", value: "totalPIC" } },
          { kind: "Field", name: { kind: "Name", value: "totalCOPI" } },
          { kind: "Field", name: { kind: "Name", value: "totalInstructor" } },
          { kind: "Field", name: { kind: "Name", value: "flightAmount" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useFromDateFlightStatsQuery(
  options: Omit<Urql.UseQueryArgs<FromDateFlightStatsQueryVariables>, "query">,
) {
  return Urql.useQuery<
    FromDateFlightStatsQuery,
    FromDateFlightStatsQueryVariables
  >({ query: FromDateFlightStatsDocument, ...options });
}
export const ByAircraftStatsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "byAircraftStats" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "flightStats" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "byAircraft" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "aircraft" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "brand" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "model" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "registration" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "AllStats" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "byAircraftModel" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "aircraftModel" },
                      },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "AllStats" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AllStats" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "BaseFlightStats" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "totalFlightTime" } },
          { kind: "Field", name: { kind: "Name", value: "totalDC" } },
          { kind: "Field", name: { kind: "Name", value: "totalPIC" } },
          { kind: "Field", name: { kind: "Name", value: "totalCOPI" } },
          { kind: "Field", name: { kind: "Name", value: "totalInstructor" } },
          { kind: "Field", name: { kind: "Name", value: "flightAmount" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useByAircraftStatsQuery(
  options?: Omit<Urql.UseQueryArgs<ByAircraftStatsQueryVariables>, "query">,
) {
  return Urql.useQuery<ByAircraftStatsQuery, ByAircraftStatsQueryVariables>({
    query: ByAircraftStatsDocument,
    ...options,
  });
}
export const ByInstructorStatsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "byInstructorStats" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "flightStats" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "byInstructor" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "instructor" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastName" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "totalDC" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "byAircraftModel" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "aircraftModel" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "totalDC" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "byAircraft" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "aircraft" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "brand",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "model",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "registration",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "totalDC" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useByInstructorStatsQuery(
  options?: Omit<Urql.UseQueryArgs<ByInstructorStatsQueryVariables>, "query">,
) {
  return Urql.useQuery<ByInstructorStatsQuery, ByInstructorStatsQueryVariables>(
    { query: ByInstructorStatsDocument, ...options },
  );
}
export const CurrentPilotDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CurrentPilot" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "currentPilot" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "email" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "verified" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useCurrentPilotQuery(
  options?: Omit<Urql.UseQueryArgs<CurrentPilotQueryVariables>, "query">,
) {
  return Urql.useQuery<CurrentPilotQuery, CurrentPilotQueryVariables>({
    query: CurrentPilotDocument,
    ...options,
  });
}
export const PilotDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Pilot" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      directives: [
        { kind: "Directive", name: { kind: "Name", value: "live" } },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pilot" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "email" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "verified" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function usePilotQuery(
  options: Omit<Urql.UseQueryArgs<PilotQueryVariables>, "query">,
) {
  return Urql.useQuery<PilotQuery, PilotQueryVariables>({
    query: PilotDocument,
    ...options,
  });
}
export const PilotsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Pilots" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pager" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "PagerInput" },
          },
        },
      ],
      directives: [
        { kind: "Directive", name: { kind: "Name", value: "live" } },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pilots" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pager" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pager" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "email" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "address" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "verified" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "total" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function usePilotsQuery(
  options?: Omit<Urql.UseQueryArgs<PilotsQueryVariables>, "query">,
) {
  return Urql.useQuery<PilotsQuery, PilotsQueryVariables>({
    query: PilotsDocument,
    ...options,
  });
}
export const PilotsListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PilotsList" },
      directives: [
        { kind: "Directive", name: { kind: "Name", value: "live" } },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pilots" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function usePilotsListQuery(
  options?: Omit<Urql.UseQueryArgs<PilotsListQueryVariables>, "query">,
) {
  return Urql.useQuery<PilotsListQuery, PilotsListQueryVariables>({
    query: PilotsListDocument,
    ...options,
  });
}
export const AddPilotDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddPilot" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pilot" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AddPilotInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addPilot" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pilot" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pilot" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useAddPilotMutation() {
  return Urql.useMutation<AddPilotMutation, AddPilotMutationVariables>(
    AddPilotDocument,
  );
}
export const UpdatePilotDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updatePilot" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pilot" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdatePilotInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePilot" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "pilot" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pilot" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useUpdatePilotMutation() {
  return Urql.useMutation<UpdatePilotMutation, UpdatePilotMutationVariables>(
    UpdatePilotDocument,
  );
}
export const SignInDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignIn" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pwdHash" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signIn" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "login" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "pwdHash" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pwdHash" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
  );
}
export const SignUpDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignUp" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "firstName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "lastName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pwdHash" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pwdHash2" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signUp" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "firstName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "firstName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "lastName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "lastName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "pwdHash" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pwdHash" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "pwdHash2" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pwdHash2" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useSignUpMutation() {
  return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
  );
}
export const SignOutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "signOut" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "signOut" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useSignOutMutation() {
  return Urql.useMutation<SignOutMutation, SignOutMutationVariables>(
    SignOutDocument,
  );
}
export type WithTypename<T extends { __typename?: any }> = Partial<T> & {
  __typename: NonNullable<T["__typename"]>;
};

export type GraphCacheKeysConfig = {
  Aircraft?: (data: WithTypename<Aircraft>) => null | string;
  AircraftsPage?: (data: WithTypename<AircraftsPage>) => null | string;
  ByAircraftModelStats?: (
    data: WithTypename<ByAircraftModelStats>,
  ) => null | string;
  ByAircraftStats?: (data: WithTypename<ByAircraftStats>) => null | string;
  ByInstructorStats?: (data: WithTypename<ByInstructorStats>) => null | string;
  Credential?: (data: WithTypename<Credential>) => null | string;
  Email?: (data: WithTypename<Email>) => null | string;
  Flight?: (data: WithTypename<Flight>) => null | string;
  FlightPageTotals?: (data: WithTypename<FlightPageTotals>) => null | string;
  FlightStats?: (data: WithTypename<FlightStats>) => null | string;
  FlightTotals?: (data: WithTypename<FlightTotals>) => null | string;
  FlightsPage?: (data: WithTypename<FlightsPage>) => null | string;
  Juncture?: (data: WithTypename<Juncture>) => null | string;
  LandingTotals?: (data: WithTypename<LandingTotals>) => null | string;
  Landings?: (data: WithTypename<Landings>) => null | string;
  OperationalTime?: (data: WithTypename<OperationalTime>) => null | string;
  Password?: (data: WithTypename<Password>) => null | string;
  Pilot?: (data: WithTypename<Pilot>) => null | string;
  PilotFunctionTime?: (data: WithTypename<PilotFunctionTime>) => null | string;
  PilotsPage?: (data: WithTypename<PilotsPage>) => null | string;
  PlaceTupleStat?: (data: WithTypename<PlaceTupleStat>) => null | string;
  SinglePilotFlightTime?: (
    data: WithTypename<SinglePilotFlightTime>,
  ) => null | string;
};

export type GraphCacheResolvers = {
  Query?: {
    aircraft?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAircraftArgs,
      WithTypename<Aircraft> | string
    >;
    aircrafts?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAircraftsArgs,
      WithTypename<AircraftsPage> | string
    >;
    currentPilot?: GraphCacheResolver<
      WithTypename<Query>,
      Record<string, never>,
      WithTypename<Pilot> | string
    >;
    flight?: GraphCacheResolver<
      WithTypename<Query>,
      QueryFlightArgs,
      WithTypename<Flight> | string
    >;
    flightPlaceStats?: GraphCacheResolver<
      WithTypename<Query>,
      Record<string, never>,
      Array<WithTypename<PlaceTupleStat> | string>
    >;
    flightStats?: GraphCacheResolver<
      WithTypename<Query>,
      Record<string, never>,
      WithTypename<FlightStats> | string
    >;
    fromDateFlightStats?: GraphCacheResolver<
      WithTypename<Query>,
      QueryFromDateFlightStatsArgs,
      WithTypename<FlightStats> | string
    >;
    lastFlightDate?: GraphCacheResolver<
      WithTypename<Query>,
      Record<string, never>,
      Scalars["Date"] | string
    >;
    ocaiCodes?: GraphCacheResolver<
      WithTypename<Query>,
      Record<string, never>,
      Array<Scalars["String"] | string>
    >;
    ownFlights?: GraphCacheResolver<
      WithTypename<Query>,
      QueryOwnFlightsArgs,
      WithTypename<FlightsPage> | string
    >;
    ownFlightsTotals?: GraphCacheResolver<
      WithTypename<Query>,
      QueryOwnFlightsTotalsArgs,
      WithTypename<FlightPageTotals> | string
    >;
    pilot?: GraphCacheResolver<
      WithTypename<Query>,
      QueryPilotArgs,
      WithTypename<Pilot> | string
    >;
    pilots?: GraphCacheResolver<
      WithTypename<Query>,
      QueryPilotsArgs,
      WithTypename<PilotsPage> | string
    >;
  };
  Aircraft?: {
    brand?: GraphCacheResolver<
      WithTypename<Aircraft>,
      Record<string, never>,
      Scalars["String"] | string
    >;
    capabilities?: GraphCacheResolver<
      WithTypename<Aircraft>,
      Record<string, never>,
      Array<AircraftCapabilities | string>
    >;
    id?: GraphCacheResolver<
      WithTypename<Aircraft>,
      Record<string, never>,
      Scalars["ID"] | string
    >;
    model?: GraphCacheResolver<
      WithTypename<Aircraft>,
      Record<string, never>,
      Scalars["String"] | string
    >;
    registration?: GraphCacheResolver<
      WithTypename<Aircraft>,
      Record<string, never>,
      Scalars["String"] | string
    >;
  };
  AircraftsPage?: {
    items?: GraphCacheResolver<
      WithTypename<AircraftsPage>,
      Record<string, never>,
      Array<WithTypename<Aircraft> | string>
    >;
    total?: GraphCacheResolver<
      WithTypename<AircraftsPage>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
  };
  ByAircraftModelStats?: {
    aircraftModel?: GraphCacheResolver<
      WithTypename<ByAircraftModelStats>,
      Record<string, never>,
      Scalars["String"] | string
    >;
    byAircraft?: GraphCacheResolver<
      WithTypename<ByAircraftModelStats>,
      Record<string, never>,
      Array<WithTypename<ByAircraftStats> | string>
    >;
    byInstructor?: GraphCacheResolver<
      WithTypename<ByAircraftModelStats>,
      Record<string, never>,
      Array<WithTypename<ByInstructorStats> | string>
    >;
    flightAmount?: GraphCacheResolver<
      WithTypename<ByAircraftModelStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    id?: GraphCacheResolver<
      WithTypename<ByAircraftModelStats>,
      Record<string, never>,
      Scalars["ID"] | string
    >;
    totalCOPI?: GraphCacheResolver<
      WithTypename<ByAircraftModelStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalDC?: GraphCacheResolver<
      WithTypename<ByAircraftModelStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalFlightTime?: GraphCacheResolver<
      WithTypename<ByAircraftModelStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalInstructor?: GraphCacheResolver<
      WithTypename<ByAircraftModelStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalPIC?: GraphCacheResolver<
      WithTypename<ByAircraftModelStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
  };
  ByAircraftStats?: {
    aircraft?: GraphCacheResolver<
      WithTypename<ByAircraftStats>,
      Record<string, never>,
      WithTypename<Aircraft> | string
    >;
    byAircraftModel?: GraphCacheResolver<
      WithTypename<ByAircraftStats>,
      Record<string, never>,
      Array<WithTypename<ByAircraftModelStats> | string>
    >;
    byInstructor?: GraphCacheResolver<
      WithTypename<ByAircraftStats>,
      Record<string, never>,
      Array<WithTypename<ByInstructorStats> | string>
    >;
    flightAmount?: GraphCacheResolver<
      WithTypename<ByAircraftStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    id?: GraphCacheResolver<
      WithTypename<ByAircraftStats>,
      Record<string, never>,
      Scalars["ID"] | string
    >;
    totalCOPI?: GraphCacheResolver<
      WithTypename<ByAircraftStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalDC?: GraphCacheResolver<
      WithTypename<ByAircraftStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalFlightTime?: GraphCacheResolver<
      WithTypename<ByAircraftStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalInstructor?: GraphCacheResolver<
      WithTypename<ByAircraftStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalPIC?: GraphCacheResolver<
      WithTypename<ByAircraftStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
  };
  ByInstructorStats?: {
    byAircraft?: GraphCacheResolver<
      WithTypename<ByInstructorStats>,
      Record<string, never>,
      Array<WithTypename<ByAircraftStats> | string>
    >;
    byAircraftModel?: GraphCacheResolver<
      WithTypename<ByInstructorStats>,
      Record<string, never>,
      Array<WithTypename<ByAircraftModelStats> | string>
    >;
    flightAmount?: GraphCacheResolver<
      WithTypename<ByInstructorStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    id?: GraphCacheResolver<
      WithTypename<ByInstructorStats>,
      Record<string, never>,
      Scalars["ID"] | string
    >;
    instructor?: GraphCacheResolver<
      WithTypename<ByInstructorStats>,
      Record<string, never>,
      WithTypename<Pilot> | string
    >;
    totalCOPI?: GraphCacheResolver<
      WithTypename<ByInstructorStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalDC?: GraphCacheResolver<
      WithTypename<ByInstructorStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalFlightTime?: GraphCacheResolver<
      WithTypename<ByInstructorStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalInstructor?: GraphCacheResolver<
      WithTypename<ByInstructorStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalPIC?: GraphCacheResolver<
      WithTypename<ByInstructorStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
  };
  Credential?: {
    id?: GraphCacheResolver<
      WithTypename<Credential>,
      Record<string, never>,
      Scalars["ID"] | string
    >;
    ipv4?: GraphCacheResolver<
      WithTypename<Credential>,
      Record<string, never>,
      Scalars["String"] | string
    >;
    isThisConnection?: GraphCacheResolver<
      WithTypename<Credential>,
      Record<string, never>,
      Scalars["Boolean"] | string
    >;
    lastUsed?: GraphCacheResolver<
      WithTypename<Credential>,
      Record<string, never>,
      Scalars["String"] | string
    >;
    userAgent?: GraphCacheResolver<
      WithTypename<Credential>,
      Record<string, never>,
      Scalars["String"] | string
    >;
  };
  Email?: {
    address?: GraphCacheResolver<
      WithTypename<Email>,
      Record<string, never>,
      Scalars["String"] | string
    >;
    verified?: GraphCacheResolver<
      WithTypename<Email>,
      Record<string, never>,
      Scalars["Boolean"] | string
    >;
  };
  Flight?: {
    aircraft?: GraphCacheResolver<
      WithTypename<Flight>,
      Record<string, never>,
      WithTypename<Aircraft> | string
    >;
    aircraftClass?: GraphCacheResolver<
      WithTypename<Flight>,
      Record<string, never>,
      AircraftClass | string
    >;
    arrival?: GraphCacheResolver<
      WithTypename<Flight>,
      Record<string, never>,
      WithTypename<Juncture> | string
    >;
    departure?: GraphCacheResolver<
      WithTypename<Flight>,
      Record<string, never>,
      WithTypename<Juncture> | string
    >;
    id?: GraphCacheResolver<
      WithTypename<Flight>,
      Record<string, never>,
      Scalars["ID"] | string
    >;
    ifrApproaches?: GraphCacheResolver<
      WithTypename<Flight>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    landings?: GraphCacheResolver<
      WithTypename<Flight>,
      Record<string, never>,
      WithTypename<Landings> | string
    >;
    operationalTime?: GraphCacheResolver<
      WithTypename<Flight>,
      Record<string, never>,
      WithTypename<OperationalTime> | string
    >;
    pic?: GraphCacheResolver<
      WithTypename<Flight>,
      Record<string, never>,
      WithTypename<Pilot> | string
    >;
    pilot?: GraphCacheResolver<
      WithTypename<Flight>,
      Record<string, never>,
      WithTypename<Pilot> | string
    >;
    pilotFunctionTime?: GraphCacheResolver<
      WithTypename<Flight>,
      Record<string, never>,
      WithTypename<PilotFunctionTime> | string
    >;
    remarks?: GraphCacheResolver<
      WithTypename<Flight>,
      Record<string, never>,
      Scalars["String"] | string
    >;
    simulatorType?: GraphCacheResolver<
      WithTypename<Flight>,
      Record<string, never>,
      Scalars["String"] | string
    >;
    totalFlightTime?: GraphCacheResolver<
      WithTypename<Flight>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
  };
  FlightPageTotals?: {
    copilot?: GraphCacheResolver<
      WithTypename<FlightPageTotals>,
      Record<string, never>,
      WithTypename<FlightTotals> | string
    >;
    dualCommand?: GraphCacheResolver<
      WithTypename<FlightPageTotals>,
      Record<string, never>,
      WithTypename<FlightTotals> | string
    >;
    id?: GraphCacheResolver<
      WithTypename<FlightPageTotals>,
      Record<string, never>,
      Scalars["ID"] | string
    >;
    instructor?: GraphCacheResolver<
      WithTypename<FlightPageTotals>,
      Record<string, never>,
      WithTypename<FlightTotals> | string
    >;
    landings?: GraphCacheResolver<
      WithTypename<FlightPageTotals>,
      Record<string, never>,
      WithTypename<LandingTotals> | string
    >;
    multiEngine?: GraphCacheResolver<
      WithTypename<FlightPageTotals>,
      Record<string, never>,
      WithTypename<FlightTotals> | string
    >;
    pic?: GraphCacheResolver<
      WithTypename<FlightPageTotals>,
      Record<string, never>,
      WithTypename<FlightTotals> | string
    >;
    singleEngine?: GraphCacheResolver<
      WithTypename<FlightPageTotals>,
      Record<string, never>,
      WithTypename<FlightTotals> | string
    >;
    totalFlightTime?: GraphCacheResolver<
      WithTypename<FlightPageTotals>,
      Record<string, never>,
      WithTypename<FlightTotals> | string
    >;
  };
  FlightStats?: {
    byAircraft?: GraphCacheResolver<
      WithTypename<FlightStats>,
      Record<string, never>,
      Array<WithTypename<ByAircraftStats> | string>
    >;
    byAircraftModel?: GraphCacheResolver<
      WithTypename<FlightStats>,
      Record<string, never>,
      Array<WithTypename<ByAircraftModelStats> | string>
    >;
    byInstructor?: GraphCacheResolver<
      WithTypename<FlightStats>,
      Record<string, never>,
      Array<WithTypename<ByInstructorStats> | string>
    >;
    flightAmount?: GraphCacheResolver<
      WithTypename<FlightStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    id?: GraphCacheResolver<
      WithTypename<FlightStats>,
      Record<string, never>,
      Scalars["ID"] | string
    >;
    totalCOPI?: GraphCacheResolver<
      WithTypename<FlightStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalDC?: GraphCacheResolver<
      WithTypename<FlightStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalFlightTime?: GraphCacheResolver<
      WithTypename<FlightStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalInstructor?: GraphCacheResolver<
      WithTypename<FlightStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    totalPIC?: GraphCacheResolver<
      WithTypename<FlightStats>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
  };
  FlightTotals?: {
    actual?: GraphCacheResolver<
      WithTypename<FlightTotals>,
      Record<string, never>,
      Scalars["Float"] | string
    >;
    page?: GraphCacheResolver<
      WithTypename<FlightTotals>,
      Record<string, never>,
      Scalars["Float"] | string
    >;
    preceding?: GraphCacheResolver<
      WithTypename<FlightTotals>,
      Record<string, never>,
      Scalars["Float"] | string
    >;
  };
  FlightsPage?: {
    items?: GraphCacheResolver<
      WithTypename<FlightsPage>,
      Record<string, never>,
      Array<WithTypename<Flight> | string>
    >;
    total?: GraphCacheResolver<
      WithTypename<FlightsPage>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
  };
  Juncture?: {
    date?: GraphCacheResolver<
      WithTypename<Juncture>,
      Record<string, never>,
      Scalars["Date"] | string
    >;
    place?: GraphCacheResolver<
      WithTypename<Juncture>,
      Record<string, never>,
      Scalars["String"] | string
    >;
  };
  LandingTotals?: {
    day?: GraphCacheResolver<
      WithTypename<LandingTotals>,
      Record<string, never>,
      WithTypename<FlightTotals> | string
    >;
    night?: GraphCacheResolver<
      WithTypename<LandingTotals>,
      Record<string, never>,
      WithTypename<FlightTotals> | string
    >;
  };
  Landings?: {
    day?: GraphCacheResolver<
      WithTypename<Landings>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    night?: GraphCacheResolver<
      WithTypename<Landings>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
  };
  OperationalTime?: {
    ifr?: GraphCacheResolver<
      WithTypename<OperationalTime>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    night?: GraphCacheResolver<
      WithTypename<OperationalTime>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
  };
  Password?: {
    createdAt?: GraphCacheResolver<
      WithTypename<Password>,
      Record<string, never>,
      Scalars["String"] | string
    >;
  };
  Pilot?: {
    credentials?: GraphCacheResolver<
      WithTypename<Pilot>,
      Record<string, never>,
      Array<WithTypename<Credential> | string>
    >;
    email?: GraphCacheResolver<
      WithTypename<Pilot>,
      Record<string, never>,
      WithTypename<Email> | string
    >;
    firstName?: GraphCacheResolver<
      WithTypename<Pilot>,
      Record<string, never>,
      Scalars["String"] | string
    >;
    id?: GraphCacheResolver<
      WithTypename<Pilot>,
      Record<string, never>,
      Scalars["ID"] | string
    >;
    lastName?: GraphCacheResolver<
      WithTypename<Pilot>,
      Record<string, never>,
      Scalars["String"] | string
    >;
    passwords?: GraphCacheResolver<
      WithTypename<Pilot>,
      Record<string, never>,
      Array<WithTypename<Password> | string>
    >;
    username?: GraphCacheResolver<
      WithTypename<Pilot>,
      Record<string, never>,
      Scalars["String"] | string
    >;
  };
  PilotFunctionTime?: {
    coPilot?: GraphCacheResolver<
      WithTypename<PilotFunctionTime>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    dualCommand?: GraphCacheResolver<
      WithTypename<PilotFunctionTime>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    instructor?: GraphCacheResolver<
      WithTypename<PilotFunctionTime>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    pic?: GraphCacheResolver<
      WithTypename<PilotFunctionTime>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
  };
  PilotsPage?: {
    items?: GraphCacheResolver<
      WithTypename<PilotsPage>,
      Record<string, never>,
      Array<WithTypename<Pilot> | string>
    >;
    total?: GraphCacheResolver<
      WithTypename<PilotsPage>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
  };
  PlaceTupleStat?: {
    arrival?: GraphCacheResolver<
      WithTypename<PlaceTupleStat>,
      Record<string, never>,
      Scalars["String"] | string
    >;
    departure?: GraphCacheResolver<
      WithTypename<PlaceTupleStat>,
      Record<string, never>,
      Scalars["String"] | string
    >;
    times?: GraphCacheResolver<
      WithTypename<PlaceTupleStat>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
  };
  SinglePilotFlightTime?: {
    multiEngine?: GraphCacheResolver<
      WithTypename<SinglePilotFlightTime>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
    singleEngine?: GraphCacheResolver<
      WithTypename<SinglePilotFlightTime>,
      Record<string, never>,
      Scalars["Int"] | string
    >;
  };
};

export type GraphCacheOptimisticUpdaters = {
  addAircraft?: GraphCacheOptimisticMutationResolver<
    MutationAddAircraftArgs,
    WithTypename<Aircraft>
  >;
  addFlight?: GraphCacheOptimisticMutationResolver<
    MutationAddFlightArgs,
    WithTypename<Flight>
  >;
  addPilot?: GraphCacheOptimisticMutationResolver<
    MutationAddPilotArgs,
    WithTypename<Pilot>
  >;
  signIn?: GraphCacheOptimisticMutationResolver<
    MutationSignInArgs,
    Scalars["String"]
  >;
  signOut?: GraphCacheOptimisticMutationResolver<
    Record<string, never>,
    Scalars["Boolean"]
  >;
  signUp?: GraphCacheOptimisticMutationResolver<
    MutationSignUpArgs,
    Scalars["String"]
  >;
  updateAircraft?: GraphCacheOptimisticMutationResolver<
    MutationUpdateAircraftArgs,
    WithTypename<Aircraft>
  >;
  updateFlight?: GraphCacheOptimisticMutationResolver<
    MutationUpdateFlightArgs,
    WithTypename<Flight>
  >;
  updatePilot?: GraphCacheOptimisticMutationResolver<
    MutationUpdatePilotArgs,
    WithTypename<Pilot>
  >;
};

export type GraphCacheUpdaters = {
  Mutation?: {
    addAircraft?: GraphCacheUpdateResolver<
      { addAircraft: WithTypename<Aircraft> },
      MutationAddAircraftArgs
    >;
    addFlight?: GraphCacheUpdateResolver<
      { addFlight: WithTypename<Flight> },
      MutationAddFlightArgs
    >;
    addPilot?: GraphCacheUpdateResolver<
      { addPilot: WithTypename<Pilot> },
      MutationAddPilotArgs
    >;
    signIn?: GraphCacheUpdateResolver<
      { signIn: Scalars["String"] },
      MutationSignInArgs
    >;
    signOut?: GraphCacheUpdateResolver<
      { signOut: Scalars["Boolean"] },
      Record<string, never>
    >;
    signUp?: GraphCacheUpdateResolver<
      { signUp: Scalars["String"] },
      MutationSignUpArgs
    >;
    updateAircraft?: GraphCacheUpdateResolver<
      { updateAircraft: WithTypename<Aircraft> },
      MutationUpdateAircraftArgs
    >;
    updateFlight?: GraphCacheUpdateResolver<
      { updateFlight: WithTypename<Flight> },
      MutationUpdateFlightArgs
    >;
    updatePilot?: GraphCacheUpdateResolver<
      { updatePilot: WithTypename<Pilot> },
      MutationUpdatePilotArgs
    >;
  };
  Subscription?: {};
};

export type GraphCacheConfig = Parameters<typeof offlineExchange>[0] & {
  updates?: GraphCacheUpdaters;
  keys?: GraphCacheKeysConfig;
  optimistic?: GraphCacheOptimisticUpdaters;
  resolvers?: GraphCacheResolvers;
};
