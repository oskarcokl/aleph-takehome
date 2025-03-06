import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import ResultItem from '../src/components/result-item'
import * as booksApi from '../src/api/books';

vi.mock('../src/api/books', () => ({
  getAdditionalInfo: vi.fn()
}))

describe('ResultItem', () => {
  const mocBook = {
    coverUrl: "https://covers.openlibrary.org/b/isbn/9783442236862-L.jpg",
    title: "Snow Crash.",
    key: "9783442236862",
  }

  const mockApiResponse = {
    details: {
      authors: [
        {
          key: '/authors/OL19430A',
          name: 'Neal Stephenson',
        },
      ],
      number_of_pages: 470,
      publish_date: '1993',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(booksApi.getAdditionalInfo).mockResolvedValue(mockApiResponse);
  })

  it('should render the result item component', () => {
    render(<ResultItem book={mocBook} />);
    expect(screen.getByText('Snow Crash.')).toBeInTheDocument();
    const coverImage = screen.getByRole('img');
    expect(coverImage).toHaveAttribute('src', 'https://covers.openlibrary.org/b/isbn/9783442236862-L.jpg');
  })
  it('should render additional info when hovered', async () => {
    render(<ResultItem book={mocBook} />);

    expect(screen.queryByText('Physical Format:', { exact: false })).not.toBeInTheDocument();

    const resultItemElement = screen.getByText(mocBook.title).closest('.result-item');
    fireEvent.mouseEnter(resultItemElement!);

    await waitFor(() => {
      expect(screen.getByText("Physical Format:", { exact: false })).toBeInTheDocument();
    })

    expect(screen.getByText("Title:", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Authors:", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Publish Date:", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Number of Pages:", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Weight:", { exact: false })).toBeInTheDocument();
  })
  it('should stop rendering additional info on mouseleave', async () => {
    render(<ResultItem book={mocBook} />);

    expect(screen.queryByText('Physical Format:')).not.toBeInTheDocument();

    const resultItemElement = screen.getByText(mocBook.title).closest('.result-item');
    fireEvent.mouseEnter(resultItemElement!);

    await waitFor(() => {
      expect(screen.getByText("Physical Format:", { exact: false })).toBeInTheDocument();
    })

    fireEvent.mouseLeave(resultItemElement!);
    expect(screen.queryByText('Physical Format:', { exact: false })).not.toBeInTheDocument();
  })
})