const CHART_COLORS = {
	red: 'rgb(255, 99, 132)',
	// add other colors if needed
  };
  
  const months = ({ count }: { count: number }) => {
	// return an array of month names
	// this is just a placeholder, replace with your actual implementation
	return Array(count).fill('January');
  };
  
  const numbers = (inputs: { min: number, max: number, count: number, decimals: number, continuity: number }) => {
	// return an array of random numbers based on the inputs
	// this is just a placeholder, replace with your actual implementation
	return Array(inputs.count).fill(Math.random() * (inputs.max - inputs.min) + inputs.min);
  };
  
  const transparentize = (color: string) => {
	// return a transparent version of the color
	// this is just a placeholder, replace with your actual implementation
	return color;
  };
  
  const Utils = {
	CHART_COLORS,
	months,
	numbers,
	transparentize,
  };
  
  export default Utils;
  