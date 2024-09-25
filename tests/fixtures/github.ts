import {test as base} from '@playwright/test'
import {GithubPage} from '../pages/github-page'

// Extend basic test by providing a "todoPage" fixture.
export const test = base.extend<{gitHubPage: GithubPage}>({
  gitHubPage: async ({request}, use) => {
    const gitHubPage = new GithubPage(request)
    await use(gitHubPage)
  },
})

test.use({
  baseURL: 'https://api.github.com',
  extraHTTPHeaders: {
    // We set this header per GitHub guidelines.
    Accept: 'application/vnd.github.v3+json',
    // Add authorization token to all requests.
    // Assuming personal access token available in the environment.
    Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
  },
})

export {expect} from '@playwright/test'
