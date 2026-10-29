type ApiErrorPayload = {
  response?: {
    status?: number;
    data?: {
      message?: string;
      error?: string;
    };
  };
};

export const getApiErrorStatus = (error: unknown) => {
  return (error as ApiErrorPayload)?.response?.status;
};

export const getErrorMessage = (error: unknown, fallback: string) => {
  const payload = error as ApiErrorPayload;
  const message = payload?.response?.data?.message ?? payload?.response?.data?.error;

  return typeof message === "string" && message.trim() ? message : fallback;
};
