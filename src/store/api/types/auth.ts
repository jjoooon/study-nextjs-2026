export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface RefreshTokenInput {
  refreshToken: string;
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateProfileInput {
  name?: string;
  email?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role?: string;
  };
}
