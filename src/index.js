import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var artifactWidth  = 10;
var artifactHeight = 10;
var pixelCount = artifactHeight*artifactWidth;

class Artifact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {pixels: Array(pixelCount).fill('#fff'),
					  width: artifactWidth,
					  height: artifactHeight,
					  count: pixelCount,
		};
	}

	handleClick(i) {
		const pixels = this.state.pixels.slice();
		pixels[i] = ((this.state.pixels[i] === '#fff') ? '#000' : '#fff');
		this.setState({
			pixels: pixels,
		})
	}

	renderPixel(i) {
		return (
			<Pixel
				index   = {i}
				color   = {this.state.pixels[i]}
				onClick = {() => this.handleClick(i)}
			/>
		);
	}

	renderPixelRow(i) {
		const pixelRow = []
		const startPixel = i*this.state.width;
		const endPixel = this.state.width*i+this.state.width-1;
		for (let r=startPixel; r<endPixel; r++) {
			pixelRow.push(this.renderPixel(r))
		}

		return (
			<div className="pixelRow">
				{pixelRow}
			</div>
		);
	}
	
	render() {
		const artifact = []
		const endRow = this.state.height;
		for (let i=0; i<endRow; i++) {
			artifact.push(this.renderPixelRow(i))
		}
		return (
			<div className="artifact">
				{artifact}
			</div>
		);
	}
}

function Pixel(props) {
	return (
		<button className="pixel" index={props.index} onClick={props.onClick} style={{backgroundColor: props.color}} />
	);
}

// ========================================

ReactDOM.render(
  <Artifact />,
  document.getElementById('root')
);