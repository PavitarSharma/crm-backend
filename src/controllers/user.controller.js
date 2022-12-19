export const signUp = async (req, res, next) => {
    try {
        console.log(req.body)
        res.send(req.body)

    }catch(error) {}
}