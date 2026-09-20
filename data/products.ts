import { Product } from "../types/product";


export const products: Product[] = [
    {
        id: 1,
        name: "Куриное филе",
        price: 349,
        category: "Мясо",
        image: "",
        stock: 8
    },

    {
        id: 2,
        name: 'Молоко простоквашино',
        price: 150,
        category: 'Молочка',
        image: "",
        stock: 10
    },

    {
        id: 3,
        name: 'Огурцы',
        price: 70,
        category: 'Овощи',
        image: "",
        stock: 20
    },

    {
        id: 4,
        name: 'Кока-кола',
        price: 160,
        category: 'Напитки',
        image: "",
        stock: 5
    },
    {
        id: 5,
        name: 'Слойка с творогом',
        price: 87,
        category: 'Выпечка',
        image: "",
        stock: 30
    }
]