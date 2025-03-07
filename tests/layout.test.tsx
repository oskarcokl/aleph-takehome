import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import React from 'react'
import Layout from '../src/layout'

describe('Layout', () => {
  it('should render the layout', () => {
    render(<Layout>
      <div>
        <h1>Test</h1>
      </div>
    </Layout>)

    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})