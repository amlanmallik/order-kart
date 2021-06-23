const attr = { exclude: ['createdAt', 'updatedAt', 'status'] }
module.exports = ({ db, logger: { errorLogObj } }) => {
    const { Op } = db.Sequelize;
    const checkInventory = (document) => {
        let checkObj = null;
        try {
            if (document) {
                const filterObj = {
                    status: true
                }
                if (!document.seeAll) {
                    filterObj['quantity'] = { [Op.gt]: 0 }
                }
                if (document.itemId) {
                    filterObj['itemId'] = document.itemId;
                }
                checkObj = db['Inventory'].findOne({
                    where: filterObj,
                    attributes: attr
                })
            }
            else {
                checkObj = Promise.reject('illegal arguments!');
            }
        } catch (err) {
            throw err;
        }
        return checkObj;
    }

    const updateInventory = (document) => {
        let updateObj = null;
        try {
            if (document && document.itemId && document.quantity) {

            }
            else {
                updateObj = Promise.reject('illegal arguments!')
            }
        } catch (err) {
            throw err;
        }
    }


    return { checkInventory }
}