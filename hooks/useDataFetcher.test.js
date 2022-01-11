import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useDataFetcher } from "./useDataFetcher";

beforeAll(() => jest.spyOn(window, "fetch"));

describe("Hook useDataFetcher", () => {
  test("not fetching data when URL not provided", async () => {
    const { result } = renderHook(() => useDataFetcher(""));

    await waitFor(() => expect(result.current[0]).toHaveLength(0));
    await waitFor(() => expect(result.current[1]).toBe(false));
  });

  test("not fetching data when invalid URL provided", async () => {
    const { result } = renderHook(() => useDataFetcher("a"));

    await waitFor(() => expect(result.current[0]).toHaveLength(0));
    await waitFor(() => expect(result.current[1]).toBe(false));
  });

  test("fetching data when valid URL provided", async () => {
    window.fetch = jest.fn();

    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ ip: "77.65.100.187" }),
    });

    const { result } = renderHook(() => useDataFetcher("https://google.com/"));

    await waitFor(() =>
      expect(window.fetch).toHaveBeenCalledWith(
        "https://google.com/"
        // expect.objectContaining({
        //   method: 'POST',
        //   body: JSON.stringify(shoppingCart),
        // }),
      )
    );
    await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(result.current[0].ip).toBe("77.65.100.187"));
    await waitFor(() => expect(result.current[1]).toBe(true));
  });
});
