import useAxiosGet from '../src';
import { act, renderHook } from '@testing-library/react-hooks';
import { mockData } from '../src/mocks/handlers';
import { server } from '../src/mocks/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

export type MockData = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

describe('testing API calling', () => {
  it('should be loading before data response.', async () => {
    const { result } = renderHook(() =>
      useAxiosGet<MockData[]>('https://jsonplaceholder.typicode.com/todos')
    );
    expect(result.current.status).toBe('pending');
  });

  it('should be fulfilled when data loaded.', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet<MockData[]>('https://jsonplaceholder.typicode.com/todos')
    );
    await waitForNextUpdate();
    expect(result.current.status).toBe('fulfilled');
  });

  it('should have an array of data.', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet<MockData[]>('https://jsonplaceholder.typicode.com/todos')
    );
    await waitForNextUpdate();
    expect(result.current.data).toEqual(mockData);
  });

  it('should revert status back to pending if mutate is running.', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet<MockData[]>('https://jsonplaceholder.typicode.com/todos')
    );
    await waitForNextUpdate();
    expect(result.current.data).toEqual(mockData);
    act(() => {
      result.current.mutate();
    });
    expect(result.current.status).toBe('pending');
  });

  it('should revert status back to fulfilled when mutate has finished.', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet<MockData[]>('https://jsonplaceholder.typicode.com/todos')
    );
    await waitForNextUpdate();
    expect(result.current.data).toEqual(mockData);
    act(() => {
      result.current.mutate();
    });
    await waitForNextUpdate();
    expect(result.current.status).toBe('fulfilled');
  });

  it('should update error status.', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet<MockData[]>('https://jsonplaceholder.typicode.com/todo')
    );
    await waitForNextUpdate();
    expect(result.current.status).toBe('error');
  });

  it('should give 404 message.', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet<MockData[]>('https://jsonplaceholder.typicode.com/todo')
    );
    await waitForNextUpdate();
    expect(result.current.error?.message).toBe(
      'Request failed with status code 404'
    );
  });

  it('should give 500 error.', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet<MockData[]>('https://jsonplaceholder')
    );
    await waitForNextUpdate();
    expect(result.current.error?.message).toBe('Network Error');
  });
});
