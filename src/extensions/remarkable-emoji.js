import gemoji from 'gemoji';

const getEmoji = (moji) => {
	try {
		return gemoji.name[moji].emoji;
	} catch(err) {
		return '';
	}
};

export default (md, opts) => {
	md.inline.ruler.push('emoji', EmojiRule);
};

// 0x3A == 58 == :
const EmojiRule = (state, silent) => {
	let start;
	let max;
	let marker;
	let matchStart;
	let matchEnd;
	let pos = state.pos;
	let ch = state.src.charCodeAt(pos);

	if (ch !== 0x3A) {
		return false;
	}

	start = pos;
	pos++;
	max = state.posMax;

	while (pos < max && state.src.charCodeAt(pos) === 0x3A) {
		pos ++;
	}

	marker = state.src.slice(start, pos);

	matchStart = matchEnd = pos;

	while ((matchStart = state.src.indexOf(':', matchEnd)) !== -1) {
		matchEnd = matchStart + 1;

		while(matchEnd < max && state.src.charCodeAt(matchEnd) === 0x3A) {
			matchEnd++;
		}

		if (matchEnd - matchStart === marker.length) {
			if (!silent) {
				let slice = state.src.slice(pos, matchStart);
				state.push({
					type: 'text',
					content: slice.replace(/.+/g, getEmoji(slice)).trim(),
					block: false,
					level: state.level
				});
			}
			state.pos = matchEnd;
			return true;
		}
	}

	if (!silent) {
		state.pending += marker;
	}

	state.pos += marker.length;

	return true;
};
