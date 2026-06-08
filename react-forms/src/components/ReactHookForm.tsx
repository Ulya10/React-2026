import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchema } from '../validation/validationSchema';
import type { validationData } from '../validation/validationSchema';
import { useFormStore } from '../store/useFormStore';
import CountryDropdown from './CountryDropdown';
import { useController } from 'react-hook-form';

export default function ReactHookForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const addSubmission = useFormStore((state) => state.addSubmission);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<validationData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  });
  const { field } = useController({ name: 'country', control });

  function onSubmit(data: validationData) {
    console.log('Valid:', data);
    addSubmission(data);
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label>
        Name:
        <input {...register('name')} type="text" />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </label>

      <label>
        Age:
        <input {...register('age', { valueAsNumber: true })} type="number" />
        {errors.age && <p className="error">{errors.age.message}</p>}
      </label>

      <label>
        Email:
        <input {...register('email')} type="email" />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </label>

      <div>
        Gender:
        <label>
          <input {...register('gender')} type="radio" value="male" /> Male
        </label>
        <label>
          <input {...register('gender')} type="radio" value="female" /> Female
        </label>
        <label>
          <input {...register('gender')} type="radio" value="other" /> Other
        </label>
        {errors.gender && <p className="error">{errors.gender.message}</p>}
      </div>

      <label>
        <input {...register('agreement')} type="checkbox" /> I agree
        {errors.agreement && (
          <p className="error">{errors.agreement.message}</p>
        )}
      </label>

      <label>
        Password:
        <input {...register('password')} type="password" />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </label>

      <label>
        Confirm Password:
        <input {...register('confirmPassword')} type="password" />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}
      </label>

      <label>
        Country:
        <CountryDropdown
          value={field.value}
          onChange={field.onChange}
          error={errors.country?.message}
        />
      </label>

      <label>
        Image:
        <input
          {...register('image')}
          type="file"
          accept="image/png,image/jpeg"
        />
        {errors.image && (
          <p className="error">{String(errors.image.message)}</p>
        )}
      </label>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
