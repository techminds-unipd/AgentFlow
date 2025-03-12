import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import {expect, test, describe} from 'vitest'
import { Navbar } from './Navbar'
import { MemoryRouter } from "react-router";

describe('Navbar', () => {
  
  test('Renders the navbar', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument()
  });

  test('Renders the home item', () => {
    render(
      <MemoryRouter>
          <Navbar />
      </MemoryRouter>
  );
      expect(screen.getByText('Home')).toBeInTheDocument()
  });
  
  test('Renders the about us item', () => {
    render(
      <MemoryRouter>
          <Navbar />
      </MemoryRouter>
    );
      expect(screen.getByText('About Us')).toBeInTheDocument()
  });


});