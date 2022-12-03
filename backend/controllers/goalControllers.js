const asyncHandler = require('express-async-handler')

// @desc Get goals
// @route GET /api/goals
// @ access Private
// when we use mongoose to interact with the database we get a promise, so we use async await. we need to install an npm package called express-async-handler
const getGoals = asyncHandler (async (req, res) => {
    res.status(200).json({ message: 'Get goals' });
})

// @desc Set goals
// @route POST /api/goals
// @ access Private
const setGoals =  asyncHandler (async (req, res) => {
    if(req.body) {
        // 400 status means a bad request
        res.status(400)
        // This is a built in express error handler
        throw new Error('Please add a text field') //START 30:10 MIN
    }

    res.status(200).json({ message: 'Set goals' });
})

// @desc GUpdate goals
// @route PUT /api/goals/:id
// @ access Private
const updateGoals =  asyncHandler (async (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` });
})

// @desc Delete goals
// @route DELETE /api/goals/:id
// @ access Private
const deleteGoals =  asyncHandler (async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` });
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals, 
}
