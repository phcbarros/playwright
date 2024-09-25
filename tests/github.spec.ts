
import {expect, test} from '@playwright/test';

const REPO = 'playwright';
const USER = 'phcbarros';

test.use({
  baseURL: 'https://api.github.com',
  extraHTTPHeaders: {
    // We set this header per GitHub guidelines.
    'Accept': 'application/vnd.github.v3+json',
    // Add authorization token to all requests.
    // Assuming personal access token available in the environment.
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28'
  },
})

test('should create a bug report', {
  tag: '@github'
}, async ({ request }) => {
  const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: '[Bug] report 1',
      body: 'Bug description',
    }
  });
  expect(newIssue.ok()).toBeTruthy();

  const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
  console.log(issues)
  expect(issues.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(expect.objectContaining({
    title: '[Bug] report 1',
    body: 'Bug description'
  }));
});

test.skip('should create a feature request',{
  tag: '@github'
}, async ({ request }) => {
  const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: '[Feature] request 1',
      body: 'Feature description',
    }
  });
  expect(newIssue.ok()).toBeTruthy();

  const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
  expect(issues.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(expect.objectContaining({
    title: '[Feature] request 1',
    body: 'Feature description'
  }));
});