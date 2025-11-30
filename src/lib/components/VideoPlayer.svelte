<script lang="ts">
  import { onMount } from 'svelte';

  let { src, poster = '' } = $props<{ src: string, poster?: string }>();

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
    video.currentTime = percentage * duration;
    if (isEnded) {
        isEnded = false;
        video.play();
        isPlaying = true;
    }
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
    }, 2000);
  }

  function handleVideoEnd() {
    isPlaying = false;
    showControls = true;
    isEnded = true;
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
  class="relative w-full group select-none bg-black"
  onmousemove={handleMouseMove}
  onmouseleave={() => isPlaying && (showControls = false)}
>
  <!-- Video Element -->
  <!-- svelte-ignore a11y_media_has_caption -->
  <video
    bind:this={video}
    {src}
    {poster}
    class="w-full {isFullscreen ? 'h-full object-contain' : 'h-auto block'}"
    onclick={togglePlay}
    ontimeupdate={handleTimeUpdate}
    onloadedmetadata={handleLoadedMetadata}
    onended={handleVideoEnd}
    playsinline
  ></video>

  <!-- Big Center Play Button (only visible when paused) -->
  {#if !isPlaying}
    <div class="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
      <button 
        onclick={togglePlay}
        class="pointer-events-auto w-20 h-20 bg-white border-2 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center hover:bg-blue-50 transition-transform hover:scale-105 active:scale-95 cursor-pointer text-black hover:text-blue-600"
        aria-label={isEnded ? "Replay video" : "Play video"}
      >
        {#if isEnded}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-10 h-10">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="m400 148l-21.12-24.57A191.43 191.43 0 0 0 240 64C134 64 48 150 48 256s86 192 192 192a192.09 192.09 0 0 0 181.07-128"/>
                <path fill="currentColor" d="M464 97.42V208a16 16 0 0 1-16 16H337.42c-14.26 0-21.4-17.23-11.32-27.31L436.69 86.1C446.77 76 464 83.16 464 97.42"/>
            </svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10">
            <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
            </svg>
        {/if}
      </button>
    </div>
  {/if}

  <!-- Controls Bar -->
  <div class="absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 {showControls ? 'opacity-100' : 'opacity-0'} bg-gradient-to-t from-black/50 to-transparent">
    <div class="bg-white border-2 border-black p-2 shadow-[4px_4px_0px_#000] flex items-center gap-4 text-black">
      
      <!-- Play/Pause Mini -->
      <button onclick={togglePlay} class="p-1 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all shrink-0 hover:text-blue-600">
        {#if isEnded}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="m400 148l-21.12-24.57A191.43 191.43 0 0 0 240 64C134 64 48 150 48 256s86 192 192 192a192.09 192.09 0 0 0 181.07-128"/>
                <path fill="currentColor" d="M464 97.42V208a16 16 0 0 1-16 16H337.42c-14.26 0-21.4-17.23-11.32-27.31L436.69 86.1C446.77 76 464 83.16 464 97.42"/>
            </svg>
        {:else if isPlaying}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd" />
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
          </svg>
        {/if}
      </button>

      <!-- Time Display -->
      <span class="font-mono text-sm font-bold shrink-0">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      <!-- Progress Bar -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div 
        class="h-4 border-2 border-black bg-gray-200 cursor-pointer relative flex-1 group/progress"
        onclick={handleSeek}
        role="slider"
        aria-valuenow={currentTime}
        aria-valuemin={0}
        aria-valuemax={duration}
        tabindex="0"
      >
        <div 
          class="h-full bg-blue-600 border-r-2 border-black group-hover/progress:bg-blue-500 transition-colors"
          style="width: {duration ? (currentTime / duration) * 100 : 0}%"
        ></div>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <!-- Mute -->
        <button onclick={toggleMute} class="p-1 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all hover:text-blue-600">
          {#if isMuted}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
              <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
              <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
            </svg>
          {/if}
        </button>

        <!-- Fullscreen -->
        <button onclick={toggleFullscreen} class="p-1 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all hover:text-blue-600">
          {#if isFullscreen}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6">
                <path fill="currentColor" d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/>
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6">
                <path fill="currentColor" d="M7 14H5v5h5v-2H7zm-2-4h2V7h3V5H5zm12 7h-3v2h5v-5h-2zM14 5v2h3v3h2V5z"/>
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>
</div>
