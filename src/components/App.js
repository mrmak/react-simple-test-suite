import React, { Component } from 'react';
import TestPanel from './TestPanel';
import '../styles/App.css';

function generateTest(description, id, baseDelay = 5000) {
	return {
		description,
		id,
		running: false,
		didPass: null,
		count: 0,
		numSuccess: 0,
		lastRunTime: null,
		run() {
			const delay = baseDelay + Math.random() * baseDelay;
			const testPassed = Math.random() > 0.5;
			return new Promise(function(resolve) {
				setTimeout(function() {
					resolve(testPassed);
				}, delay);
			});
		},
	}
}

class App extends Component {
	state = {
		tests: [
			generateTest('System Status', 'unique_key1'),
			generateTest('Server1 Status', 'unique_key2'),
			generateTest('Server2 Status', 'unique_key3'),
			generateTest('Server3 Status', 'unique_key4'),
			generateTest('Server4 Status', 'unique_key5'),
			generateTest('Server5 Status', 'unique_key6'),
		],
	};

	getTestAndIndex(id, tests) {
		const index = tests.findIndex(obj => obj.id === id);
		const test = tests[index];
		return {index, test};
	}

	runAllTests() {
		this.state.tests.forEach(({id}) => this.runTest(id));
	}

	runTest(id){
		const {tests} = this.state;
		let {index, test} = this.getTestAndIndex(id, tests);
		if (test.running) {
			return console.log(`Test: ${id} is already running`);
		}
		let timeStarted = new Date();
		test = {...test};
		test.running = true;
		tests[index] = test;
		this.setState({tests});
		test.run().then((response) => {
			const timeEnded = new Date();
			const runTime = (timeEnded.getTime() - timeStarted.getTime()) / 1000;
			this.setState((state) => {
				const {tests} = state;
				let {index, test} = this.getTestAndIndex(id, tests);
				test = {...test};
				test.count++;
				test.didPass = response;
				test.numSuccess = response ? test.numSuccess + 1 : false;
				test.lastRunTime = runTime;
				test.running = false;
				tests[index] = test;
				return {tests}
			});
		});
	}

	handleAllTestsClick = (event) => {
		event.preventDefault();
		this.runAllTests();
	};

	handleTestClick = (event, id) => {
		event.preventDefault();
		this.runTest(id);
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">System Test Dashboard</h1>
					<button onClick={this.handleAllTestsClick} >Run All Tests</button>
				</header>
				<div className="test-container">
					{this.state.tests.map(props => <TestPanel {...props} key={props.id} onClick={this.handleTestClick} />)}
				</div>
			</div>
		);
	}
}

export default App;
