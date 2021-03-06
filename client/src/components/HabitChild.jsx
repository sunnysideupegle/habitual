import React, { Component } from 'react'
import axios from 'axios'
import SingleHabit from './SingleHabit.jsx'
import { Link } from 'react-router-dom'
import { getAllHabits } from '../api/main.js'

export default class HabitChild extends Component {
    state = {
        newHabit: {
            habit: '',
            expectedTimesPerDay: '',
            difficulty: '',
            totalTimesCompleted: '',
            potentialPoints: '',
            pointsEarned: ''
        },
        createHabit: false,

    }

    componentDidMount() {
        getAllHabits()

            .then(() => {
                const { habitList } = this.props
                console.log(habitList)
                const { refreshComponent } = this.props
                refreshComponent()
            })

    }

    createNewHabit = (event) => {
        event.preventDefault()
        axios.post('/api/habit', this.state.newHabit)
            .then(() => {
                const { refreshComponent } = this.props
                refreshComponent()
            })
    }

    onCreateHabit = (event) => {
        const previousState = { ...this.state }
        const newHabitHabit = event.target.value
        previousState.newHabit.habit = newHabitHabit
        this.setState({ previousState })
    }

    onCreateTimesExpected = (event) => {
        const previousState = { ...this.state }
        const newHabitTimesExpected = event.target.value
        previousState.newHabit.expectedTimesPerDay = newHabitTimesExpected
        this.setState({ previousState })
    }

    onCreateDifficulty = (event) => {
        const previousState = { ...this.state }
        const newHabitDifficulty = event.target.value
        previousState.newHabit.difficulty = newHabitDifficulty
        this.setState({ previousState })
    }
    toggleCreateForm = () => {
        const createHabit = !this.state.createHabit
        this.setState({ createHabit })
    }

    render() {
        const {
            habitList,
            potentialPoints,
            pointsEarned,
            refreshComponent,
            onHabitDeleteClick,
            potentialPointsCalc,
            pointsEarnedCalc
        } = this.props

        const HabitListElements = habitList.map((habit) => {
            return (
                <SingleHabit
                    habitId={habit._id}
                    habit={habit.habit}
                    expectedTimesPerDay={habit.expectedTimesPerDay}
                    totalTimesCompleted={habit.totalTimesCompleted}
                    difficulty={habit.difficulty}
                    onHabitDeleteClick={onHabitDeleteClick}
                    refreshHabits={refreshComponent}
                    potentialPoints={potentialPoints}
                    pointsEarned={pointsEarned}
                    potentialPointsCalc={potentialPointsCalc}
                    pointsEarnedCalc={pointsEarnedCalc}
                    
                />
            )
        })
        return (
            <div className="habitchild-container">
                <h1 className="title-points">Today's Points:</h1>
                <h1 className="frac"><sup  >{pointsEarned}</sup>/<span >{potentialPoints}</span></h1>
                <div className="today-points">
                    <Link to={`/reward`}><button className="reward-button">Reward Yo' Self</button></Link>
                </div>
                <i className="material-icons  add"
                    onClick={() => this.toggleCreateForm()}>
                    add_circle_outline
            </i>
                {this.state.createHabit ?
                    <form onSubmit={this.createNewHabit} className="form-all">
                        <label for="habit">Add a Habit</label>
                        <input
                            type="string"
                            placeholder="New Habit"
                            id="habit"
                            name="newHabit.name"
                            value={this.state.newHabit.habit}
                            onChange={this.onCreateHabit} />
                        <label for="Texpected">How many times a day do you think you can realistically complete the habit each day?</label>
                        <input
                            type="number"
                            id="Texpected"
                            placeholder="Times Expected"
                            value={this.state.newHabit.expectedTimesPerDay}
                            onChange={this.onCreateTimesExpected} />
                        <label for="difficulty">How hard is it to make yourself do it on a scale of 1 to 10?</label>
                        <input
                            type="number"
                            id="difficulty"
                            placeholder="Difficulty"
                            value={this.state.newHabit.difficulty}
                            onChange={this.onCreateDifficulty} />
                        <input type="Submit" value="Make a New Habit!" />
                    </form> : null}
                <div className="habit-container">
                    {HabitListElements}
                </div>
            </div>
        )
    }
}
