import API from "@aws-amplify/api";
import { useEffect, useState, createContext, useContext } from "react";

export const getResult = /* GraphQL */ `
  query GetResult($id: ID!) {
    getResult(id: $id) {
      id
      pairings
      results
      players
      eventID
      name
      complete
      live
      winner
      dgtCloudUrl
    }
  }
`;

export const ResultContext = createContext({
  name: "",
  eventId: "",
  eventName: "",
  date: "",
  settings: {
    type: "",
    currentRound: null,
    totalRounds: null,
    roundLive: false,
    showAll: false,
    showOpponentPairing: false,
    showPairingColors: false,
    showPreviousRound: false,
    nextRoundTime: {},
    prizeGiving: "",
  },
  players: [],
  pairings: [],
  results: [],
});

export const ResultProvider = ({ children }) => {
  const [loadingResult, setResultLoading] = useState(false);
  const [result, setResult] = useState({
    name: "",
    eventId: "",
    eventName: "",
    date: "",
    settings: {
      type: "",
      currentRound: null,
      totalRounds: null,
      roundLive: false,
      showAll: false,
      showOpponentPairing: false,
      showPairingColors: false,
      showPreviousRound: false,
      nextRoundTime: {},
      prizeGiving: "",
    },
    players: [],
    pairings: [],
    results: [],
  });

  useEffect(() => {
    const fetchResult = async () => {
      setResultLoading(true);
      try {
        const {
            data: { getResult: result }
        } = await API.graphql({
          query: getResult,
          variables: {
            active: "yes",
          },
          authMode: "AWS_IAM",
        });
        if (result) {
          setResult(result);
        }
      } catch (error) {
        console.log("Error", error);
      }
      setResultLoading(false);
    };
    try {
      fetchResult();
    } catch (error) {
      setResultLoading(false);
      console.log("Error loading result data", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ResultContext.Provider value={{ result, loadingResult }}>
      {children}
    </ResultContext.Provider>
  );
};

export function useResultContext() {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error(
      "useResultContext must be used within a ResultProvider"
    );
  }
  return context;
}
