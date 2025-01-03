import { toast } from "sonner";

export const handleApiError = (error: unknown) => {
  const message =
    error instanceof Error
      ? error.message
      : "Something went wrong. Please try again.";

  toast.error(message);
  return message;
};
