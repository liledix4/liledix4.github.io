function trigger(className, appendSelector) {
	let invervalMaxCount = prompt('How many blocks I should create?', 200)
	,	intervalTime = prompt('How often I should create blocks? (type in milliseconds)', 10)
	,	rowsCount = 20
	,	appendContent = `<div class="${className}"></div>`
	,	intervalCount = 0
	;

	parseInt(invervalMaxCount);
	
	function triggerAppend() {
		$(appendSelector).append(appendContent);
		intervalCount++;
		if (intervalCount == invervalMaxCount) {
			clearInterval(interval);
			}
		}

	let interval = setInterval(triggerAppend, intervalTime);
	}

trigger("black-block", "body");