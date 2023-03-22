/**
 * 存储localStorage
 */
export const setStorage = (name, value) => {
	if (!name) return;
	if (typeof value !== 'string') {
		value = JSON.stringify(value);
	}
	window.localStorage.setItem(name, value);
}

/**
 * 获取localStorage
 */
export const getStorage = name => {
	if (!name) return;
	var value = window.localStorage.getItem(name);
	if (value !== null) {
		try {
			value = JSON.parse(value);
		} catch (e) {
			value = value;
		}
	}
	return value;
}

/**
 * 删除localStorage
 */
export const removeStorage = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
