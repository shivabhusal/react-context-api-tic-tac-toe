import React from 'react';
import SquareContext from './contexts'

// <!-- Since Squares are gonna have synamic value and events and gonna repeat -->
// <!-- We are going to create a separate component -->

export default function Square(props) {
    return (
        <SquareContext.Consumer>
            {
                ({state, handler}) => (
                    <div className="square" onClick={handler}>{state.squares[props.index]}</div>
                )

            }

        </SquareContext.Consumer>
    )
}
