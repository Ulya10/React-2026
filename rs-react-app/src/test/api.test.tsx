import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getItems } from '../api/api';

const mockJokes = [
  { setup: 'Joke 1', punchline: 'Answer 1' },
  { setup: 'dog joke', punchline: 'woof' },
  { setup: 'cat joke', punchline: 'meow' },
];

function createMockResponse(data: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    statusText: ok ? 'OK' : 'Error',
    headers: new Headers(),
    redirected: false,
    type: 'basic' as ResponseType,
    url: '',
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    blob: () => Promise.resolve(new Blob()),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    formData: () => Promise.resolve(new FormData()),
    clone: () => createMockResponse(data, ok, status),
    body: null,
    bodyUsed: false,
    bytes: () => Promise.resolve(new Uint8Array()),
  };
}

describe('getItems', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('returns all items when no searchWord is provided', async () => {
    vi.mocked(fetch).mockResolvedValue(createMockResponse(mockJokes));

    const result = await getItems();
    expect(result).toHaveLength(3);
    expect(result[0].name).toBe('Joke 1');
    expect(result[0].description).toBe('Answer 1');
  });

  it('filters items by searchWord in name', async () => {
    vi.mocked(fetch).mockResolvedValue(createMockResponse(mockJokes));

    const result = await getItems('dog');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('dog joke');
  });

  it('filters items by searchWord in description', async () => {
    vi.mocked(fetch).mockResolvedValue(createMockResponse(mockJokes));

    const result = await getItems('woof');
    expect(result).toHaveLength(1);
    expect(result[0].description).toBe('woof');
  });

  it('returns empty array when no matches found', async () => {
    vi.mocked(fetch).mockResolvedValue(createMockResponse(mockJokes));

    const result = await getItems('nonexistent');
    expect(result).toHaveLength(0);
  });

  it('returns all items when searchWord is empty string', async () => {
    vi.mocked(fetch).mockResolvedValue(createMockResponse(mockJokes));

    const result = await getItems('');
    expect(result).toHaveLength(3);
  });

  it('returns all items when searchWord is only spaces', async () => {
    vi.mocked(fetch).mockResolvedValue(createMockResponse(mockJokes));

    const result = await getItems('   ');
    expect(result).toHaveLength(3);
  });

  it('throws error when response is not ok (500)', async () => {
    vi.mocked(fetch).mockResolvedValue(createMockResponse(null, false, 500));

    await expect(getItems()).rejects.toThrow('Server error: 500');
  });

  it('throws error when response is not ok (404)', async () => {
    vi.mocked(fetch).mockResolvedValue(createMockResponse(null, false, 404));

    await expect(getItems()).rejects.toThrow('Server error: 404');
  });

  it('throws error when fetch fails with network error', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    await expect(getItems()).rejects.toThrow('Network error');
  });

  it('search is case insensitive', async () => {
    vi.mocked(fetch).mockResolvedValue(createMockResponse(mockJokes));

    const result = await getItems('DOG');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('dog joke');
  });
});