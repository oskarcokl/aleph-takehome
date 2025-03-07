import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import ResultItem from '../src/components/result-item'
import * as booksApi from '../src/api/books';

vi.mock('../src/api/books', () => ({
  getBookDetails: vi.fn()
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

    vi.mocked(booksApi.getBookDetails).mockResolvedValue(mockApiResponse);
  })

  it('should render the result item component', () => {
    render(<ResultItem book={mocBook} />);
    expect(screen.getByText('Snow Crash.')).toBeInTheDocument();
    const coverImage = screen.getByRole('img');
    expect(coverImage).toHaveAttribute('src', 'https://covers.openlibrary.org/b/isbn/9783442236862-L.jpg');
  })
  it('should render additional info when hovered', async () => {
    const user = userEvent.setup();

    render(<ResultItem book={mocBook} />);

    expect(screen.queryByTestId('additional-info')).not.toBeInTheDocument();

    const resultItemElement = screen.getByTestId('result-item');
    await user.hover(resultItemElement);

    await waitFor(() => {
      expect(screen.getByTestId('additional-info')).toBeInTheDocument();
    })

    expect(screen.getByText("Title: Snow Crash.")).toBeInTheDocument();
    expect(screen.getByText("Authors: Neal Stephenson")).toBeInTheDocument();
    expect(screen.getByText("Publish Date: 1993")).toBeInTheDocument();
    expect(screen.getByText("Number of Pages: 470")).toBeInTheDocument();
    expect(screen.getByText("Weight:")).toBeInTheDocument();
  })
  it('should stop rendering additional info on mouseleave', async () => {
    const user = userEvent.setup();

    render(<ResultItem book={mocBook} />);

    expect(screen.queryByTestId('additional-info')).not.toBeInTheDocument();

    const resultItemElement = screen.getByTestId('result-item');
    await user.hover(resultItemElement);

    await waitFor(() => {
      expect(screen.getByTestId('additional-info')).toBeInTheDocument();
    })

    await user.unhover(resultItemElement);
    expect(screen.queryByTestId('additional-info')).not.toBeInTheDocument();
  })
})