export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  username: string;
  token: string;
  profilePicture: string | null;
}

export interface RegisterCredentials {
  email: string;
  displayName?: string;
  username: string;
  password: string;
  dob: string;
  profilePicture: string | null;
}

export interface RegisterResponse {
  id: string;
  username: string;
  token: string;
}
