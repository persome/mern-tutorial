const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

// @desc Get goals
// @route GET /api/goals
// @ access Private
// when we use mongoose to interact with the database we get a promise, so we use async await. we need to install an npm package called express-async-handler
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()

    res.status(200).json(goals);
})




// @desc Set goals
// @route POST /api/goals
// @ access Private
const setGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.create({
        text: req.body.text,
    })

    res.status(200).json(goal);

    if (req.body) {
        // 400 status means a bad request
        res.status(400)
        // This is a built in express error handler
        throw new Error('Please add a text field')
    }

})




// @desc Update goals
// @route PUT /api/goals/:id
// @ access Private
const updateGoals = asyncHandler(async (req, res) => {
    // Gets the goal
    const goal = await Goal.findById(req.params.id)
    // Updates the goal
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal);

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
})




// @desc Delete goals
// @route DELETE /api/goals/:id
// @ access Private
const deleteGoals = asyncHandler(async (req, res) => {
    // Gets the goal
    const goal = await Goal.findById(req.params.id)
    // Removes the goal
    await goal.remove()

    res.status(200).json({ id: req.params.id });


    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
})



module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}

