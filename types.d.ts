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
  endsAt: string;
  createdAt: string;
  totalVotes: number;
  options: PollOption[];
  status: "active" | "ended";
}

interface MessageOptions {
  isTemporary: boolean;
  expirationTime?: string | Date;
  expiresIn: string;
  hasPassword: boolean;
  password: string;
  hasImage?: boolean;
  allowReplies: boolean;
  notifyOnRead: boolean;
  type: Message["type"];
}

interface MessagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  image?: string;
  options: MessageOptions;
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

interface Message {
  _id: string;
  content: string;
  creator: string;
  creatorName: string;
  type:
    | "anon"
    | "confession"
    | "3words"
    | "tbh"
    | "dealbreaker"
    | "pickupline"
    | "appreciation"
    | "feedback"
    | "question";
  isRead: boolean;
  isStarred: boolean;
  isTemporary?: boolean;
  expiresAt?: Date;
  image?: string;
  hasPassword: boolean;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  _id: string;
  username: string;
  age: number; // Validated 18+
  profileUrl?: string; // Display Picture URL

  // Optional fields (updateable via profile)
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

interface ContentViewerProps {
  type: "message" | "poll";
  data: Message | Poll;
  onDelete: (id: string) => void;
  onToggleStar?: (id: string) => void;
  onShare?: (id: string) => void;
}

interface Poll {
  id: string;
  question: string;
  options: Array<{
    id: string;
    text: string;
    votes: number;
  }>;
  totalVotes: number;
  createdAt: string;
  endsAt: string;
  status: "active" | "ended";
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data?: T;
}

interface AuthResponse
  extends ApiResponse<{
    user: User;
    token: string;
    refreshToken: string;
  }> {}

interface ResetPasswordResponse
  extends ApiResponse<{
    message: string;
  }> {}

interface AuthFormProps {
  route: "sign-in" | "sign-up";
}

interface FormErrors {
  username?: string;
  password?: string;
  age?: string;
}
