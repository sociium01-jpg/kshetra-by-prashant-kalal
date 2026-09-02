export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json( { message: 'Method Not Allowed' });
  }

  const { name, phone, message } = req.body || {};

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY || '5bf5367b-14d2-4e8a-b8fb-4d4375b42d13',
        email: 'kshetrabyprashantkalal@gmail.com',
        bcc: 'sociium01@gmail.com',
        subject: `New Property Enquiry from ${name || 'Website Visitor'}`,
        from_name: 'Kshetra By Prashant Kalal Website',
        name,
        phone,
        message,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json( { error: error.message });
  }
}
