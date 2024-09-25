import {test as base} from '@playwright/test'
import {SettingsPage} from '../pages/settings-page'
import {TodoPage} from '../pages/todo-page'

// Declare the types of your fixtures.
type MyFixtures = {
  todoPage: TodoPage
  settingsPage: SettingsPage
}

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  todoPage: async ({page}, use) => {
    // Set up the fixture.
    const todoPage = new TodoPage(page)
    await todoPage.goto()
    await todoPage.addToDo('item1')
    await todoPage.addToDo('item2')

    // Use the fixture value in the test.
    await use(todoPage)

    // Clean up the fixture.
    await todoPage.removeAll()
  },

  settingsPage: async ({page}, use) => {
    const settingsPage = new SettingsPage(page)
    await settingsPage.goto()
    await use(settingsPage)
  },
})
export {expect} from '@playwright/test'
