export interface IContactList{
    id: number;
    name: string;
    surname: string | null;
    phoneNumber: string | null;
    email: string | null;
    isFavorite: boolean;
}