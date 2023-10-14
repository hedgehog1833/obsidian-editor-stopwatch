import { StopwatchState } from './StopwatchState';

export class StopwatchModel {
	private startedAt: number = 0;
	private pausedAtOffset: number = 0;
	private state: StopwatchState = StopwatchState.INITIALIZED;

	start(): StopwatchState {
		this.startedAt = Date.now();
		this.state = StopwatchState.STARTED;
		return this.state;
	}

	stop(): StopwatchState {
		this.pausedAtOffset = Date.now() - this.startedAt + this.pausedAtOffset;
		this.state = StopwatchState.STOPPED;
		return this.state;
	}

	reset(): StopwatchState {
		this.state = StopwatchState.INITIALIZED;
		this.startedAt = 0;
		this.pausedAtOffset = 0;
		return this.state;
	}

	getCurrentValue(): number {
		if (this.state === StopwatchState.STARTED) {
			const now = Date.now();
			return now - this.startedAt + this.pausedAtOffset;
		}
		return this.pausedAtOffset;
	}
}
