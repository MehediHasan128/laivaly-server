export interface TUser {
    userName: string;
    userEmail: string;
    userProfileURL: string;
    password: string;
    role: 'admin' | 'staff' | 'customer';
    status: 'active' | 'pending' | 'banned';
}