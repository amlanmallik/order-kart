module.exports = () => {
    const errorLogObj = (source, error) => {
        try {
            return {
                source: source,
                error: error
            }
        } catch (err) {
            console.log('\nCore logger error :: \n', err);
        }
    }
    return { errorLogObj }
}