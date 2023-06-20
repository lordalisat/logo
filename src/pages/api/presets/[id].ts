import { type NextApiRequest, type NextApiResponse } from "next";
import { add_preset, get_preset } from "server/common/json-helper";
import { SettingsSchema } from "types/json_types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    body: { settings },
    method,
  } = req;

  if (typeof id !== "string") {
    return res.status(400).send("Incorrect name param");
  }

  switch (method) {
    case "GET":
      const preset = get_preset(id);
      if (!preset) {
        return res.status(404).send("preset not found.");
      }
      return res.json(get_preset(id));
    case "PUT":
      const parsedSettings = SettingsSchema.safeParse(settings);
      if (!parsedSettings.success) {
        return res.status(400).send(parsedSettings.error);
      }
      add_preset(id, parsedSettings.data);
      return res.status(200).json(parsedSettings.data);
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      return res.status(405).send(`Method ${method} Not Allowed`);
  }
};

export default handler;
