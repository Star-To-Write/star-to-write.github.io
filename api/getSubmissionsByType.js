// FOR THE PURPOSES OF TESTING

export default async function handler (req, res) {
  const { type } = req.query;
  const response = await fetch(`http://startowrite-api.vercel.app/submissions?submission_type=${type}`, {
      headers: {
        "x-api-key": process.env.API_KEY,
      },
  })

  res.status(200).json(await response.json())
      

}