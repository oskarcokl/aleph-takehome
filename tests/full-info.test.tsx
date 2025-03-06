import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import React from 'react'
import FullInfoComponent from '../src/components/full-info'
import FullInfoView from '../src/views/full-info'
import * as booksApi from '../src/api/books';
import { useParams } from 'react-router-dom';

describe('FullInfo', () => {
  it('renders the FullInfo component', () => {
    render(<FullInfoComponent coverImageUrl="https://covers.openlibrary.org/b/isbn/9783442236862-L.jpg" title="Snow Crash." authors={["Neal Stephenson"]} publishDate="December 1, 1995" physicalFormat="Paperback" />);
    expect(screen.getByText('Snow Crash.')).toBeInTheDocument();
    expect(screen.getByText('Neal Stephenson')).toBeInTheDocument();
    expect(screen.getByText('December 1, 1995')).toBeInTheDocument();
    expect(screen.getByText('Paperback')).toBeInTheDocument();

    const coverImage = screen.getByRole('img');
    expect(coverImage).toHaveAttribute('src', 'https://covers.openlibrary.org/b/isbn/9783442236862-L.jpg');
  })
  it('renders the FullInfo view', () => {
    render(<FullInfoView />);
    expect(screen.getByText('Full Info')).toBeInTheDocument();
  })
})
