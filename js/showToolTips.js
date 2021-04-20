export default

// FUNCTION SHOW TOOL TIPS
function showTooltTips(nodeList) {
	let arr = [...nodeList];
	let span = document.createElement('span');
	span.classList.add('tool-tip');
	
	for (let i = 0; i < arr.length; i++) {
		arr[i].addEventListener('mouseenter', function () {
			arr[i].previousElementSibling.previousElementSibling.style.cssText = `
			opacity: 1;
			right: -16px;
			`;
		});
		
		arr[i].addEventListener('mouseleave', function () {
			arr[i].previousElementSibling.previousElementSibling.style.cssText = `
			opacity: 0;
			right: -36px;
			`;
		});
	}
}