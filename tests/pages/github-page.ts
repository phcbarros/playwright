import {APIRequestContext} from 'playwright/test'

export type GitHubIssues = {
  title: string
  body: string
}

export class GithubPage {
  private readonly user = process.env.GITHUB_USER || 'phcbarros'
  private readonly repo = process.env.GITHUB_REPO || 'playwright'

  constructor(public readonly request: APIRequestContext) {}

  async createIssue(data: GitHubIssues) {
    return await this.request.post(`/repos/${this.user}/${this.repo}/issues`, {
      data,
    })
  }

  async getIssues() {
    return await this.request.get(`/repos/${this.user}/${this.repo}/issues`)
  }
}
