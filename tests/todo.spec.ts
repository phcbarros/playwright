import {expect, test} from '@playwright/test'
import {TodoPage} from './pages/todo-page'

test.describe('todo tests', () => {
  let todoPage: TodoPage

  test.beforeEach(async ({page}) => {
    todoPage = new TodoPage(page)
    await todoPage.goto()
    await todoPage.addToDo('item1')
    await todoPage.addToDo('item2')
  })

  test.afterEach(async () => {
    await todoPage.removeAll()
  })

  test('should add an item', async () => {
    await todoPage.addToDo('my item')

    expect(await todoPage.countItems()).toBe(3)
  })

  test('should remove an item', async () => {
    await todoPage.remove('item1')

    expect(await todoPage.countItems()).toBe(1)
  })
})
