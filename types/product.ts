 export type Product ={
    id: number,
    name: string,
    price: number,
    category: string,
    image: string,
    stock: number,
    unit: "г"|"мл"|"шт",
    value: number
}