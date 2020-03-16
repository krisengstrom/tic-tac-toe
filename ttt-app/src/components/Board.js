import React from 'react';

class App extends React.Component {

	constructor(props) {
		super(props);
		
		let coords = new Array(9).fill().map((e,i) => {
			return {id: i+1, player: null}
		});
		this.state = {
			coords: coords,
			currentPlayer: 'X',
			winner: null
		}
	}

	nextPlayer() {
		this.setState({
			currentPlayer: (this.state.currentPlayer == 'X') ? 'O' : 'X'
		});
	}

	takePosition(id) {

		if (this.state.winner)
			return;

		let curr = this.state.coords;
		for (let pos of curr) {
			if (pos.id == id && pos.player === null) {
				pos.player = this.state.currentPlayer;

				this.setState({
					coords: curr
				});
				this.nextPlayer();
			}
		}

		console.log(this.state.coords);
		this.checkForWin();
		
	}

	checkForWin() {
		const combos = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
			[1, 4, 7],
			[2, 5, 8],
			[3, 6, 9],
			[1, 5, 9],
			[3, 5, 7]
		];

		for (let combo of combos) {
			if (
				this.state.coords[combo[0] -1].player !== null && 
				this.state.coords[combo[0] -1].player === 
				this.state.coords[combo[1] -1].player && 
				this.state.coords[combo[0] -1].player === 
				this.state.coords[combo[2] -1].player
			) {
				console.log('win');

				let curr = this.state.coords;
				for (let pos of curr) {
					if (combo.indexOf(pos.id) > -1) {
						pos.winningTile = true;
					}
				}

				this.setState({
					winner: this.state.coords[combo[0] -1].player,
					coords: curr
				});
				break;
			}
		}
	}

	getIcon(player) {
		if (player == 'O') {
			return 'far fa-circle';
		} else if (player == 'X') {
			return 'fas fa-times';
		} else {
			return 'fas fa-coffee';
		}
	}

	render() {
		return (
			<div className={`board ${this.state.winner ? "finished" : ""}`}>
				{this.state.coords.map(position => (
					<div key={position.id} className={`position ${position.winningTile ? "winning" : ""}`} onClick={() => {this.takePosition(position.id)}}>
						<i className={`${this.getIcon(position.player)}`}></i>
					</div>
				))}
			</div>
		)
	}

}

export default App;
