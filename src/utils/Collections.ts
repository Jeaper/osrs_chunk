/**
 * Created by jespe on 2019-02-14.
 */
module osrs_chunk.utils.collections {


	export function filledArray<T>(l : number, f? : T) : T[] {
		const ret = [];
		for (let i = 0; i < l; i++) {
			ret.push(f);
		}
		return ret;
	}

	export function swapMap(map : AnyMap) : AnyMap {
		// Flips the key value pair of a map.
		const ret : AnyMap = {};
		for (const key in map) {
			if (map.hasOwnProperty(key)) {
				ret[map[key]] = Number(key);
			}
		}
		return ret;
	}

	export function removeElementFromArray(array : any[], element : any) {
		const index = array.indexOf(element);
		if (index > -1) {
			array.splice(index, 1);
		}
	}


	// type ElementType<ArrayType> = ArrayType extends Array<(infer ElemType)> ? ElemType : never;

	export type AnyMap = MapOf | NMapOf;

	export interface MapOf<T = any> {
		[key : string] : T;
	}

	export interface NMapOf<T = any> {
		[key : number] : T;
	}

	export type AtLeast<T extends {}> = MapOf & T;
	// export type MapType<T extends {[k : string] : any}> = T extends {[k : string] : infer U} ? U : never;


	/**
	 * Binary search
	 */

	/**
	 * Returns the index of the closest element to the value
	 * Method which returns the number to compare in the element
	 * @param arr
	 * @param target
	 * @param getValue
	 * @return The index of the closest element in the array
	 * (-1 if empty)
	 */
	export function findClosestElement<T>(arr : T[], target : number, getValue : (element : T) => number = (element : T) => {
		return Number(element);
	}) {

		/**
		 * Method to compare which one
		 * is the more close We find the
		 * closest by taking the difference
		 * between the target and both
		 * values. It assumes that val2 is
		 * greater than val1 and target
		 * lies between these two.
		 */
		const getClosestIndex = (index1 : number, index2 : number, target : number) => {
			if (target - getValue(arr[index1]) >= getValue(arr[index2]) - target) {
				return index1;
			}
			else {
				return index2;
			}
		};

		const n = arr.length;

		/**
		 * Corner cases
		 */
		if (arr.length === 0) {
			return -1;
		}
		else if (target <= getValue(arr[0])) {
			return 0;
		}
		else if (target >= getValue(arr[n - 1])) {
			return n - 1;
		}

		/**
		 *  Doing binary search
		 */
		let i : number = 0;
		let mid : number = 0;
		let j : number = n;

		while (i < j) {
			mid = Math.round((i + j) / 2);

			if (getValue(arr[mid]) === target) {
				return mid;
			}

			/* If target is less
			 than array element,
			 then search in left */
			if (target < getValue(arr[mid])) {

				/* If target is greater
				 than previous to mid,
				 return closest of two */
				if (mid > 0 && target > getValue(arr[mid - 1])) {
					return getClosestIndex(mid - 1, mid, target);
				}

				/* Repeat for left half */
				j = mid;
			}

			/* If target is
			 greater than mid */
			else {
				if (mid < n - 1 && target < getValue(arr[mid + 1])) {
					return getClosestIndex(mid, mid + 1, target);
				}
				i = mid + 1; // update i
			}
		}

		/* Only single element
		 left after search */
		return mid;
	}


}
