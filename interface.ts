




interface Params {

    IsAvailable(product: Product) : Boolean;
}


interface Product {
    sku: string;
    stock: number;
}

function IsAvailable(product: Product): Boolean {

    if(product.stock > 0) return true
    else return false

    return product.stock > 0
}