import db from '../models/index';

let getAllLoans = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let loans = await db.Loans.findAll();

            resolve(loans);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewLoan = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Loans.create({
                loan_day: data.loan_day,
                due_day: data.due_day,
                book_id: data.book_id,
                user_id: data.user_id,
            })

            resolve({
                errCode: 0,
                message: 'OK'
            });
        } catch (e) {
            reject(e);
        }
    })
}

let updateLoanReturnDay = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            let loan = await db.Loans.findOne({
                where: { id: data.id },
                raw: false
            });

            if (loan) {
                loan.return_day = data.return_day;

                await loan.save();

                resolve({
                    errCode: 0,
                    message: 'Update loan success'
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Loan not found"
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let findLoanById = (loanId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let loan = await db.Loans.findOne({
                where: { id: loanId }
            })

            resolve(loan)
        } catch (e) {
            reject(e);
        }
    })
}

let getLoanByTitle = (loanTitle) => {
    return new Promise(async (resolve, reject) => {
        try {
            let loan = await db.Loans.findOne({
                where: { title: loanTitle }
            })

            resolve(loan);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllLoans: getAllLoans,
    createNewLoan: createNewLoan,
    updateLoanReturnDay: updateLoanReturnDay,
}