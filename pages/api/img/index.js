// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getAuthenticationParameters } from "../../../components/tools/imageKit-functions";

export default async function handler(req, res) {
  res.status(200).json(await getAuthenticationParameters());
}
