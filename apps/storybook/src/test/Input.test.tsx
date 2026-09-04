import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@seamless/ui';

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);
    
    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'Hello World');
    
    expect(input).toHaveValue('Hello World');
  });

  it('can be disabled', () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });

  it('supports different input types', () => {
    const { rerender } = render(<Input type="email" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'email');
    
    rerender(<Input type="password" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
    
    rerender(<Input type="number" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'number');
  });

  it('calls onChange handler', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="Input" />);
    
    const input = screen.getByPlaceholderText('Input');
    await user.type(input, 'test');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('custom-class');
  });
});
