import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('renders the label correctly', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByTestId('custom-button')).toHaveTextContent('Click me');
  });

  it('triggers onClick when clicked', () => {
    const mockClick = jest.fn();
    render(<Button label="Click" onClick={mockClick} />);
    fireEvent.click(screen.getByTestId('custom-button'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});