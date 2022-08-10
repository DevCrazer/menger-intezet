export default async function handler(req, res) {
  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // res.send('Trying to revalidate, please do not close this window else the whole universe will collapse unto itself.');
    await res.revalidate("/posts/randall-g-holcombe-a-demokracia-es-a-szabadsag-bonyolult-viszonya-2-resz");
    // console.log('Posts revalidated')
    // await res.revalidate("/bejegyzesek/1");
    // console.log('PostPa')
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
