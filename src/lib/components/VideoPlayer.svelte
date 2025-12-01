<script lang="ts">
	import { TIMEOUTS } from '$lib/constants';
	import PlayIcon from './icons/PlayIcon.svelte';
	import PauseIcon from './icons/PauseIcon.svelte';
	import ReplayIcon from './icons/ReplayIcon.svelte';
	import VolumeHighIcon from './icons/VolumeHighIcon.svelte';
	import VolumeMuteIcon from './icons/VolumeMuteIcon.svelte';
	import FullscreenEnterIcon from './icons/FullscreenEnterIcon.svelte';
	import FullscreenExitIcon from './icons/FullscreenExitIcon.svelte';

	let { src, poster = '' } = $props<{ src: string; poster?: string }>();

	let video: HTMLVideoElement;
	let isPlaying = $state(false);
	let hasStarted = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);
	let isMuted = $state(false);
	let isFullscreen = $state(false);
	let showControls = $state(false);
	let isEnded = $state(false);
	let controlsTimeout: NodeJS.Timeout;

	function seekTo(time: number) {
		if (!video) return;
		const clamped = Math.max(0, Math.min(duration, time));
		video.currentTime = clamped;
		currentTime = clamped;
		if (isEnded) {
			isEnded = false;
			video.play();
			isPlaying = true;
		}
	}

	function togglePlay() {
		if (video.paused) {
			video.play();
			isPlaying = true;
			hasStarted = true;
			isEnded = false;
		} else {
			video.pause();
			isPlaying = false;
		}
	}

	function handleTimeUpdate() {
		currentTime = video.currentTime;
	}

	function handleLoadedMetadata() {
		duration = video.duration;
	}

	function handleSeek(e: MouseEvent) {
		const progressBar = e.currentTarget as HTMLDivElement;
		const rect = progressBar.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const percentage = x / rect.width;
		seekTo(percentage * duration);
	}

	function toggleMute() {
		video.muted = !video.muted;
		isMuted = video.muted;
	}

	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			video.parentElement?.requestFullscreen();
			isFullscreen = true;
		} else {
			document.exitFullscreen();
			isFullscreen = false;
		}
	}

	function formatTime(seconds: number) {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	function handleMouseMove() {
		if (!hasStarted) return;
		showControls = true;
		clearTimeout(controlsTimeout);
		controlsTimeout = setTimeout(() => {
			if (isPlaying) showControls = false;
		}, TIMEOUTS.VIDEO_CONTROLS_HIDE);
	}

	function handleVideoEnd() {
		isPlaying = false;
		showControls = true;
		isEnded = true;
	}

	function handleSliderKeydown(event: KeyboardEvent) {
		if (!duration) return;
		const step = Math.max(duration / 20, 1);
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			seekTo(currentTime + step);
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			seekTo(currentTime - step);
		} else if (event.key === 'Home') {
			event.preventDefault();
			seekTo(0);
		} else if (event.key === 'End') {
			event.preventDefault();
			seekTo(duration);
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="group relative w-full bg-black select-none"
	onmousemove={handleMouseMove}
	onmouseleave={() => isPlaying && (showControls = false)}
>
	<!-- Video Element -->
	<!-- svelte-ignore a11y_media_has_caption -->
	<video
		bind:this={video}
		{src}
		{poster}
		class="w-full {isFullscreen ? 'h-full object-contain' : 'block h-auto'}"
		onclick={togglePlay}
		ontimeupdate={handleTimeUpdate}
		onloadedmetadata={handleLoadedMetadata}
		onended={handleVideoEnd}
		playsinline
	></video>

	<!-- Big Center Play Button (only visible when paused) -->
	{#if !isPlaying}
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
			<button
				onclick={togglePlay}
				class="pointer-events-auto flex h-20 w-20 cursor-pointer items-center justify-center border-2 border-black bg-white text-black shadow-[4px_4px_0px_#000] transition-transform hover:scale-105 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
				aria-label={isEnded ? 'Replay video' : 'Play video'}
			>
				{#if isEnded}
					<ReplayIcon class="h-10 w-10" />
				{:else}
					<PlayIcon class="h-10 w-10" />
				{/if}
			</button>
		</div>
	{/if}

	<!-- Controls Bar -->
	<div
		class="absolute right-0 bottom-0 left-0 p-4 transition-opacity duration-300 {showControls
			? 'opacity-100'
			: 'opacity-0'} bg-gradient-to-t from-black/50 to-transparent"
	>
		<div
			class="flex items-center gap-4 border-2 border-black bg-white p-2 text-black shadow-[4px_4px_0px_#000]"
		>
			<!-- Play/Pause Mini -->
			<button
				onclick={togglePlay}
				class="shrink-0 border-2 border-transparent p-1 transition-all hover:border-black hover:bg-gray-100 hover:text-blue-600"
				aria-pressed={isPlaying && !isEnded}
			>
				{#if isEnded}
					<ReplayIcon class="h-6 w-6" />
				{:else if isPlaying}
					<PauseIcon class="h-6 w-6" />
				{:else}
					<PlayIcon class="h-6 w-6" />
				{/if}
			</button>

			<!-- Time Display -->
			<span class="shrink-0 font-mono text-sm font-bold">
				{formatTime(currentTime)} / {formatTime(duration)}
			</span>

			<!-- Progress Bar -->
			<div
				class="group/progress relative h-4 flex-1 cursor-pointer border-2 border-black bg-gray-200"
				onclick={handleSeek}
				role="slider"
				aria-valuenow={Math.floor(currentTime)}
				aria-valuemin={0}
				aria-valuemax={Math.floor(duration)}
				aria-valuetext={`Position ${formatTime(currentTime)} of ${formatTime(duration)}`}
				aria-label="Video progress"
				onkeydown={handleSliderKeydown}
				tabindex="0"
			>
				<div
					class="h-full border-r-2 border-black bg-blue-600 transition-colors group-hover/progress:bg-blue-500"
					style="width: {duration ? (currentTime / duration) * 100 : 0}%"
				></div>
			</div>

			<div class="flex shrink-0 items-center gap-2">
				<!-- Mute -->
				<button
					onclick={toggleMute}
					class="border-2 border-transparent p-1 transition-all hover:border-black hover:bg-gray-100 hover:text-blue-600"
					aria-pressed={isMuted}
				>
					{#if isMuted}
						<VolumeMuteIcon class="h-6 w-6" />
					{:else}
						<VolumeHighIcon class="h-6 w-6" />
					{/if}
				</button>

				<!-- Fullscreen -->
				<button
					onclick={toggleFullscreen}
					class="border-2 border-transparent p-1 transition-all hover:border-black hover:bg-gray-100 hover:text-blue-600"
					aria-pressed={isFullscreen}
				>
					{#if isFullscreen}
						<FullscreenExitIcon class="h-6 w-6" />
					{:else}
						<FullscreenEnterIcon class="h-6 w-6" />
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>
