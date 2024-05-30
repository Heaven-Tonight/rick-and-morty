<template>
  <div class="pagination">
    <button
      type="button"
      :disabled="props.currentPage === 1"
      :class="{ 'disabled-button': props.currentPage === 1 }"
      @click="prevPage"
    >
      Prev
    </button>
    <button
      v-for="pageNumber in renderPaginationButtons"
      :key="pageNumber"
      type="button"
      class="page"
      :disabled="props.currentPage === pageNumber || pageNumber === '...'"
      :class="{ active: pageNumber === props.currentPage }"
      @click="goToPage(pageNumber)"
    >
      {{ pageNumber }}
    </button>
    <button
      type="button"
      :disabled="props.currentPage === props.totalPages"
      :class="{ 'disabled-button': props.currentPage === props.totalPages }"
      @click="nextPage"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const totalPagesButtonsToShow = 5;

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  goToPage: {
    type: Function,
    required: true,
  },
});

const prevPage = () => {
  if (props.currentPage > 1) {
    props.goToPage(props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    props.goToPage(props.currentPage + 1);
  }
};

const renderPaginationButtons = computed(() => {
  const pages = [];
  const halfButtonsToShow = Math.floor(totalPagesButtonsToShow / 2);
  let startPage = Math.max(1, props.currentPage - halfButtonsToShow);
  let endPage = Math.min(
    props.totalPages,
    startPage + totalPagesButtonsToShow - 1,
  );

  if (startPage > 1) {
    pages.push("...");
  }

  if (endPage - startPage < totalPagesButtonsToShow - 1) {
    if (startPage === 1) {
      endPage = Math.min(props.totalPages, totalPagesButtonsToShow);
    } else {
      startPage = Math.max(1, props.totalPages - totalPagesButtonsToShow + 1);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < props.totalPages) {
    pages.push("...");
    pages.push(props.totalPages);
  }

  return pages;
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-top: auto;
}

.pagination button {
  background: rgb(60, 62, 68);
  color: rgb(255, 255, 255);
  border: 1px solid #616462;
  border-radius: 3px;
  width: 60px;
}

.pagination button:hover {
  background: #616462;
}

.pagination .page {
  width: 40px;
  height: 40px;
}

.pagination button.active {
  background: #179361;
  color: rgb(255, 255, 255);
}

.pagination .disabled-button {
  color: rgb(158, 158, 158);
}
</style>
