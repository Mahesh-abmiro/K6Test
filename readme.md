
# k6 Load & Stress Testing

This repository contains **k6 performance testing scripts** for executing load tests, stress tests, and cloud-based tests using **Grafana k6**.

---

## Prerequisites

- k6 installed on your system  
- Grafana Cloud account (for cloud execution and dashboards)

---

## Test Scripts

- `rekartTest.js` – Load testing script  
- `rekartStress-Test.js` – Stress testing script  
- `rekartCloud-test.js` – Grafana k6 cloud test script  

---

## Local Test Execution

### Run Load Test with VUs and Iterations
```bash
k6 run --vus 10 --iterations 20 rekartTest.js


## Run Load Test Using Script Configuration

# Run the load test using the configuration defined inside the script:
# Terminal bash

k6 run rekartTest.js

# Run the stress test with specified virtual users and iterations:

k6 run --vus 10 --iterations 20 rekartStress-Test.js


# Login to Grafana Cloud

# Authenticate with Grafana k6 Cloud using your access token:

k6 cloud login --token a46eaef59a9d5c620ce442820b2928c6f890d6b02716590647da1167b519c0b1


# Execute the test on Grafana k6 Cloud to view real-time metrics and dashboards:

k6 cloud rekartCloud-test.js


# After running the cloud test, results can be viewed in the Grafana k6 dashboard.

# https://maheshb9d6.grafana.net/a/k6-app/runs/6480680






