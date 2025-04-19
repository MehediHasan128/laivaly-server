export type TUser = {
    userName: {
        firstName: string;
        lastName: string;
    };
    userEmail: string;
    password: string;
    profileImage: string;
    status: 'active' | 'inactive' | 'banned' | 'pending' | 'deleted';
    role: 'buyer' | 'admin';
    isDeleted: boolean;
};