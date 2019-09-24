import React from 'react';
import Alert from './bootstrap/Alert';
import NavBar from './bootstrap/NavBar';
import Square from './Square';
import SquareContext from './contexts';


const DefaultCanvasState = {
    players: [
        {
            name: 'Emma',
            symbol: 'X',
            avatar: 'https://image.shutterstock.com/image-photo/beautiful-woman-face-closeup-beauty-260nw-1403676473.jpg'
        },
        {name: 'Lisa', symbol: 'O', avatar: 'https://static3.bigstockphoto.com/8/7/2/large1500/278719948.jpg'}],
    gameOver: false,
    gamerSquares: [],
    winner: null,
    nextTurn: 0,
    lastMove: null,

    squares: Array(9).fill(null),

};


export default class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.playHandler = this.playHandler.bind(this);
        this.valid = this.valid.bind(this);
        this.invalid = this.invalid.bind(this);
        this.determineGameOver = this.determineGameOver.bind(this);

    }

    state = {...DefaultCanvasState, currentUser: DefaultCanvasState.players[0]};

    playHandler(squareId) {
        // validation if its permitted to click on this square
        if (this.invalid(squareId)) return;

        var squares = this.state.squares.slice(); // clones
        squares[squareId] = this.state.players[this.state.nextTurn].symbol;
        var nextTurn = this.state.nextTurn == 0 ? 1 : 0;
        var lastMove = squareId;
        var {gameOver,gamerSquares}  = this.determineGameOver(squares);
        var winner = gameOver ? this.state.nextTurn : null;
        this.setState({squares, nextTurn, lastMove, gamerSquares, gameOver, winner})
    }

    determineGameOver = (squares) => {
        var gameOver = false;
        var gamerSquares = [];
        var pattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        pattern.forEach((arr) => {
            if (squares[arr[0]] == squares[arr[1]] && squares[arr[1]] == squares[arr[2]] && squares[arr[2]] != null) {
                gameOver = true;
                gamerSquares = arr;
            }
        });
        return {gameOver, gamerSquares};
    };

    valid = (squareId) => {
        if (!this.state.gameOver && this.state.squares[squareId] == null)
            return true;
        return false
    };

    invalid = (squareId) => {
        return !this.valid(squareId);
    };

    renderHeader = () => {
        if (this.state.gameOver) {
            return (
                <h6>
                    <span className="font-weight-bold">!! {this.state.players[this.state.winner].name}</span>
                    &nbsp; won the game !!
                </h6>
            )
        } else (this.state.gameOver)
        {
            return (
                <h6>
                    <span className="font-weight-bold">{this.state.players[this.state.nextTurn].name}</span>
                    &nbsp;has next turn to play!
                </h6>
            )
        }
    };

    startOver = ()=>{
        this.setState(DefaultCanvasState);
    };

    render = () => (
        <React.Fragment>
            <NavBar user={this.state.currentUser}/>
            <Alert/>
            <div className="container p-5 text-center">
                {this.renderHeader()}

                <div className="mt-4 row">
                    <div className="col-sm-4">
                        <h2 className="badge badge-primary p-4 border rounded-circle">{this.state.players[0].symbol}</h2>
                        <h2>Player1</h2>
                        <h3>{this.state.players[0].name}</h3>
                        {this.drawTurnPen(0)}
                    </div>

                    <div className="col-sm-4">
                        <div className="canvas d-flex flex-wrap mx-auto">
                            <SquareContext.Provider value={{state: this.state, handler: this.playHandler}}>
                                {this.genSquares()}
                            </SquareContext.Provider>
                            {this.drawPlayAgain()}
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <h2 className="badge badge-primary p-4 border rounded-circle">{this.state.players[1].symbol}</h2>
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
                <button onClick={this.startOver} className="btn btn-primary mx-auto mt-4">
                    <i className="fas fa-redo"></i>
                    &nbsp;Play Again
                </button>)
        }
    };

}