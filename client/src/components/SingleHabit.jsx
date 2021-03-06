import React, { Component } from 'react'
import axios from 'axios'



export default class SingleHabit extends Component {
    state = {
        changeHabit: {
            habitId: '',
            habit: '',
            expectedTimesPerDay: '',
            difficulty: '',
            totalTimesCompleted: '',
            potentialPoints: '',
            pointsEarned: ''
        },
        editHabit: false,

    }

    componentDidMount() {
        const prevState = { ...this.state }
        prevState.changeHabit = this.props
        this.setState(prevState)
        console.log(this.props)
        console.log(this.state)
    }
    onChangeToHabit = (event) => {
        const newChangeHabit = { ...this.state.changeHabit }
        const currentHabit = event.target.value
        newChangeHabit.habit = currentHabit
        this.setState({ changeHabit: newChangeHabit })
    }

    onChangeToTimesExpected = (event) => {
        const newChangeHabit = { ...this.state.changeHabit }
        const currentTimesExpected = event.target.value
        newChangeHabit.expectedTimesPerDay = currentTimesExpected
        this.setState({ changeHabit: newChangeHabit })
    }

    onChangeToDifficulty = (event) => {
        const newChangeHabit = { ...this.state.changeHabit }
        const currentDifficulty = event.target.value
        newChangeHabit.difficulty = currentDifficulty
        this.setState({ changeHabit: newChangeHabit })
    }

    onChangeToTimesCompleted = (event) => {
        const newChangeHabit = { ...this.state.changeHabit }
        const currentTimesCompleted = event.target.value
        newChangeHabit.totalTimesCompleted = currentTimesCompleted
        this.setState({ changeHabit: newChangeHabit })
    }

    changeSingleHabit = (event) => {
        event.preventDefault()
        const { refreshHabits } = this.props
        const { habitId } = this.state.changeHabit
        axios.put(`/api/habit/${habitId}`, this.state.changeHabit)
            .then(() => {
                refreshHabits()
            })
    }

    toggleEditForm = () => {
        const editHabit = !this.state.editHabit
        this.setState({ editHabit })
    }

    onClickPlus = () => {
        document.getElementById("totalTimesCompleted").stepUp(5)
    }



    render() {
        const {
            habitId,
            habit,
            expectedTimesPerDay,
            difficulty,
            onHabitDeleteClick,
            totalTimesCompleted,
            potentialPoints,
            pointsEarned,
            pointsEarnedCalc,
            potentialPointsCalc,
        } = this.props

        return (
            <div key={habitId} className="item">
                <div>
                    <h1 className="name">{habit}  <i className="material-icons  edit"
                        onClick={() => this.toggleEditForm()}>
                        edit
            </i></h1>
                    <h2>Difficulty: {difficulty}</h2>
                    {this.state.editHabit ?
                        <form onSubmit={this.changeSingleHabit}>
                            <label for="habit">Habit Name</label>
                            <input
                                type="String"
                                placeholder="Habit"
                                id="habit"
                                value={this.state.changeHabit.habit}
                                onChange={this.onChangeToHabit} />
                            <label for="expected">Expected Times</label>
                            <input
                                type="Number"
                                placeholder="Times Expected"
                                id="expected"
                                value={this.state.changeHabit.expectedTimesPerDay}
                                onChange={this.onChangeToTimesExpected} />
                            <label for="difficulty">Difficulty</label>
                            <input
                                type="Number"
                                id="difficulty"
                                placeholder="Difficulty"
                                value={this.state.changeHabit.difficulty}
                                onChange={this.onChangeToDifficulty} />
                            <input type="Submit" value="Save Changes" />
                        </form> : null}

                    <form onSubmit={this.changeSingleHabit}>
                        <input
                            type="Number"
                            id="totalTimesCompleted"
                            placeholder="Reps"
                            value={this.state.changeHabit.totalTimesCompleted}
                            onChange={this.onChangeToTimesCompleted} />

                        <input type="Submit" value="Add Completions" />
                    </form>
                </div>
                <div>
                    <h1> {pointsEarnedCalc(difficulty, totalTimesCompleted, expectedTimesPerDay)}/{potentialPointsCalc(difficulty)}</h1>
                    <h1>Points</h1>
                </div>
                <i className="material-icons delete"
                    onClick={() => onHabitDeleteClick(habitId)}>
                    clear
            </i>
            </div>
        )
    }
}
