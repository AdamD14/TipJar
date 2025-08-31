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

export function normalize(err: HttpError) {
  const code = err.response?.status;
  const msg =
    err.response?.data?.message || err.message || 'Unexpected error';
  const fields = err.response?.data?.errors;
  return { code, msg, fields };
}
