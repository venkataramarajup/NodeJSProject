module.exports = ((temp,data) => {
    let output = temp.replace(/{%product_name%}/g, data.productName)
    output = output.replace(/{%product_image%}/g, data.image)
    output = output.replace(/{%product_from%}/g, data.from)
    output = output.replace(/{%product_nutrient%}/g, data.nutrients)
    output = output.replace(/{%product_quantity%}/g, data.quantity)
    output = output.replace(/{%product_price%}/g, data.price)
    output = output.replace(/{%product_description%}/g, data.description)
    output = output.replace(/{%product_id%}/g, data.id)
    if(!data.organic) output = output.replace(/{%product_organic%}/g, 'not-organic')
    return output
})