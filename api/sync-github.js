export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { content, token } = req.body || {}

  if (!content) {
    return res.status(400).json({ error: 'Missing content payload' })
  }

  const githubToken = token || process.env.GITHUB_TOKEN

  if (!githubToken) {
    return res.status(401).json({
      error: 'Missing GitHub access token. Please provide a token in Admin Settings or set GITHUB_TOKEN in Vercel environment variables.',
    })
  }

  const owner = 'sociium01-jpg'
  const repo = 'kshetra-by-prashant-kalal'
  const path = 'src/content/home.json'
  const branch = 'main'

  try {
    const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
    
    // Step 1: Get current file SHA if it exists
    let sha = null
    const getRes = await fetch(fileUrl, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'Kshetra-Admin-CMS',
      },
    })

    if (getRes.ok) {
      const getData = await getRes.json()
      sha = getData.sha
    }

    // Step 2: Encode content to Base64
    const jsonString = JSON.stringify(content, null, 2)
    const base64Content = Buffer.from(jsonString).toString('base64')

    // Step 3: Put update to GitHub
    const putRes = await fetch(fileUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Kshetra-Admin-CMS',
      },
      body: JSON.stringify({
        message: `cms: Update site content via Admin Portal [${new Date().toISOString()}]`,
        content: base64Content,
        sha: sha || undefined,
        branch,
      }),
    })

    const putData = await putRes.json()

    if (!putRes.ok) {
      return res.status(putRes.status).json({
        error: putData.message || 'Failed to update file on GitHub',
        details: putData,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully pushed content update to GitHub! Vercel is now deploying live changes.',
      commit: putData.commit?.html_url,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
