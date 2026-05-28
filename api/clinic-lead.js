export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }

    try {

        const response = await fetch(
            'https://n8n-railway-production-7c29.up.railway.app/webhook/clinic-lead',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            }
        );

        if (!response.ok) {
            throw new Error(`Railway responded ${response.status}`);
        }

        return res.status(200).json({
            success: true
        });

    } catch (error) {

        console.error('Proxy error:', error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
