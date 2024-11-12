/**
 * Conver a price from cents (the way it is stored in the database) to dollars. Allows for the price to be formatted as a currency. Price as a float will have a precision of 2 decimal places.
 * @param {int} price - The price in cents.
 * @param {boolean} [format=false] - Whether or not to format the price as a currency. Defaults to false.
 *
 * @returns {string | number} - The price in dollars. Formatted as a currency if format is true.
 */
export function getPrice(price: number, format: boolean = false): string | number {
	let floatPrice = price / 100;

	if (format) {
		return floatPrice.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD'
		});
	}

	return floatPrice.toFixed(2);
}
