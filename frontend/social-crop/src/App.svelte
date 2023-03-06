<script>
  import socialCropLogo from './assets/social-crop-logo.svg';
  import socialCropLogoWhite from './assets/social-crop-logo-white.svg';
  import UploadPhoto from './components/UploadPhoto.svelte';
  import SocialMediaGrid from './components/SocialMediaGrid.svelte';
  import { fileImageStatus } from './constants';
  import { imageStatus } from './store/store.js';
</script>

<main class="relative">
  <div class="container mx-auto">
    <div>
      <a href="https://socialcrop.hectorsevillasandoval.com" target="_blank" rel="noreferrer">
        <img src={socialCropLogo} class="logo social-crop mx-auto mb-6 dark:hidden" alt="SocialCrop Logo" />
        <img src={socialCropLogoWhite} class="logo social-crop mx-auto mb-6 hidden dark:block" alt="SocialCrop Logo" />
      </a>
    </div>
    <div class="description max-w-screen-md mx-auto hidden">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta officia ratione tempora sequi! Facilis suscipit quibusdam aut laboriosam ipsa dolores praesentium ea laborum molestias sunt. Atque accusantium asperiores voluptates nam?</p>
    </div>

    <UploadPhoto />
    <SocialMediaGrid />
  </div>
</main>
{#if $imageStatus === fileImageStatus.UPLOADING}
  <div class="loading-overlay fixed top-0 left-0 right-0 bottom-0 bg-white bg-opacity-90 z-50 grid grid-cols-1 items-center">
    <div class="lds-facebook"><div></div><div></div><div></div></div>
  </div>
{/if}

<style>
  :global(body){
    font-family: 'Mulish', sans-serif;
    font-size: 16px;
  }
  :global(h1, h2, h3, h4, h5, h6){
    font-family: 'Josefin Sans', sans-serif;
  }
  :global(.lds-facebook) {
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    width: 80px;
    height: 80px;
  }
  :global(.lds-facebook div) {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: #FF7C48;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  :global(.lds-facebook div:nth-child(1)) {
    left: 8px;
    animation-delay: -0.24s;
  }
  :global(.lds-facebook div:nth-child(2)) {
    left: 32px;
    animation-delay: -0.12s;
  }
  :global(.lds-facebook div:nth-child(3)) {
    left: 56px;
    animation-delay: 0;
  }
  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }
    50%, 100% {
      top: 24px;
      height: 32px;
    }
  }
  .logo{
    max-width: 500px;
  }
</style>
