import React from 'react';
import PropTypes from 'prop-types';
import '../styles/TestPanel.css';

const TestPanel = props => (
	<div className="test-panel">
		<p className="title">{props.description}</p>
		<p>Result: { props.didPass === null ? 'Awaiting test...' : props.didPass ? 'Passed' : 'Failed' }</p>
		<p>Tests Completed: { props.count }</p>
		<p>Tests Passed: { props.numSuccess }</p>
		<p>Run Time: { props.lastRunTime === null ? 'N/A' : props.lastRunTime + 's'}</p>
		<p>Success Rate: { isNaN(props.numSuccess/props.count) ? 0 : (props.numSuccess/props.count * 100).toFixed(2) }%</p>
		<button className="test-button" onClick={ (e) => { props.onClick(e, props.id); }}>Run</button>
	</div>
);

TestPanel.propTypes = {
	description: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default TestPanel;
