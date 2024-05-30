<script setup>
import { defineProps, ref, computed } from "vue";

const props = defineProps({
  filters: Object,
  applyFilters: Function,
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
</script>

<template>
  <div class="filters">
    <div class="filters-inputs">
      <input
        ref="nameInput"
        v-model="props.filters.name"
        type="text"
        placeholder="Имя"
        class="filter-input"
        @keydown.enter="focusSearchButton"
      />
      <input
        ref="statusInput"
        v-model="props.filters.status"
        type="text"
        placeholder="Статус"
        class="filter-input"
        @keydown.enter="focusSearchButton"
      />
    </div>
    <div class="button-wrapper">
      <button
        ref="searchButton"
        type="button"
        class="search-button"
        :disabled="isFiltersEmpty"
        :class="{ 'disabled-button': isFiltersEmpty }"
        @click="props.applyFilters"
      >
        Поиск
      </button>
    </div>
  </div>
</template>

<style>
.filters {
  display: flex;
  gap: 5px;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
}

.filters-inputs {
  display: flex;
  gap: 5px;
  width: 75%;
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

.button-wrapper {
  display: flex;
  gap: 5px;
  width: 10%;
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
  }

  .filters-inputs {
    width: 80%;
    flex-direction: column;
    gap: 7px;
  }

  .button-wrapper {
    width: 40%;
    height: 30px;
  }
}
</style>
