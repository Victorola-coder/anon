import { clsx } from "clsx";

export const EyeIcon = ({ className }: SVGProps) => {
  return (
    <svg
      className={clsx("stroke-gray-700", className)}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EyeSlashIcon = ({ className }: SVGProps) => {
  return (
    <svg
      className={clsx("stroke-gray-700", className)}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C21.2793 13.1682 20.8733 13.7343 20.3673 14.3714"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.50926 6.50902C4.97645 7.85872 3.78401 9.42971 2.42012 11.2868C2.28394 11.5025 2.21584 11.6103 2.17772 11.7766C2.14909 11.9015 2.14909 12.0985 2.17772 12.2234C2.21584 12.3897 2.28394 12.4975 2.42012 12.7132C3.54553 14.4952 6.89541 19 12.0004 19C14.0588 19 15.8319 18.2676 17.3191 17.3321"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5718 14.5715C13.8198 15.3235 12.7796 15.7931 11.6184 15.7931C9.53676 15.7931 7.85107 14.1074 7.85107 12.0258C7.85107 10.8646 8.32066 9.82439 9.07268 9.07237"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.2797 19.2796L4.72021 4.72021"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
