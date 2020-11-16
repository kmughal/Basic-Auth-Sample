module.exports = {
    async headers() {
      return [
        {
          source: '/live-messages',
          headers: [
            {
              key: 'Content-Type',
              value: 'text/event-stream',
            },
            {
              key: 'Connection',
              value: 'keep-alive',
            },
            {
              key: 'Cache-Control',
              value: 'no-cache',
            },
             
          ],
        },
      ]
    },
  }