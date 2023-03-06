<script>
  import { selectedNetworks } from '../store/store.js';
  import { availableSocialMediaNetworks } from '../constants';

  function handleClick(e) {
    const currentButton = e.target && e.target;
    if (!currentButton) return;
    currentButton.classList.toggle('button--is-selected');

    selectedNetworks.update( items => {
      const network = e.target.dataset.scNetwork;
      let newArrayOfItems = [];
      if (!items.includes(network)){
        items.push(network);
      } else {
        newArrayOfItems = items.filter(item => item !== network);
        items = newArrayOfItems;
      }

      return items;
    });
  }

</script>

<div class="SocialMediaNetworks">
  <!-- <ul class="flex justify-center mt-8 mx-auto">
    {#each availableSocialMediaNetworks as {name, icon}}
      <li>
        <button class="grid items-center p-0 rounded-full outline-none border-2 box-border w-16 h-16 text-2xl ml-4 hover:border-indigo-500 hover:text-indigo-500 focus:outline-0" data-sc-network={name} on:click={handleClick}>
          <i class="{icon} pointer-events-none"></i>
        </button>
      </li>
    {/each}
    </ul> -->
    <div class="flex justify-center mt-8 mx-auto">
      {#each availableSocialMediaNetworks as {name, icon}}
        <div class="checkbox-field">
          <input type="checkbox" id="sc-{name}" name="selected_networks" class="hidden" value="{name}" required />
          <label for="sc-{name}" class="grid items-center p-0 rounded-full outline-none border-2 box-border w-16 h-16 text-2xl ml-4 hover:border-indigo-500 hover:text-indigo-500 focus:outline-0"><i class="{icon} pointer-events-none"></i></label>
        </div>
      {/each}

    </div>
</div>

<style>
  :global(.checked--is-selected) {
    @apply border-indigo-500 text-indigo-500;
  }
  .SocialMediaNetworks input[type="checkbox"]:checked + label {
    @apply border-indigo-500 text-indigo-500;
  }
  .SocialMediaNetworks input[type="checkbox"] + label:hover {
    cursor: pointer;
  }
</style>