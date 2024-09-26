import {expect, test} from '@playwright/test'

test.use({
  baseURL: 'https://jsonplaceholder.typicode.com',
  extraHTTPHeaders: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})

test.describe.configure({mode: 'parallel'})

test.describe('posts', () => {
  test('should create a post', async ({request}) => {
    const response = await request.post('/posts', {
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    })

    expect(response.ok()).toBeTruthy()
    expect(await response.json()).toEqual({
      id: 101,
      title: 'foo',
      body: 'bar',
      userId: 1,
    })
  })

  test('should update a post', async ({request}) => {
    const response = await request.put('/posts/1', {
      data: {
        title: 'changed title',
        body: 'changed body',
        userId: 1,
      },
    })

    expect(response.ok()).toBeTruthy()
    expect(await response.json()).toEqual({
      id: 1,
      title: 'changed title',
      body: 'changed body',
      userId: 1,
    })
  })

  test('should update only part of a post', async ({request}) => {
    const response = await request.patch('/posts/1', {
      data: {
        title: 'changed title',
        userId: 1,
      },
    })

    expect(response.ok()).toBeTruthy()
    expect(await response.json()).toEqual({
      id: 1,
      title: 'changed title',
      body:
        'quia et suscipit\n' +
        'suscipit recusandae consequuntur expedita et cum\n' +
        'reprehenderit molestiae ut ut quas totam\n' +
        'nostrum rerum est autem sunt rem eveniet architecto',
      userId: 1,
    })
  })

  test('should delete a post', async ({request}) => {
    const response = await request.delete('/posts/1')

    expect(response.ok()).toBeTruthy()
  })

  test('should filter posts by user', async ({request}) => {
    const response = await request.get('/posts?userId=1')

    expect(response.ok()).toBeTruthy()
    const posts = await response.json()

    expect(posts).toHaveLength(10)
    expect(posts).toContainEqual(
      expect.objectContaining({
        userId: 1,
      }),
    )
  })

  test('should list all comments on a posts', async ({request}) => {
    const response = await request.get('/posts/1/comments')

    expect(response.ok()).toBeTruthy()
    const comments = await response.json()

    expect(comments).toHaveLength(5)
    expect(comments).toContainEqual(
      expect.objectContaining({
        postId: 1,
      }),
    )
  })
})
