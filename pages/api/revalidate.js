export default async function handler(req, res) {
  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate("/posts/randall-g-holcombe-a-demokracia-es-a-szabadsag-bonyolult-viszonya-2-resz");
    await res.revalidate("/bejegyzesek/1");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
