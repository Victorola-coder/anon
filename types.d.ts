// define your mf types here

declare module "aos";

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
