type Letter = 'G' | 'H' | 'M' | 'T' | 'X' | 'Y' | 'Z' | 'F' | 'P' | 'L';
type Word = [Letter, number?];
type XYZF = { X?: number; Y?: number; Z?: number; F?: number };

export class GCode {
	#queue: string[] = [];

	#enqueue(words: Word[]) {
		this.#queue.push(
			words
				.filter(([, value]) => {
					return value !== undefined;
				})
				.map(([letter, value]) => {
					return `${letter}${value}`;
				})
				.join(' ')
		);

		return this;
	}

	/**
	 *
	 * @param code
	 * @param param1
	 * @returns
	 */
	#move(code: Word, { X = undefined, Y = undefined, Z = undefined, F = undefined }: XYZF) {
		return this.#enqueue([code, ['X', X], ['Y', Y], ['Z', Z], ['F', F]]);
	}

	/**
	 * G0: perform rapid linear movement.
	 * @param param0
	 * @returns
	 */
	G0({ X = undefined, Y = undefined, Z = undefined, F = undefined }: XYZF) {
		return this.#move(['G', 0], { X: X, Y: Y, Z: Z, F: F });
	}

	/**
	 *
	 * @param param0
	 * @returns
	 */
	G1({ X = undefined, Y = undefined, Z = undefined, F = undefined }: XYZF) {
		return this.#move(['G', 1], { X: X, Y: Y, Z: Z, F: F });
	}

	/**
	 *
	 * @param code
	 * @param subcode
	 * @returns
	 */
	#wcs(code: number, subcode: number) {
		return this.#enqueue([['G', 50 + code + subcode * 0.1]]);
	}

	G37() {
		return this.#enqueue([['G', 37]]);
	}

	G38(subcode: number = 0, { X = undefined, Y = undefined, Z = undefined, F = undefined }: XYZF) {
		return this.#enqueue([
			['G', 38 + subcode],
			['X', X],
			['Y', Y],
			['Z', Z],
			['F', F],
		]);
	}

	G43({ H, X = undefined, Y = undefined, Z = undefined }: { H: number; X?: number; Y?: number; Z?: number }) {
		return this.#enqueue([
			['G', 43],
			['H', H],
			['X', X],
			['Y', Y],
			['Z', Z],
		]);
	}

	G49() {
		return this.#enqueue([['G', 49]]);
	}

	G53() {
		return this.#wcs(3, 0);
	}

	G54(subcode: number = 0) {
		return this.#wcs(4, subcode);
	}

	G55(subcode: number = 0) {
		return this.#wcs(5, subcode);
	}

	G56(subcode: number = 0) {
		return this.#wcs(6, subcode);
	}

	G57(subcode: number = 0) {
		return this.#wcs(7, subcode);
	}

	G58(subcode: number = 0) {
		return this.#wcs(8, subcode);
	}

	G59(subcode: number = 0) {
		return this.#wcs(9, subcode);
	}

	G90() {
		return this.#enqueue([['G', 90]]);
	}

	G91() {
		return this.#enqueue([['G', 91]]);
	}

	toString() {
		return this.#queue.join(' ');
	}
}

export default GCode;
