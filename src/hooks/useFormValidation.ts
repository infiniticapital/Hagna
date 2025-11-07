import { useState } from 'react';

interface ValidationErrors {
  [key: string]: string;
}

export function useFormValidation() {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s+()-]{8,}$/;
    return phoneRegex.test(phone);
  };

  const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
  };

  const validateField = (name: string, value: string, required = false): string | null => {
    if (required && !validateRequired(value)) {
      return 'Este campo es requerido';
    }

    if (value && name === 'email' && !validateEmail(value)) {
      return 'Email inválido';
    }

    if (value && name === 'phone' && !validatePhone(value)) {
      return 'Teléfono inválido';
    }

    return null;
  };

  const setFieldError = (field: string, error: string | null) => {
    setErrors(prev => {
      if (error) {
        return { ...prev, [field]: error };
      } else {
        const { [field]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateField,
    setFieldError,
    clearErrors,
    validateEmail,
    validatePhone,
    validateRequired
  };
}
