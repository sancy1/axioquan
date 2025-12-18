
// /types/auth.ts
// # Authentication type definitions

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordResetRequestData {
  email: string;
  ipAddress?: string | null; // Allow null;
  userAgent?: string | null; // Allow null;
}

export interface PasswordResetConfirmData {
  token: string;
  newPassword: string;
  confirmPassword: string;
  ipAddress?: string | null; // Allow null
  userAgent?: string | null; // Allow null
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  name: string;
  image?: string;
  roles: string[];
  primaryRole: string;
}

export interface AuthSession {
  user: AuthUser;
  expires: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: AuthUser;
  errors?: string[];
}

export interface DeleteAccountResponse {
  success: boolean;
  message: string;
  errors?: string[];
}

export interface PasswordResetResponse {
  success: boolean;
  message: string;
  errors?: string[];
}

export interface TokenValidationResponse {
  isValid: boolean;
  message: string;
  user?: { id: string; email: string; name: string };
}