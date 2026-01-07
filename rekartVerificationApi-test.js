import { expect } from 'https://jslib.k6.io/k6-testing/0.6.1/index.js';
import { browser } from 'k6/browser';
import http from 'k6/http';

export function protocolTest() {
  // Get the https://release.rekart.io/app/main/delivery-overview/373-2026-01-08 page
  const response = http.get('https://release.rekart.io/app/main/delivery-overview/373-2026-01-08');

  // Simple assertions
  expect(response.status).toBe(200);
  expect(response.error).toEqual('');
  expect(response.body).toBeDefined();
}

export async function browserTest() {
  const page = await browser.newPage();

  try {
    await page.goto('https://release.rekart.io/app/main/overview');

    // Assert the "Low Balance Subscriptions" text is visible
    await expect(page.locator('//p[contains(text(),"Low Balance Subscriptions")]')).toBeVisible();
      await page.screenshot({ path: 'screenshotsscreenshot.png' });
  } finally {
    await page.close();
  }
}

export const options = {
  scenarios: {
    // Protocol tests
    protocol: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 1,
      exec: 'protocolTest',
    },

    // Browser tests
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
      exec: 'browserTest',
    },
  },
};