import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import React from 'react'
import ResultItem from '../src/components/result-item'


describe('ResultItem', () => {
  const mocBook = {
    coverUrl: "https://covers.openlibrary.org/b/isbn/9783442236862-L.jpg",
    title: "Snow Crash.",
    key: "9783442236862",
  }

  const mockApiResponse = {
    "bib_key": "olid:OL14813122M",
    "info_url": "https://openlibrary.org/books/OL14813122M/Snow_Crash",
    "preview": "restricted",
    "preview_url": "https://archive.org/details/snowcrash00step",
    "thumbnail_url": "https://covers.openlibrary.org/b/id/7004665-S.jpg",
    "details": {
      "publishers": [
        "Bantam Books"
      ],
      "identifiers": {
        "librarything": [
          "1000167"
        ],
        "goodreads": [
          "603262"
        ]
      },
      "ia_box_id": [
        "IA142204"
      ],
      "series": [
        "Spectra"
      ],
      "covers": [
        7004665
      ],
      "ia_loaded_id": [
        "snowcrash00step"
      ],
      "key": "/books/OL14813122M",
      "authors": [
        {
          "key": "/authors/OL19430A",
          "name": "Neal Stephenson"
        }
      ],
      "publish_places": [
        "New York"
      ],
      "pagination": "470 p. :",
      "source_records": [
        "marc:marc_miami_univ_ohio/allbibs0075.out:6099809:752",
        "ia:snowcrash00step",
        "amazon:0553562614",
        "ia:snowcrash0000step_w5p1",
        "promise:bwb_daily_pallets_2022-03-17",
        "idb:9780553562613"
      ],
      "title": "Snow Crash",
      "number_of_pages": 470,
      "languages": [
        {
          "key": "/languages/eng"
        }
      ],
      "subjects": [
        "Science fiction"
      ],
      "publish_date": "1993",
      "publish_country": "nyu",
      "by_statement": "Neal Stephenson",
      "works": [
        {
          "key": "/works/OL38501W"
        }
      ],
      "type": {
        "key": "/type/edition"
      },
      "classifications": {},
      "local_id": [
        "urn:bwbsku:W7-ADZ-451"
      ],
      "ocaid": "snowcrash00step",
      "isbn_10": [
        "0553562614"
      ],
      "latest_revision": 13,
      "revision": 13,
      "created": {
        "type": "/type/datetime",
        "value": "2008-09-15T10:43:10.211599"
      },
      "last_modified": {
        "type": "/type/datetime",
        "value": "2025-01-14T05:07:26.028545"
      }
    }
  }

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockApiResponse)
    })
  })

  it('should render the result item component', () => {
    render(<ResultItem book={mocBook} />);
    expect(screen.getByText('Snow Crash.')).toBeInTheDocument();
    const coverImage = screen.getByRole('img');
    expect(coverImage).toHaveAttribute('src', 'https://covers.openlibrary.org/b/isbn/9783442236862-L.jpg');
  })
  it('should render additional info when hovered', () => {
    render(<ResultItem book={mocBook} />);


  })
})