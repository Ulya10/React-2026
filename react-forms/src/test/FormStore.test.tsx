import { describe, it, expect, beforeEach } from 'vitest';
import { useFormStore } from '../store/useFormStore';

describe('useFormStore', () => {
  beforeEach(() => {
    useFormStore.setState({ submissions: [], countries: [] });
  });

  it('adds submission', () => {
    const store = useFormStore.getState();
    store.addSubmission({
      name: 'Test',
      age: 25,
      email: 'test@gmail.com',
      gender: 'male',
      agreement: true,
      password: 'Password1!',
      confirmPassword: 'Password1!',
      country: 'Armenia',
    });

    const submissions = useFormStore.getState().submissions;
    expect(submissions).toHaveLength(1);
    expect(submissions[0].name).toBe('Test');
    expect(submissions[0].id).toBeDefined();
  });
});
