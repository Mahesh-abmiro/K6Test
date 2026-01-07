import http from 'k6/http';
import { check, sleep } from 'k6';
// Ramp the number of virtual users up and down
export const options = {
    stages: [
        { duration: '1m', target: 200 },
        // { duration: '5m', target: 200 },
        { duration: '30s', target: 10},
    ]
};



export default function () {
    const res = http.post('https://release.rekart.io/app/main/delivery-overview/373-2026-01-08');

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(1);
}

export function handleStressSummary(data) {
    return {
        "reports/rekartStressTestResult.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
