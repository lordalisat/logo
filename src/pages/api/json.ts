import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "server/common/get-server-auth-session";
import { get_settings, set_settings } from "server/common/json-helper";
import { SettingsSchema } from "types/json_types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { settings },
    method,
  } = req

  switch (method) {
    case 'GET':
      // Get data from your database
      return res.status(200).json(get_settings())
    case 'PUT':
      const session = await getServerAuthSession({ req, res });
    
      if (!session) {
        return res.status(403).send("Forbidden");
      }
      const parsedSettings = SettingsSchema.safeParse(settings);
      if (!parsedSettings.success) {
        return res.status(400).send(parsedSettings.error);
      }
      set_settings(parsedSettings.data);
      return res.status(200).json(parsedSettings.data);
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
};

export default handler;
