import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import UncontrolledForm from '../components/UncontrolledForm';

describe('UncontrolledForm', () => {
  it('renders all fields', () => {
    render(<UncontrolledForm onSuccess={() => {}} />);
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Age:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Country:')).toBeInTheDocument();
  });

  it('shows errors on empty submit', async () => {
    render(<UncontrolledForm onSuccess={() => {}} />);
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Enter name')).toBeInTheDocument();
  });

  it('success on valid submit', async () => {
    let success = false;
    render(
      <UncontrolledForm
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

    const hiddenCountry = document.querySelector(
      'input[name="country"]'
    ) as HTMLInputElement;
    if (hiddenCountry) hiddenCountry.value = 'Russia';

    await userEvent.click(screen.getByText('Submit'));

    expect(success).toBe(true);
  });
});
