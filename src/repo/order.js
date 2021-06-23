const attr = { exclude: ['createdAt', 'updatedAt', 'status'] }
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
                attributes: attr
            })
        }
        else {
            checkObj = Promise.reject('illegal arguments!');
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
                updateObj = Promise.reject('illegal arguments!');
            }
        } catch (err) {
            updateObj = Promise.reject('illegal arguments!');
        }
        return updateObj;
    }

    // const updateInventory = () => {

    // }

    return { checkOrders, createOrder }
}