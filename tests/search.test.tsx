import { describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Search from '../src/views/search'
import * as booksApi from '../src/api/books';

vi.mock('../src/api/books', () => ({
  getBooksByTitle: vi.fn()
}))

describe('Search', () => {
  const mockApiResponse = {
    "docs": [
      {
        "cover_i": 392508,
        "key": "/works/OL38501W",
        "title": "Snow Crash",
        "editions": {
          "numFound": 38,
          "start": 0,
          "numFoundExact": true,
          "docs": [
            {
              "key": "/books/OL14813122M",
              "title": "Snow Crash",
              "cover_i": 7004665
            }
          ]
        }
      },
      {
        "key": "/works/OL8495480W",
        "title": "Snow Crash",
        "editions": {
          "numFound": 1,
          "start": 0,
          "numFoundExact": true,
          "docs": [
            {
              "key": "/books/OL10905105M",
              "title": "Snow Crash"
            }
          ]
        }
      }
    ]
  }

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(booksApi.getBooksByTitle).mockResolvedValue(mockApiResponse);
  })

  it('should render results view', () => {
    render(<Search />);
    expect(screen.getByText('Search for books'))
  })
  it('should render results for query', async () => {
    const user = userEvent.setup();

    render(<Search />);
    const searchInput = await screen.findByPlaceholderText('Search')

    await user.click(searchInput);
    await user.keyboard('snow crash');

    await waitFor(() => {
      expect(screen.getByText('Snow Crash')).toBeInTheDocument();
    })
  })
})