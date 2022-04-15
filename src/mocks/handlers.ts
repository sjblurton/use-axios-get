import { rest } from 'msw';

export const mockData = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: 'fugiat veniam minus',
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: 'et porro tempora',
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    completed: false,
  },
];

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/todos', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  }),
  rest.get('https://jsonplaceholder.typicode.com/todo', (_, res, ctx) => {
    return res(ctx.status(404));
  }),
  rest.get('*', (req, _, ctx) => {
    console.error(`please add a request handler for ${req.url.toString()}`);
    ctx.status(500);
  }),
];
