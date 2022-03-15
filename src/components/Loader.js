import React from 'react';
import { SpinnerCircular } from 'spinners-react';

function Loader() {
	return <SpinnerCircular style={{ position: 'absolute', right: '0', marginRight: '20px' }} />;
}

export default Loader;
