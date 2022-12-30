import { type NextApiRequest, type NextApiResponse } from "next";
import { get_presets } from "server/common/json-helper";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(get_presets());
};

export default get;
