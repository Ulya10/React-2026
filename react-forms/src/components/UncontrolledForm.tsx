import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import { validationSchema } from '../validation/validationSchema';
import { useFormStore } from '../store/useFormStore';
import CountryDropdown from './CountryDropdown';

export default function UncontrolledForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const addSubmission = useFormStore((state) => state.addSubmission);
  function submitData(evt: SyntheticEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const data = Object.fromEntries(formData);

    console.log('Data from form:', data);

    const parsedData = {
      ...data,
      age: Number(data.age),
      agreement: data.agreement === 'on',
    };

    const validationResult = validationSchema.safeParse(parsedData);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    console.log('Valid success:', validationResult.data);
    addSubmission(validationResult.data);
    setErrors({});
    onSuccess();
  }

  return (
    <form onSubmit={submitData}>
      <label>
        Name:
        <input name="name" type="text" />
        {errors.name && <p className="error">{errors.name}</p>}
      </label>

      <label>
        Age:
        <input name="age" type="number" />
        {errors.age && <p className="error">{errors.age}</p>}
      </label>

      <label>
        Email:
        <input name="email" type="email" />
        {errors.email && <p className="error">{errors.email}</p>}
      </label>

      <div>
        Gender:
        <label>
          <input name="gender" type="radio" value="male" /> Male
        </label>
        <label>
          <input name="gender" type="radio" value="female" /> Female
        </label>
        <label>
          <input name="gender" type="radio" value="other" /> Other
        </label>
        {errors.gender && <p className="error">{errors.gender}</p>}
      </div>

      <label>
        <input name="agreement" type="checkbox" /> I agree
        {errors.agreement && <p className="error">{errors.agreement}</p>}
      </label>

      <label>
        Password:
        <input name="password" type="password" />
        {errors.password && <p className="error">{errors.password}</p>}
      </label>

      <label>
        Confirm Password:
        <input name="confirmPassword" type="password" />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
      </label>

      <label>
        Country:
        <CountryDropdown
          onChange={(value) => {
            const hiddenInput = document.querySelector(
              'input[name="country"]'
            ) as HTMLInputElement;
            if (hiddenInput) hiddenInput.value = value;
          }}
          error={errors.country}
        />
        <input name="country" type="hidden" />
      </label>

      <label>
        Image:
        <input name="image" type="file" accept="image/png,image/jpeg" />
        {errors.image && <p className="error">{errors.image}</p>}
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
