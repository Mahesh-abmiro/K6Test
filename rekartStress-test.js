import http from 'k6/http';


// Ramp the number of virtual users up and down
export const options = {
    stages: [
        { duration: '1m', target: 200 },
        { duration: '5m', target: 200 },
        { duration: '30s', target: 0 },
    ]
};



export default function () {
    const res = http.post('https://release.rekart.io/api/panel/report/delivery-overview');

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(1);
}

export function handleStressSummary(data) {
    return {
        "RekartStressTestResult.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
