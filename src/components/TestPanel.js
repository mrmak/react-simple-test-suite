import React from 'react';
import PropTypes from 'prop-types';
import '../styles/TestPanel.css';

const TestPanel = ({id, running, description, didPass, count, numSuccess, lastRunTime, onClick}) => (
	<div className="test-panel">
		<p className="title">{description}</p>
		<p>Result: { running ? 'Awaiting result' : didPass === null ? 'Awaiting test...' : didPass ? 'Passed' : 'Failed' }</p>
		<p>Tests Completed: { count }</p>
		<p>Tests Passed: { numSuccess }</p>
		<p>Run Time: { lastRunTime === null ? 'N/A' : lastRunTime + 's'}</p>
		<p>Success Rate: { isNaN(numSuccess / count) ? 0 : (numSuccess / count * 100).toFixed(2) }%</p>
		<button className="test-button" disabled={running} onClick={(e) => onClick(e, id)}>
			{running ? 'Running...' : 'Run'}
		</button>
	</div>
);

TestPanel.propTypes = {
	description: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default TestPanel;
