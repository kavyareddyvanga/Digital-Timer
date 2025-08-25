
import React, {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isRunning: false,
    timeInSeconds: 25 * 60,
    timerLimit: 25,
    intervalId: null,
  }

  toggleStartPause = () => {
    const {isRunning, intervalId} = this.state
    if (isRunning) {
      clearInterval(intervalId)
      this.setState({isRunning: false, intervalId: null})
    } else {
      const newId = setInterval(this.decrementTime, 1000)
      this.setState({isRunning: true, intervalId: newId})
    }
  }

  decrementTime = () => {
    this.setState(prevState => {
      if (prevState.timeInSeconds === 0) {
        clearInterval(prevState.intervalId)
        return {isRunning: false, intervalId: null}
      }
      return {timeInSeconds: prevState.timeInSeconds - 1}
    })
  }

  resetTimer = () => {
    const {timerLimit, intervalId} = this.state
    clearInterval(intervalId)
    this.setState({
      isRunning: false,
      timeInSeconds: timerLimit * 60,
      intervalId: null,
    })
  }

  increaseLimit = () => {
    this.setState(prevState => {
      if (prevState.isRunning) return null
      return {
        timerLimit: prevState.timerLimit + 1,
        timeInSeconds: (prevState.timerLimit + 1) * 60,
      }
    })
  }

  decreaseLimit = () => {
    this.setState(prevState => {
      if (prevState.isRunning || prevState.timerLimit <= 1) return null
      return {
        timerLimit: prevState.timerLimit - 1,
        timeInSeconds: (prevState.timerLimit - 1) * 60,
      }
    })
  }

  getFormattedTime = () => {
    const {timeInSeconds} = this.state
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  render() {
    const {isRunning, timerLimit} = this.state
    const timerStatus = isRunning ? 'Running' : 'Paused'
    const playPauseIcon = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const playPauseIconAtt = isRunning ? 'pause icon' : 'play icon'
    const playPauseText = isRunning ? 'Pause' : 'Start'

    return (
      <div className="img">
        <div className="app-container">
          <h1 className="heading">Digital Timer</h1>

          <div className="timer-card">
            <div className="image">
              <div className="timer-circle">
                <h1 className="time-text">{this.getFormattedTime()}</h1>
                <p className="status-text">{timerStatus}</p>
              </div>
            </div>
            <div className="controls">
              <div className="buttons">
                <button className="btn" onClick={this.toggleStartPause}>
                  <img
                    src={playPauseIcon}
                    alt={playPauseIconAtt}
                    className="icon"
                  />
                  {playPauseText}
                </button>
                <button className="btn" onClick={this.resetTimer}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icon"
                  />
                  Reset
                </button>
              </div>
              <div className="limit-controls">
                <p className="limit-label">Set Timer limit</p>
                <div className="limit-box">
                  <button className="limit-btn" onClick={this.decreaseLimit}>
                    -
                  </button>
                  <p className="limit-value">{timerLimit}</p>
                  <button className="limit-btn" onClick={this.increaseLimit}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
