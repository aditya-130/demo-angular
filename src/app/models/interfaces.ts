export interface AppUser{
    name: string;
    email:string;
    isAdmin: boolean;
}

export interface Category{
    name: string
}

export interface Product{
    title: string,
    price: number,
    category: string,
    imageUrl: string
}