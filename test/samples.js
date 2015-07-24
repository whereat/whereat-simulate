const samples = {};

samples.lSpecs = {
  lastPing: 0,
  time: 2505606400000,
  telnet: [
    "geo fix -74.011262 40.7092649",
    "geo fix -74.011338 40.708273",
    "geo fix -74.011285 40.707508",
    "geo fix -74.010823 40.706923"
  ],
  http: [
    {
      id: "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
      locs: [
        { lat: 40.704715, lon: -74.013685 },
        { lat: 40.705007, lon: -74.012537 },
        { lat: 40.705731, lon: -74.011443 },
        { lat: 40.706886, lon: -74.010853 }
      ]
    },
    {
      id: "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
      locs: [
        { lat: 40.703084, lon: -74.010126 },
        { lat: 40.704092, lon: -74.008989 },
        { lat: 40.705264, lon: -74.010029 },
        { lat: 40.706638, lon: -74.011006 }
      ]
    }
  ]
};

samples.ids = [
  "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
  "75782cd4-1a42-4af1-9130-05c63b2aa9fb"
];

samples.initRequests = [{
  id: "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
  lat: 40.704715,
  lon: -74.013685,
  time: 2505606400000
}, {
  id: "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
  lat: 40.703084,
  lon: -74.010126,
  time: 2505606400000
}];

samples.initResponses = [
  [{
    "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
    "lat": 40.704715,
    "lon": -74.013685,
    "time": 2505606400000
  }],
  [{
    "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
    "lat": 40.704715,
    "lon": -74.013685,
    "time": 2505606400000
  }, {
    "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
    "lat": 40.703084,
    "lon": -74.010126,
    "time": 2505606400000
  }]
];

samples.refreshRequests = [
  [
    {
      lastPing: 0,
      location: {
        id: "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
        lat: 40.705007,
        lon: -74.012537,
        time: 2505606400000
      }
    },
    {
      lastPing: 0,
      location: {
        id: "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
        lat: 40.704092,
        lon: -74.008989,
        time: 2505606400000
      }
    }
  ],
  [
    {
      lastPing: 0,
      location: {
        id: "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
        lat: 40.705731,
        lon: -74.011443,
        time: 2505606400000
      }
    },
    {
      lastPing: 0,
      location: {
        id: "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
        lat: 40.705264,
        lon: -74.010029,
        time: 2505606400000
      }
    }
  ],
  [
    {
      lastPing: 0,
      location: {
        id: "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
        lat: 40.706886,
        lon: -74.010853,
        time: 2505606400000
      }
    },
    {
      lastPing: 0,
      location: {
        id: "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
        lat: 40.706638,
        lon: -74.011006,
        time: 2505606400000
      }
    }
  ]
];

samples.refreshRequestsMult3 =
[
  [
    {
      "lastPing": 0,
      "location": {
        "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
        "lat": 40.705007,
        "lon": -74.012537,
        "time": 2505606400000
      }
    },
    {
      "lastPing": 0,
      "location": {
        "id": "887da326-7c89-46bd-a132-bd74a3b3fce80",
        "lat": 40.705243,
        "lon": -74.012989,
        "time": 2505606400000
      }
    },
    {
      "lastPing": 0,
      "location": {
        "id": "8e3ae8b5-79a5-41fa-a9cf-4bd674115c8b0",
        "lat": 40.70542,
        "lon": -74.012238,
        "time": 2505606400000
      }
    },
    {
      "lastPing": 0,
      "location": {
        "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
        "lat": 40.704092,
        "lon": -74.008989,
        "time": 2505606400000
      }
    },
    {
      "lastPing": 0,
      "location": {
        "id": "887da326-7c89-46bd-a132-bd74a3b3fce83",
        "lat": 40.703768,
        "lon": -74.008922,
        "time": 2505606400000
      }
    },
    {
      "lastPing": 0,
      "location": {
        "id": "8e3ae8b5-79a5-41fa-a9cf-4bd674115c8b3",
        "lat": 40.70442,
        "lon": -74.008501,
        "time": 2505606400000
      }
    }
  ],
  [
    {
      "lastPing": 0,
      "location": {
        "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
        "lat": 40.705731,
        "lon": -74.011443,
        "time": 2505606400000
      }
    },
    {
      "lastPing": 0,
      "location": {
        "id": "887da326-7c89-46bd-a132-bd74a3b3fce80",
        "lat": 40.705631,
        "lon": -74.011158,
        "time": 2505606400000
      }
    },
    {
      "lastPing": 0,
      "location": {
        "id": "8e3ae8b5-79a5-41fa-a9cf-4bd674115c8b0",
        "lat": 40.705686,
        "lon": -74.011742,
        "time": 2505606400000
      }
    },
    {
      "lastPing": 0,
      "location": {
        "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
        "lat": 40.705264,
        "lon": -74.010029,
        "time": 2505606400000
      }
    },
    {
      "lastPing": 0,
      "location": {
        "id": "887da326-7c89-46bd-a132-bd74a3b3fce83",
        "lat": 40.705317,
        "lon": -74.010346,
        "time": 2505606400000
      }
    },
    {
      "lastPing": 0,
      "location": {
        "id": "8e3ae8b5-79a5-41fa-a9cf-4bd674115c8b3",
        "lat": 40.705711,
        "lon": -74.010229,
        "time": 2505606400000
      }
    }
  ],
  [
    {
      "lastPing": 0,
      "location": {
        "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
        "lat": 40.706886,
        "lon": -74.010853,
        "time": 2505606400000
      }
    },
    {
      "lastPing": 0,
      "location": {
        "id": "887da326-7c89-46bd-a132-bd74a3b3fce80",
        "lat": 40.706969,
        "lon": -74.010887,
        "time": 2505606400000
      }
    },
    {
      "lastPing": 0,
      "location": {
        "id": "8e3ae8b5-79a5-41fa-a9cf-4bd674115c8b0",
        "lat": 40.707062,
        "lon": -74.010588,
        "time": 2505606400000
      }
    },
    {
      "lastPing": 0,
      "location": {
        "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
        "lat": 40.706638,
        "lon": -74.011006,
        "time": 2505606400000
      }
    },
    {
      "lastPing": 0,
      "location": {
        "id": "887da326-7c89-46bd-a132-bd74a3b3fce83",
        "lat": 40.706346,
        "lon": -74.011174,
        "time": 2505606400000
      }
    },
    {
      "lastPing": 0,
      "location": {
        "id": "8e3ae8b5-79a5-41fa-a9cf-4bd674115c8b3",
        "lat": 40.70692,
        "lon": -74.011299,
        "time": 2505606400000
      }
    }
  ]
];



module.exports = samples;
