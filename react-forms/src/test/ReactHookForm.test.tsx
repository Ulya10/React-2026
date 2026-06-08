import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ReactHookForm from '../components/ReactHookForm';

describe('ReactHookForm', () => {
  it('renders all fields', () => {
    render(<ReactHookForm onSuccess={() => {}} />);
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Age:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Country:')).toBeInTheDocument();
  });

  it('submit button is disabled when form is empty', () => {
    render(<ReactHookForm onSuccess={() => {}} />);
    expect(screen.getByText('Submit')).toBeDisabled();
  });

  it('success on valid submit', async () => {
    let success = false;
    render(
      <ReactHookForm
        onSuccess={() => {
          success = true;
        }}
      />
    );

    await userEvent.type(screen.getByLabelText('Name:'), 'Test');
    await userEvent.type(screen.getByLabelText('Age:'), '25');
    await userEvent.type(screen.getByLabelText('Email:'), 'test@gmail.com');
    await userEvent.click(screen.getByLabelText('Female'));
    await userEvent.click(screen.getByLabelText(/i agree/i));
    await userEvent.type(screen.getByLabelText('Password:'), 'Password1!');
    await userEvent.type(
      screen.getByLabelText('Confirm Password:'),
      'Password1!'
    );

    const countryInput = screen.getByPlaceholderText('Country');
    await userEvent.type(countryInput, 'Russia');
    const option = screen.getByText('Russia');
    await userEvent.click(option);

    await userEvent.click(screen.getByText('Submit'));

    expect(success).toBe(true);
  });
});
