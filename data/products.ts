import { Product } from "../types/product";


export const products: Product[] = [
    {
        id: 1,
        name: "Куриное филе",
        price: 349,
        category: "Мясо",
        image: "",
        stock: 8,
        value: 500,
        unit: "г"
    },

    {
        id: 2,
        name: 'Молоко простоквашино',
        price: 150,
        category: 'Молочка',
        image: "",
        stock: 10,
        value: 500,
        unit: 'мл'
    },

    {
        id: 3,
        name: 'Огурцы',
        price: 70,
        category: 'Овощи',
        image: "",
        stock: 20,
        value: 10,
        unit: "шт"
    },

    {
        id: 4,
        name: 'Кока-кола',
        price: 160,
        category: 'Напитки',
        image: "",
        stock: 5,
        unit: 'мл',
        value: 250
    },
    {
        id: 5,
        name: 'Слойка с творогом',
        price: 87,
        category: 'Выпечка',
        image: "",
        stock: 30,
        unit: "шт",
        value: 1
    }
]