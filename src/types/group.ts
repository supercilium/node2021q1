export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface GroupInterface {
    id: string;
    name: string;
    permission: Array<Permission>;
}

export type GroupCreatingInterface = Pick<GroupInterface, 'name' | 'permission'>