import gql from "graphql-tag";

export const typeDefs = gql`
  type Juncture @entity {
    place: String! @column
    time: Date! @column
  }

  type SinglePilotFlightTime @entity {
    singleEngine: Int! @column
    multiEngine: Int! @column
  }

  type FlightTime @entity {
    singlePilot: SinglePilotFlightTime! @embedded
    multiPilot: Int! @column
  }

  type Landings @entity {
    day: Int! @column
    night: Int! @column
  }

  type OperationalTime {
    night: Int! @column
    ifr: Int! @column
  }

  type PilotFunctionTime {
    pic: Int! @column
    coPilot: Int! @column
    dualCommand: Int! @column
    instructor: Int! @column
  }

  type SimulationTraining @entity {
    date: Date! @column
    type: String! @column
    duration: Int! @column
  }

  type Flight @entity {
    id: ID! @id #1
    pilot: Pilot! @link #-
    date: Date! @column #2
    departure: Juncture! @embedded #3
    arrival: Juncture! @embedded #4
    flightTime: FlightTime! @embedded #5
    totalFlightTime: Int! @column #6
    pic: Pilot! @link #7
    landings: Landings! @embedded #8
    ifrApproaches: Int! @column #9
    operationalTime: OperationalTime! @embedded #10
    pilotFunctionTime: PilotFunctionTime! @embedded #11
    simulationTraining: SimulationTraining! @embedded #12
    remarks: String! @column #13
  }
`;
