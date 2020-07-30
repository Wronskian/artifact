import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var artifactWidth  = 25;
var artifactHeight = 25;
var pixelCount = artifactHeight*artifactWidth;

var colorList = ['#fff','#f00', '#ff9d00', '#ff0', '#0f0', '#00f', '#a600ff', '#000'];
var selectedColor = '#000';

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
		pixels[i] = selectedColor;
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

// =============================================

class Palette extends React.Component {
	constructor(props) {
		super(props);
		this.state = { palette: colorList,
		};
	}

	renderInkwell(i) {
		return (
			<Inkwell 
				index = {i}
				color = {this.state.palette[i]}
				onClick = {() => this.handleClick(i)}
			/>
		);
	}

	handleClick(i) {
		selectedColor = this.state.palette[i];
	}

	render() {
		const palette = [];
		for (let i=0; i<this.state.palette.length; i++) {
			palette.push(this.renderInkwell(i))
		}
		return (
			<div className="palette">
				{palette}
			</div>
		);
	}
}

function Inkwell(props) {
	return (
		<button className="inkwell" index={props.index} onClick={props.onClick} style={{backgroundColor: props.color}} />
	);
}

// ========================================

class ArtifactEditor extends React.Component {
	render() {
		return(
			<div className="artifactEditor">
				<Artifact />
				<Palette />
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
  <ArtifactEditor />,
  document.getElementById('root')
);