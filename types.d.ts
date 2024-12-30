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
  options: PollOption[];
  totalVotes: number;
  status: "active" | "ended";
  createdAt: string;
  endsAt?: string;
}
