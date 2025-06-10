export interface LoginResponse{
    fullName: string | null;
    email: string;
    roles: string[];
    token: string;
}