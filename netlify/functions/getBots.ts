import { ChessBot } from "../../src/types";

const getBots = async (): Promise<Response> => {

  const chessBots: ChessBot[] = [
    { id: "1425583c-b8de-4551-aa44-1f259f83f3d1", name: "Mild Mildred", elo: 700 },
    { id: "224e86a1-6898-4389-9de2-edf5fe0a1715", name: "Savvy Sammy", elo: 1000 },
    { id: "3afc6505-f882-453e-b81e-0f52d2b37c03", name: "Keen Jean", elo: 1600 },
    { id: "4a2e5e0c-f5e8-4f9d-9d13-885ea7826370", name: "Elite Pete", elo: 2100 },
    { id: "550365e9-8e4b-42ff-ab9a-2659bd909548", name: "Grandmaster Jasper", elo: 2450 },
  ];

  const body = JSON.stringify(chessBots);

  return new Response(body, { status: 200 });
}

export default getBots;
