import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  cloud: {
    // Project: Default project
    projectID: 6333751,
    // Test runs with the same name groups test runs together.
    name: 'Cloud Test of Rekart App (07/01/2026-15:51:27)'
  }
};

export default function() {
  http.get('https://release.rekart.io/app/main/delivery-overview/373-2026-01-08');
  sleep(1);
}