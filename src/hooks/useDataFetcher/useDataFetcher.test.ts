import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useDataFetcher } from './useDataFetcher';

describe('Hook useDataFetcher', () => {
  test('not fetching data when URL not provided', async () => {
    const { result } = renderHook(() => useDataFetcher(''));

    await waitFor(() => expect(result.current[0]).toHaveLength(0));
    await waitFor(() => expect(result.current[1]).toBe(false));
  });

  test('not fetching data when invalid URL provided', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: async () => ({ ip: '' }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useDataFetcher('a'));

    await waitFor(() => expect(result.current[0]).toHaveLength(0));
    await waitFor(() => expect(result.current[1]).toBe(false));
  });

  test('fetching data when valid URL provided', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({ ip: '77.65.100.187' }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useDataFetcher('https://google.com/'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://google.com/'));
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    // @ts-ignore
    await waitFor(() => expect(result.current[0].ip).toBe('77.65.100.187'));
    await waitFor(() => expect(result.current[1]).toBe(true));
  });
});
