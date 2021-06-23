const excludeAttr = { exclude: ['createdAt', 'updatedAt', 'status'] }
const includeAttr = ['quantity', 'orderId'];
module.exports = ({ db, logger: { errorLogObj } }) => {

    const checkOrders = (document) => {
        let checkObj = null;
        if (document && document.userId) {
            const { userId } = document;
            const filterObj = {
                userId: userId,
                status: true
            }
            checkObj = db['Orders'].findAll({
                where: filterObj,
                attributes: includeAttr
            })
        }
        else {
            throw { error: 'illegal arguments!' }
        }
        return checkObj;
    }

    const createOrder = (document) => {
        let updateObj = null;
        try {
            if (document && document.userId && document.itemId) {
                const { userId, itemId } = document;
                let updateParams = {
                    UserUserId: userId,
                    InventoryItemId: itemId,
                    quantity: document.quantity
                };
                updateObj = db['Orders'].create(updateParams);
            }
            else {
                throw { error: 'illegal arguments!' }
            }
        } catch (err) {
            throw err;
        }
        return updateObj;
    }

    // const updateInventory = () => {

    // }

    return { checkOrders, createOrder }
}