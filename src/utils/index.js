/**
 * Esta funcion calcula el precio total de la orden
 * @param {Array} products cartProduct:Array of Objects 
 * @returns {number} Total Price
 */
export const totalPrice= (products) =>{
    let sum = 0
    products.forEach(product => sum += product.price)
    return sum
}