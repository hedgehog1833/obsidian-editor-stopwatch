import { ItemView, moment, WorkspaceLeaf } from 'obsidian';
import { StopwatchButtons } from './StopwatchButtons';
import ReactDOM, { Root } from 'react-dom/client';
import React from 'react';
import { StopwatchModel } from '../stopwatch/StopwatchModel';
import Timetracker, { TIMETRACKER_VIEW_TYPE } from '../main';
import { StopwatchState } from '../stopwatch/StopwatchState';

export class TimetrackerView extends ItemView {
	private readonly stopwatchModel: StopwatchModel;
	private readonly plugin: Timetracker;
	private root: Root;

	constructor(leaf: WorkspaceLeaf, plugin: Timetracker) {
		super(leaf);
		this.plugin = plugin;
		this.stopwatchModel = new StopwatchModel();
	}

	getDisplayText(): string {
		return 'Timetracker sidebar';
	}

	getViewType(): string {
		return TIMETRACKER_VIEW_TYPE;
	}

	getIcon(): string {
		return 'clock';
	}

	getCurrentStopwatchTime(): string {
		const millis = this.stopwatchModel.getCurrentValue();
		return this.getDateString(millis);
	}

	clickStartStop(): void {
		const el = this.containerEl.querySelector('button.start-stop-button');
		(el as HTMLButtonElement).click();
	}

	clickReset(): void {
		const el = this.containerEl.querySelector('button.reset-button');
		(el as HTMLButtonElement).click();
	}

	clickReload(): void {
		const el = this.containerEl.querySelector('button.reload-button');
		(el as HTMLButtonElement).click();
	}

	async onOpen() {
		this.root = ReactDOM.createRoot(this.containerEl);
		this.root.render(
			<StopwatchButtons
				interval={this.plugin.settings.interval}
				reset={() => this.reset()}
				start={() => this.start()}
				stop={() => this.stop()}
				getCurrentStopwatchTime={() => this.getCurrentStopwatchTime()}
			/>,
		);
	}

	async onClose() {
		if (this.root !== null && this.root !== undefined) {
			this.root.unmount();
		}
	}

	private start(): StopwatchState {
		return this.stopwatchModel.start();
	}

	private stop(): StopwatchState {
		return this.stopwatchModel.stop();
	}

	private reset(): StopwatchState {
		return this.stopwatchModel.reset();
	}

	private getDateString(milliseconds: number): string {
		const formattingSettings = !this.plugin.settings.trimLeadingZeros
			? {
					trim: 'false',
			  }
			: {
					trim: 'left',
			  };
		return moment.duration(milliseconds).format(this.plugin.settings.format, formattingSettings);
	}
}
