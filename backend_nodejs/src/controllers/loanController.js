import loanService from '../services/loanService';

let handleGetAllLoans = async (req, res) => {
    let loans = await loanService.getAllLoans();

    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        loans,
    })
}

let handleCreateNewLoan = async (req, res) => {
    let message = await loanService.createNewLoan(req.body);

    return res.status(200).json(message);
}

let handleUpdateLoanReturnDay = async (req, res) => {
    let data = req.body;
    if (!data) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        })
    }
    let message = await loanService.updateLoanReturnDay(data);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllLoans: handleGetAllLoans,
    handleCreateNewLoan: handleCreateNewLoan,
    handleUpdateLoanReturnDay: handleUpdateLoanReturnDay,
}