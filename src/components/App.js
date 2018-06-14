import React, { Component } from 'react';
import TestPanel from './TestPanel';
import '../styles/App.css';

function generateTest(baseDelay = 5000) {
	return function runTest() {
		const delay = baseDelay + (Math.random() * baseDelay);
		const testPassed = Math.random() > 0.5;

		return new Promise(function(resolve) {
			setTimeout(function() {
				resolve(testPassed);
			}, delay);
		});
	};
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			tests: [
				{description: 'System Status',  id: 'unique_key1', didPass: null, count: 0, numSuccess: 0, lastRunTime: null, run: generateTest()},
				{description: 'Server1 Status', id: 'unique_key2', didPass: null, count: 0, numSuccess: 0, lastRunTime: null, run: generateTest()},
				{description: 'Server2 Status', id: 'unique_key3', didPass: null, count: 0, numSuccess: 0, lastRunTime: null, run: generateTest()},
				{description: 'Server3 Status', id: 'unique_key4', didPass: null, count: 0, numSuccess: 0, lastRunTime: null, run: generateTest()},
				{description: 'Server4 Status', id: 'unique_key5', didPass: null, count: 0, numSuccess: 0, lastRunTime: null, run: generateTest()},
				{description: 'Server5 Status', id: 'unique_key6', didPass: null, count: 0, numSuccess: 0, lastRunTime: null, run: generateTest(),},
			],
		};
	}
	runAllTests(){
		// Run any test that is currently not running
		const runTestButtons = document.getElementsByClassName('test-button');

		for (let i = 0; i < runTestButtons.length; i++){
			if (!runTestButtons[i].disabled){
				runTestButtons[i].click();
			}
		}
	}
	handleClick(e, id){
		const testIndex = this.state.tests.findIndex(obj => obj.id === id);
		this.runTest(this.state.tests[testIndex].run, testIndex, e.target);
	}
	runTest(func, index, button){
		const test = func;

		this.toggleTestButtonStatus(button);
		let timeStarted = new Date();
		test().then((response) => {
			let timeEnded = new Date();
			let runTime = (timeEnded.getTime() - timeStarted.getTime()) / 1000;
			this.setState((prevState) => {
				let testObj = prevState.tests;
				let thisTestObj = {...testObj[index]}
				thisTestObj.count++;
				thisTestObj.didPass = response;
				thisTestObj.numSuccess = response ? thisTestObj.numSuccess++ : false;
				thisTestObj.lastRunTime = runTime;
				testObj[index] = thisTestObj;
				return {
					tests: testObj,
				}
			});
			this.toggleTestButtonStatus(button);
		});
	}
	toggleTestButtonStatus(button){
		button.disabled = button.disabled ? false : true;
		button.innerHTML = button.innerHTML === 'Run' ? 'Running...' : 'Run';
	}
	render() {
		const testPanels = [];
		const tests = this.state.tests;
		console.log(tests);
		for (let i = 0; i < tests.length; i += 1) {
			const { description, id, didPass, lastRunTime, count, numSuccess } = tests[i];
			testPanels.push(<TestPanel 
				key={id}
				id={id}
				description={description}
				didPass={didPass}
				lastRunTime={lastRunTime}
				count={count}
				numSuccess={numSuccess}
				onClick={e => { this.handleClick(e, id); }}
			/>);
		}
		
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">System Test Dashboard</h1>
					<button onClick={() => { this.runAllTests(); }} >Run All Tests</button>
				</header>
				<div className="test-container">
					{ testPanels }
				</div>
			</div>
		);
	}
}

export default App;
