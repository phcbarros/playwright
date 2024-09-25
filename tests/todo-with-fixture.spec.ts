import {test as base, expect} from '@playwright/test';
import {TodoPage} from './todo-page.ts';

// Extend basic test by providing a "todoPage" fixture.
const test = base.extend<{ todoPage: TodoPage }>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo('item1');
    await todoPage.addToDo('item2');
    await use(todoPage);
    await todoPage.removeAll();
  },
});

test('should add an item', {
  tag: '@my-tag',
  annotation: {
    type: 'test',
    description: 'adicionar item'
  }
}, async ({ todoPage }) => {
  await todoPage.addToDo('my item');

  expect(await todoPage.findByText('my item')).toBeTruthy();
});

test('should remove an item', async ({ todoPage }) => {
  await todoPage.remove('item1');

  expect(await todoPage.countItems()).toBe(1);
});

