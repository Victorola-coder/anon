// define your mf types here
declare module "aos";

declare module "*json";

declare module "*.svg" {
  const content: string;
  export default content;
}

interface SVGProps {
  className?: string;
  onClick?: () => void;
}

type Props = {
  show?: boolean;
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  loading?: boolean;
  noDefault?: boolean;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Poll {
  id: string;
  question: string;
  endsAt?: string;
  createdAt: string;
  totalVotes: number;
  options: PollOption[];
  status: "active" | "ended";
}

interface MessageOptions {
  expiresIn: string;
  password: string;
  hasImage: boolean;
  hasPassword: boolean;
  isTemporary: boolean;
  allowReplies: boolean;
  notifyOnRead: boolean;
  expirationTime?: string;
}

interface MessagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  imagePreview?: string | null;
  options: {
    isTemporary: boolean;
    expiresIn: string;
    hasPassword: boolean;
    allowReplies: boolean;
    expirationTime?: string;
  };
}

interface PasswordStrengthProps {
  password: string;
}

interface AnonymousPollFormProps {
  username: string;
}

interface ShareModalProps {
  url: string;
  isOpen: boolean;
  username: string;
  onClose: () => void;
}

interface Prompt {
  id: string;
  date: string;
  question: string;
  responses: number;
  expiresIn: string;
}
