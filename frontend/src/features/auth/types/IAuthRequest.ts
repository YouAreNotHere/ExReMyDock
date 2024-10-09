interface IAuthRequest {
  name: string;
  password: string;
}

interface IButtonProps {
  value: string;
  onClick?: () => void;
}

export type { IAuthRequest };
