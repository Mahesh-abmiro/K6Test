import http from 'k6/http';
import { check, group } from 'k6';

const baseUrl = 'https://release.rekart.io/';

export const options = {
  vus: 50,
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 40 },
    { duration: '30s', target: 10 },
  ],
  thresholds: {
    checks: [
      { threshold: 'rate>0.9', abortOnFail: true, delayAbortEval: '10s' },
    ],
    // http_req_duration: ['avg<50'],
  },
};

export default function () {
  group('Rekart Performance Testing', function () {
    group('hubs endpoint', function () {
      const res = http.get(`${baseUrl}/app/main/utilities/hubs/list`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
    });

    group('Delivery-overview endpoint', function () {
      const res = http.get(`${baseUrl}/app/main/delivery-overview/373-2026-01-07`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
    });

    group('Transaction sales report endpoint', function () {
      const res = http.get(`${baseUrl}/api/panel/report/download`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
    });
  });
}