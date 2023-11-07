const numberQueries = require("../dbQueries/number-queries");

class NumberController {
    async addNumber(req, res, next) {
        try {
            const {num} = req.body;
            const parsed = parseInt(num, 10)
            if (num === undefined || isNaN(parsed)) {
                return res.status(404).json({message: "No 'num' parameter specified or not digit!"})
            }

            const resp = await numberQueries.isExists(num)
            const count = parseInt(resp["count"], 10)

            if (count === 0) {
                await numberQueries.addNumber(num);
                const msg = "OK! Число успешно добавлено!";
                console.log(msg)
                return res.status(201).json({message: msg, num: parsed + 1});
            } else {
                const msg = "Не выполняется одно из условий задачи!"
                console.log(msg);
                return res.status(400).json({message: msg});
            }
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
}

module.exports = new NumberController()