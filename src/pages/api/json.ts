import { type NextApiRequest, type NextApiResponse } from "next";
import { get_settings, set_settings } from "server/common/json-helper";
import { SettingsSchema } from "types/json_types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  switch (method) {
    case "GET":
      // Get data from your database
      return res.status(200).json(get_settings());
    case "POST":
      const parsedSettings = SettingsSchema.safeParse(JSON.parse(body));
      if (!parsedSettings.success) {
        return res.status(400).send(parsedSettings.error);
      }
      set_settings(parsedSettings.data);
      return res.status(200).json(parsedSettings.data);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
