import {expect, test} from './fixtures/github'

test(
  'should create a bug report',
  {
    tag: '@github-page',
  },
  async ({gitHubPage}) => {
    const newIssue = await gitHubPage.createIssue({
      title: '[Bug] report 1',
      body: 'Bug description',
    })

    expect(newIssue.ok()).toBeTruthy()

    const issues = await gitHubPage.getIssues()
    expect(issues.ok()).toBeTruthy()
    expect(await issues.json()).toContainEqual(
      expect.objectContaining({
        title: '[Bug] report 1',
        body: 'Bug description',
      }),
    )
  },
)

test(
  'should create a feature request',
  {
    tag: '@github',
  },
  async ({gitHubPage}) => {
    const newIssue = await gitHubPage.createIssue({
      title: '[Feature] request 1',
      body: 'Feature description',
    })
    expect(newIssue.ok()).toBeTruthy()

    const issues = await gitHubPage.getIssues()
    expect(issues.ok()).toBeTruthy()
    expect(await issues.json()).toContainEqual(
      expect.objectContaining({
        title: '[Feature] request 1',
        body: 'Feature description',
      }),
    )
  },
)
