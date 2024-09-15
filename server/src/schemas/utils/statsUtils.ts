import { AggregationCursor } from "mongodb";
import { PilotDb } from "../../gqlTypes";

const emptyFlightStats = {
  id: "empty",
  totalDC: 0,
  totalPIC: 0,
  totalCOPI: 0,
  totalInstructor: 0,
  totalFlightTime: 0,
  flightAmount: 0,
  flightsIds: []
};

export const mkOwnFlightMatchStage = (
  requester: PilotDb,
  additionalQuery?: {}
) => ({
  $match: {
    $or: [{ pilot: requester._id }, { pic: requester._id }],
    ...additionalQuery
  }
});

export const flightStatGroupStageFields = {
  totalDC: { $sum: "$pilotFunctionTime.dualCommand" },
  totalPIC: { $sum: "$pilotFunctionTime.pic" },
  totalCOPI: { $sum: "$pilotFunctionTime.coPilot" },
  totalInstructor: { $sum: "$pilotFunctionTime.instructor" },
  totalFlightTime: { $sum: "$totalFlightTime" },
  flightAmount: { $count: {} },
  flightsIds: { $push: "$_id" }
};

export const mkFltStatsGroupStage = (groupExpr?: any) => ({
  $group: {
    _id: groupExpr || null,
    ...flightStatGroupStageFields
  }
});

export const formatFlightStats = async <T>(
  cursor: AggregationCursor<T>,
  statsId: string
) => {
  const stats = await cursor.toArray();

  return {
    id: statsId,
    ...(stats[0] ?? emptyFlightStats)
  };
};
