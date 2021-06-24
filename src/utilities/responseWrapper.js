module.exports = () => {
    const wrapResponse = (data, error) => {
        try {
            return {
                data: data,
                error: error
            }
        } catch (err) {
            console.log('\nCore wrapper error :: \n', err);
        }
    }
    return { wrapResponse }
}