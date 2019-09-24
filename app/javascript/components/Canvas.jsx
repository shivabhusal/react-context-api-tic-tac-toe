import React from 'react';
import Alert from './bootstrap/Alert';
import NavBar from './bootstrap/NavBar';
import Square from './Square';
import SquareContext from './contexts';


const DefaultCanvasState = {
    players: [
        {name: 'Emma', symbol: 'X', avatar: 'https://image.shutterstock.com/image-photo/beautiful-woman-face-closeup-beauty-260nw-1403676473.jpg'},
        {name: 'Lisa', symbol: 'O', avatar: 'https://static3.bigstockphoto.com/8/7/2/large1500/278719948.jpg'}],
    gameOver: true,
    nextTurn: 0,
    squares: Array(9).fill('X')
};


export default class Canvas extends React.Component {
    state = DefaultCanvasState;
    squareParam = {state: this.state, handler: this.playHandler};

    playHandler() {

    }

    render = () => (
        <React.Fragment>
            <NavBar user={this.state.players[0]}/>
            <Alert/>
            <div className="container p-5 text-center">
                <h6><span className="font-weight-bold">{this.state.players[this.state.nextTurn].name}</span> has next
                    turn to play!</h6>
                <div className="mt-4 row">
                    <div className="col-sm-4">
                        <h2>Player1</h2>
                        <h3>{this.state.players[0].name}</h3>
                        {this.drawTurnPen(0)}
                    </div>

                    <div className="col-sm-4">
                        <div className="canvas d-flex flex-wrap mx-auto">
                            <SquareContext.Provider value={this.squareParam}>
                                {this.genSquares()}
                            </SquareContext.Provider>
                            {this.drawPlayAgain()}
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <h2>Player2</h2>
                        <h3>{this.state.players[1].name}</h3>
                        {this.drawTurnPen(1)}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );


    drawTurnPen = (playerIndex = 0) => {
        if (this.state.nextTurn == playerIndex) {
            return (
                <i className="fas fa-pen-fancy fa-5x  text-success border rounded-circle"></i>
            )
        }
    };

    genSquares = () => (
        this.state.squares.map((_data, index) => (
            <Square index={index} key={index}/>

        ))
    );

    drawPlayAgain = () => {
        if (this.state.gameOver) {
            return (
                <button className="btn btn-primary mx-auto mt-4">
                    <i className="fas fa-redo"></i>
                    &nbsp;Play Again
                </button>)
        }
    }

    toggleSquare = () => {

    }
}