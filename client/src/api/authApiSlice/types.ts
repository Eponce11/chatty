export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  username: string;
  token: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}


