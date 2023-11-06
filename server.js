const express = require('express');
const http = require('http');
const mediasoup = require('mediasoup');
const { createWorker, Router, WebRtcTransport } = mediasoup;

const app = express();
const server = http.createServer(app);

let worker = await createWorker({
  logLevel: 'warm', 
});

let router;



async function createRouter() {
  router = await worker.createRouter({
    mediaCodecs: [
      {
        kind: 'audio',
        mimeType: 'audio/opus',
        clockRate: 48000,
        channels: 2,
      },
      {
        kind: 'video',
        mimeType: 'video/VP8',
        clockRate: 90000,
        parameters: {
          // Adjust these parameters for desired quality
          xGoogleStartBitrate: 1000, // Starting bitrate in Kbps
        },
      },
    ],
  });
}

createRouter();

app.get('/createProducer', async (req, res) => {
  const transport = await router.createWebRtcTransport({
    listenIps: [{ ip: '0.0.0.0', announcedIp: '10.35.133.99' }],
    enableUdp: true,
    enableTcp: true,
  });

  const producer = await transport.produce({
    kind: 'video', // You can change to 'audio' for audio streams
    rtpParameters: {
      codecPayloadType: 96, // VP8 payload type, adjust as needed
      // Modify these parameters for desired quality
      xGoogleStartBitrate: 1000, // Initial bitrate in Kbps
      xGoogleMaxBitrate: 2000, // Maximum bitrate in Kbps
      xGoogleMinBitrate: 300, // Minimum bitrate in Kbps
    },
  });

  res.json({
    producerId: producer.id,
    producerRtpParameters: producer.rtpParameters,
  });
});

server.listen(3000, () => {
  console.log('Mediasoup server listening on port 3000');
});
