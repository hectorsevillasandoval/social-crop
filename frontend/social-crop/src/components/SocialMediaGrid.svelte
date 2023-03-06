<script>
  import { croppedUrlsFromAPI } from '../store/store.js';
</script>
<div class="SocialMediaGrid" id="crop-result">
  {#each $croppedUrlsFromAPI as { name, URLs }}
    <div class="sc-{name} mt-10">
      <h2 class="text-left capitalize text-4xl bold mb-3">{name}</h2>
      <div class="grid gap-4 grid-cols-2 lg:grid-cols-4 justify-center">
      {#each URLs.sort((a,b) => b.width - a.width) as photo}
        <div class="size--{photo.name} text-left">
          <h3 class="text-sm text-left uppercase mb-4">{photo.name.split('_').join(' ')} ({photo.width}x{photo.height})</h3>
          <figure class="smg__photo-container inline-block overflow-hidden relative">
            <img src="{photo.URL}" alt="" srcset="" class="rounded-xl">
            <div class="overlay bg-gradient-to-b from-transparent to-neutral-500 absolute top-0 bottom-0 left-0 right-0 rounded-b-xl hidden">
              <a href="{photo.URL}" class="absolute top-2 right-2 text-xs border-2 border-orange-400 px-2 py-1 text-white bg-orange-500 rounded-md hover:bg-white hover:text-orange-500" target="_blank" rel="noreferrer" download>
                <i class="fa-solid fa-download"></i> Download
              </a>
            </div>
          </figure>
        </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .smg__photo-container:hover .overlay{
    display: block;
  }
</style>