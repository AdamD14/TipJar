export type HttpError = {
  response?: {
    status?: number;
    data?: {
      message?: string;
      code?: number;
      errors?: Record<string, any>;
    };
  };
  message?: string;
};

export function normalize(err: unknown) {
  const e = err as HttpError;
  const code = e.response?.status;
  const msg = e.response?.data?.message || e.message || 'Unexpected error';
  const fields = e.response?.data?.errors;
  return { code, msg, fields };
}
