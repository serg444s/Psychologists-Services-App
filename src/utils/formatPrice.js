export function formatPrice(amount) {
    let formattedPrice = amount.toFixed(2);
    return `€${formattedPrice}`;
}