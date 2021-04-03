export interface User {
    login: string;
    password: string;
    age: number;
}

export interface UserFull extends User {
    isDeleted: boolean;
    id: string;
}

export interface ParamsWithId {
    id: string;
}

export interface ParamsWithFilter {
    filter: string;
    limit?: string;
}