export const calculateAmount = (data, wage) => {
    let totalAmount = wage;
    data.forEach(d => {
         totalAmount = totalAmount + d.quantity * d.medicine_unit.price
    });
    console.log(totalAmount)
    return totalAmount;
}