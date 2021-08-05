import { API } from "aws-amplify";

export const getECFData = async (id) => {
  const response = await API.get("chessplayers",`/ecf/${id}`);
  return response;
};


export const getPlayerGames = async (id) => {
  const response = await API.get("chessplayers",`/games/${id}/Standard`);
  return response;
};



