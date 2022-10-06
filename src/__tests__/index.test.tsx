import { render, screen } from '@testing-library/react';
import Home from '../pages';

describe('Home', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');
  useRouter.mockImplementation(() => ({
    push: jest.fn()
  }));
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByTestId('redirecting');

    expect(useRouter).toHaveBeenCalled();
    expect(heading).toBeInTheDocument();
  });
});
