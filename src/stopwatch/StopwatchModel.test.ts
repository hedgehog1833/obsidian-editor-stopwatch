import { StopwatchState } from './StopwatchState';
import { StopwatchModel } from './StopwatchModel';
import { beforeEach, describe, expect, it } from '@jest/globals';

describe('StopwatchModel', () => {
	let underTest: StopwatchModel;

	beforeEach(() => {
		underTest = new StopwatchModel();
	});

	describe('start', () => {
		it('should return the current state', () => {
			const result = underTest.start();

			expect(result).toBe(StopwatchState.STARTED);
		});

		it('should start the watch', async () => {
			underTest.start();
			await new Promise((r) => setTimeout(r, 10));

			expect(underTest.getCurrentValue()).toBeGreaterThanOrEqual(10);
		});
	});

	describe('stop', () => {
		it('should return the current state', () => {
			const result = underTest.stop();

			expect(result).toBe(StopwatchState.STOPPED);
		});

		it('should stop the watch', async () => {
			underTest.start();
			await new Promise((r) => setTimeout(r, 10));

			underTest.stop();
			const stopValue = underTest.getCurrentValue();

			await new Promise((r) => setTimeout(r, 10));
			const stopValueAfterWait = underTest.getCurrentValue();

			expect(stopValue).toBe(stopValueAfterWait);
		});
	});

	describe('reset', () => {
		it('should return the current state', () => {
			const result = underTest.reset();

			expect(result).toBe(StopwatchState.INITIALIZED);
		});

		it('should reset the startedAt property to 0', async () => {
			underTest.start();
			await new Promise((r) => setTimeout(r, 10));

			underTest.reset();

			expect(underTest.getCurrentValue()).toBe(0);
		});

		it('should return the current state', () => {
			const result = underTest.reset();

			expect(result).toBe(StopwatchState.INITIALIZED);
		});
	});
});
