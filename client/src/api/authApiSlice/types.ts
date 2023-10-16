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
  email: string;
  displayName?: string;
  username: string;
  password: string;
  dob: string;
}

export interface RegisterResponse {
  id: string;
  username: string;
  token: string;
}
