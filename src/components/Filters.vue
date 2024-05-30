<script setup>
import { defineProps, ref, computed, onMounted, watch } from "vue";

const props = defineProps({
  filters: Object,
  currentPage: Number,
  isCharacterFound: Boolean,
  applyFilters: Function,
  resetFilters: Function,
});


const nameInput = ref(null);
const statusInput = ref(null);
const searchButton = ref(null);

const isFiltersEmpty = computed(() =>
  Object.values(props.filters).every((filter) => !filter),
);
const focusSearchButton = () => {
  if (searchButton.value) {
    searchButton.value.focus();
  }
};

const focusInput = () => {
  if (nameInput.value) {
    nameInput.value.focus();
  }
};

onMounted(() => {
  if (nameInput.value) {
    nameInput.value.focus();
  }
});

watch([() => props.currentPage, () => props.filters], () => {
  focusInput();
});

</script>

<template>
  <div class="filters">
    <div class="filters-inputs">
      <input
        ref="nameInput"
        v-model="props.filters.name"
        type="text"
        placeholder="Name"
        class="filter-input"
        :class="{ 'disabled-input': !props.isCharacterFound }"
        @keydown.enter="focusSearchButton"
      />
      <select
          id="status-select"
          ref="statusInput"
          v-model="props.filters.status"
          class="filter-select"
          :disabled="!props.isCharacterFound"
          @change="focusSearchButton"
      >
        <option value="" disabled selected>Status</option>
        <option value="alive">Alive</option>
        <option value="unknown">Unknown</option>
        <option value="dead">Dead</option>
      </select>
    </div>
    <div class="button-wrapper">
      <button
        ref="searchButton"
        type="button"
        class="search-button"
        :disabled="isFiltersEmpty || !props.isCharacterFound"
        :class="{ 'disabled-button': isFiltersEmpty || !props.isCharacterFound }"
        @click="props.applyFilters"
      >
        Search
      </button>
      <button
         type="button"
         class="reset-button"
         :disabled="isFiltersEmpty"
         :class="{ 'disabled-button': isFiltersEmpty }"
         @click="props.resetFilters"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<style>
.filters {
  display: flex;
  gap: 5px;
  margin-left: 3%;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
}

.filters-inputs {
  display: flex;
  gap: 5px;
  width: 60%;
  height: 30px;
}

.filters input {
  color: rgb(255, 255, 255);
  background: rgb(60, 62, 68);
  border-radius: 3px;
  width: 100%;
  border: 1px solid #616462;
}

.filters input::placeholder {
  padding-left: 5px;
  color: #616462;
}

.filters input:focus {
  outline: none;
  border-color: rgb(255, 255, 255);
}

.disabled-input {
    pointer-events: none;
    opacity: 0.5;
}

.filters .filter-select {
  color: rgb(255, 255, 255);
  background: rgb(60, 62, 68);
  border-radius: 3px;
  width: 25%
}

.button-wrapper {
  display: flex;
  gap: 5px;
  width: 30%;
}

.button-wrapper button {
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 3px;
  cursor: pointer;
  opacity: 1;
  width: 100%;
}

.button-wrapper .search-button {
  background: #179361;
  width: 30%;
  padding: 5px;
}

.button-wrapper .reset-button {
  background: #a23737;
  width: 30%;
}

.button-wrapper .reset-button:hover {
  background: #DC4F4F;
}

.button-wrapper .reset-button.disabled-button:hover {
  background: #a23737;
  cursor: auto;
}

.button-wrapper button.disabled-button {
  opacity: 0.5;
}

.button-wrapper .search-button.disabled-button:hover {
  background: #179361;
  cursor: auto;
}

.button-wrapper button:hover {
  background: #24d582;
}

@media (max-width: 40.625em) {
  .filters {
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding-left: 3%;
  }

  .filters-inputs {
    width: 80%;
    flex-direction: column;
    gap: 7px;
  }

  .filters .filter-select {
    width: 100%
  }

  .button-wrapper {
    width: 80%;
    height: 30px;
    justify-content: flex-start;
  }

  .button-wrapper .reset-button,
  .button-wrapper .search-button {
    width: 50%
  }
}
</style>
