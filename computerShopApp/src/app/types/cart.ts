import { Product } from "./product";

export interface Cart {
    products: Product,
    countProduct: number,
    total: number,
    _createdOn: string,
    _id: string,
    _ownerId: string
}
