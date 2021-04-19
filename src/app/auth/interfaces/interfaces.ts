export interface AuthResponse {
    ok: boolean;
    name?: string;
    msg?: string;
    token?: string;
}

export interface Usuario {
    user_id?: string;
    name: string;
    email?: string;
}