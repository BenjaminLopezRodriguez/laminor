import type { NextApiRequest, NextApiResponse } from "next";
import { WorkOS } from "@workos-inc/node";

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  const { profile } = await workos.sso.getProfileAndToken({
    code,
    clientId,
  });

  // Use the Test Organization ID to get started. Replace it with
  // the user’s real organization ID when you finish the integration.
  const organization = "org_test_idp";

  // Validate that this profile belongs to the organization used for authentication
  if (profile.organizationId !== organization) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  // Use the information in `profile` for further business logic.

  res.redirect("/");
};
