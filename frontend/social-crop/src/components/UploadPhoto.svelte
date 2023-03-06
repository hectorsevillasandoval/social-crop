<script>
  import { onMount } from 'svelte';
  import Swal from 'sweetalert2';
  import SocialMediaNetworks from './SocialMediaNetworks.svelte';
  import { fileImageStatus, dropzoneConfiguration, swalAlertConfigurations } from '../constants';
  import { imageStatus, croppedUrlsFromAPI } from '../store/store.js';
  import Dropzone from "dropzone";
  import "dropzone/dist/dropzone.css"

  let dropzoneForm;
  let dropzoneSection;
  let dropzone;
  let resultsContainer;

  onMount(() => {
    dropzoneForm = document.querySelector('#dropzone');
    dropzoneSection = dropzoneForm.querySelector('.dropzone-section');
    resultsContainer = document.querySelector('#crop-result');
    // @ts-ignore
    dropzone = new Dropzone(dropzoneForm, {
      ...dropzoneConfiguration,
      clickable: dropzoneSection,
    })

    imageStatus.set(fileImageStatus.INITIAL)

    // On File Added
    dropzone.on('addedfile', file =>imageStatus.set(fileImageStatus.ADDED))

    // On Remove File
    dropzone.on('removedfile', () => imageStatus.set(fileImageStatus.INITIAL));

    // On Dragover
    dropzone.on('dragover', () => dropzoneForm.classList.add('border-orange-400'));

    // On dragleave
    dropzone.on('drop', () => dropzoneForm.classList.remove('border-orange-400'));
    // On Sending
    dropzone.on('sending', () => imageStatus.set(fileImageStatus.UPLOADING))
    // On maxfilesexceeded
    dropzone.on('maxfilesexceeded', file => {
      dropzone.removeAllFiles();
      dropzone.addFile(file);
    });

    // On Success
    dropzone.on('success', (file, response) => {
      const { status, croppedUrls } = response;
      imageStatus.set(fileImageStatus.DONE);

      if (status === 'success') {
        croppedUrlsFromAPI.set(croppedUrls);
      }
    });

  });

  function startCropping(event) {
    event.preventDefault();
    const checkboxes = dropzoneForm.querySelectorAll('input[type=checkbox]:checked');
    if (checkboxes.length <= 0) {
      // @ts-ignore
      return Swal.fire({
        ...swalAlertConfigurations.ERROR,
        title: 'Error trying to crop!',
        text: 'Please choose a Social Media Network to where you want to publish your photo!',
      })
    };
    const queue = dropzone.processQueue();
  }

</script>

<div class="UploadPhoto mt-7">
  <div class="upload-photo__container max-w-screen-md mx-auto">

    <form action="" id="dropzone" class="social-crop-dropzone">
      <div class="dropzone-section border-dashed shadow-xl border-4 border-orange-200 rounded-3xl p-6 hover:border-orange-400 hover:cursor-pointer aspect-video w-full flex items-center justify-center flex-col">
        {#if $imageStatus === fileImageStatus.INITIAL}
        <div class="upload-photo__text-container">
          <h2 class="text-6xl font-bold">Try it out!</h2>
          <h3 class="text-3xl">Drag or click to upload your photo here</h3>
        </div>
        {/if}
        <div class="previews mt-3"></div>
      </div>

      <div class="upload-photo__select-networks max-w-lg mx-auto text-center">
        <h3 class="text-4xl font-bold mt-14">Where do you want to publish your photo?</h3>
        <SocialMediaNetworks />
      </div>


      <button class="mt-24 font-bold uppercase text-white text-3xl border-0 drop-shadow-xl disabled:opacity-50 button__enabled hover:from-orange-400 hover:via-orange-600 hover:to-orange-700 hover:animate-pulse focus:outline-0" disabled={!($imageStatus === fileImageStatus.ADDED)} on:click={startCropping}>Start Cropping</button>
    </form>

    <!-- END SELECT NETWORKS -->
  </div>
</div>

<style>
  .previews {
    position: relative;
  }
  :global(.button__enabled) {
    @apply bg-gradient-to-r from-orange-400 via-orange-600 to-orange-700;
  }
  :global(.button__enabled--hover) {
    @apply bg-gradient-to-r from-orange-400 via-orange-600 to-orange-700 animate-pulse;
  }
  :global(.dz-remove) {
    position: absolute;
    top: 0;
    right: -30px;
    opacity: 0.5;
    font-size: 0;
    background-image: url('/circle-xmark-solid.svg');
    background-size: cover;
    display: block;
    width: 30px;
    height: 30px;
    z-index: 99;
    border-radius: 20px;
  }
  :global(.dz-remove:hover) {
    opacity: 1;
  }
</style>