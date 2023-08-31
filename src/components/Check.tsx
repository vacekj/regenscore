import React from 'react';

const CheckedIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1.5" y="1.5" width="21" height="21" rx="10.5" fill="#01966B" />
    <path
      d="M15.3333 9.5L10.75 14.0833L8.66663 12"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="1.5"
      y="1.5"
      width="21"
      height="21"
      rx="10.5"
      stroke="#C2ECBF"
      strokeWidth="3"
    />
  </svg>
);

const InProgressIcon = (props: React.HTMLProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="12" cy="12" r="11" stroke="#C2ECBF" strokeWidth="2" />
    <circle
      cx="12"
      cy="12"
      r="6"
      fill="#01966B"
      stroke="#01966B"
      strokeWidth="2"
    />
  </svg>
);

const NotStarted = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="11" stroke="#B4B4B4" strokeWidth="2" />
  </svg>
);

const ExclamationIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 16 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.99967 8.33301V10.9997M7.99967 13.6663H8.00634M14.6663 10.9997C14.6663 14.6816 11.6816 17.6663 7.99967 17.6663C4.31778 17.6663 1.33301 14.6816 1.33301 10.9997C1.33301 7.31778 4.31778 4.33301 7.99967 4.33301C11.6816 4.33301 14.6663 7.31778 14.6663 10.9997Z"
      stroke="#354728"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ExclamationIconTwo = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z"
      fill="#354728"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8 13C7.72386 13 7.5 12.7761 7.5 12.5L7.5 6.5C7.5 6.22386 7.72386 6 8 6C8.27614 6 8.5 6.22386 8.5 6.5L8.5 12.5C8.5 12.7761 8.27614 13 8 13Z"
      fill="#354728"
    />
    <circle cx="8" cy="4" r="1" fill="#354728" />
  </svg>
);

const CrossIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
      stroke="#B4B4B4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Status =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "SUCCESS"
  | "WARNING"
  | "ERROR"
  | "WARNING2"
  | "GTCLOGO"
  | "GIVETHLOGO"
  | "OPLOGO"
  | "ETHLOGO";

type CheckProps = {
  status: Status;
};

export function Check(props: CheckProps) {
  if (props.status === 'SUCCESS') {
    return <CheckedIcon />;
  } else if (props.status === 'IN_PROGRESS') {
    return <InProgressIcon />;
  } else if (props.status === 'NOT_STARTED') {
    return <NotStarted />;
  } else if (props.status === 'ERROR') {
    return <CrossIcon />;
  } else if (props.status === 'WARNING') {
    return <ExclamationIcon />;
  } else if (props.status === "WARNING2") {
    return <ExclamationIconTwo />;
  }
}
