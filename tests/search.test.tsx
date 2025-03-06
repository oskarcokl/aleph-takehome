import { describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Search from '../src/views/search'
import { useBookSearchByTitle } from "../src/hooks/books";
import { DebouncedFunc } from 'lodash';

vi.mock('../src/hooks/books', () => ({
  useBookSearchByTitle: vi.fn()
}))

describe('Search', () => {
  const mockSearchResults = [
    {
      "title": "Snow Crash",
      "coverUrl": "https://covers.openlibrary.org/b/id/7004665-L.jpg",
      "key": "OL14813122M"
    },
    {
      "title": "Snow Crash",
      "coverUrl": "",
      "key": "OL10905105M"
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useBookSearchByTitle).mockReturnValue({
      searchResults: [],
      loading: false,
      error: null,
      clearSearchResults: vi.fn(),
      search: vi.fn() as unknown as DebouncedFunc<(searchQuery: string) => void>
    })
  })

  it('should render results view', () => {
    render(<Search />);
    expect(screen.getByText('Search for books'))
  })
  it('should render results for query', async () => {
    vi.mocked(useBookSearchByTitle).mockReturnValue({
      searchResults: mockSearchResults,
      loading: false,
      error: null,
      clearSearchResults: vi.fn(),
      search: vi.fn() as unknown as DebouncedFunc<(searchQuery: string) => void>
    })

    const user = userEvent.setup();

    render(<Search />);
    const searchInput = await screen.findByPlaceholderText('Search')

    await user.click(searchInput);
    await user.keyboard('snow crash');

    await waitFor(() => {
      expect(screen.getAllByText('Snow Crash', { exact: false }).length).toBeGreaterThan(0);
    })
  })
  it('should not render anything if there is no query', async () => {
    const user = userEvent.setup();

    render(<Search />);
    const searchInput = screen.getByPlaceholderText('Search')
    await user.click(searchInput);
    await user.keyboard('jkl{backspace}')

    // Maybe this can be a bit more robust.
    await waitFor(() => {
      expect(screen.queryByTestId('results')).not.toBeInTheDocument();
    })
  })
  it('should display loading state', async () => {
    const mockSearch = vi.fn() as unknown as DebouncedFunc<(searchQuery: string) => void>;
    mockSearch.cancel = vi.fn();
    mockSearch.flush = vi.fn();

    vi.mocked(useBookSearchByTitle).mockReturnValue({
      searchResults: [],
      loading: true,
      error: null,
      clearSearchResults: vi.fn(),
      search: mockSearch
    })

    render(<Search />);
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    })
  })
})