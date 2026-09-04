import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '@seamless/ui';

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toBeInTheDocument();
  });

  it('can be checked and unchecked', async () => {
    const user = userEvent.setup();
    render(<Checkbox data-testid="checkbox" />);
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).not.toBeChecked();
    
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('can be disabled', () => {
    render(<Checkbox disabled data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toBeDisabled();
  });

  it('can be disabled and checked', () => {
    render(<Checkbox disabled checked data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeDisabled();
    expect(checkbox).toBeChecked();
  });

  it('calls onCheckedChange handler', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox onCheckedChange={handleChange} data-testid="checkbox" />);
    
    await user.click(screen.getByTestId('checkbox'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('respects defaultChecked prop', () => {
    render(<Checkbox defaultChecked data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toBeChecked();
  });

  it('works with label association', () => {
    render(
      <div>
        <Checkbox id="test-checkbox" />
        <label htmlFor="test-checkbox">Accept terms</label>
      </div>
    );
    
    const label = screen.getByText('Accept terms');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'test-checkbox');
  });
});
