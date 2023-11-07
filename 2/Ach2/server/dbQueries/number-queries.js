const pool = require('../db-connector');

const isExists = (num) => {
    return new Promise((resolve, reject) => {
        pool.query("select count(1) " +
                    "from (select number from nums " +
                    "where number=$1 " +
                    "union " +
                    "select number from nums " +
                    "where number=$1 + 1 " +
                    ") subq", [num],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows[0]);
                }
            })
    })
}

const addNumber = (num) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO public.nums (number, current_ts) VALUES ($1, DEFAULT)", [num],
            (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve("Число успешно добавлено!");
            }
            })
    })
}

module.exports = {
    isExists,
    addNumber
}