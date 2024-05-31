<template>
  <main>
    <Filters
      :filters="filters"
      :currentPage="currentPage"
      :applyFilters="applyFilters"
      :resetFilters="resetFilters"
      :isCharacterFound="isCharacterFound"
    />
    <div v-if="isLoading" class="loading">Looking for characters...</div>
    <div v-if="!isCharacterFound" class="not-found">
      No character was found :(
    </div>
    <div v-else class="content-wrapper">
      <div class="card-wrapper">
        <Card
          v-for="character in characters"
          :key="character.id"
          :name="character.name"
          :status="character.status"
          :species="character.species"
          :location="character.location"
          :imageSrc="character.imageSrc"
          :imageAlt="character.imageAlt"
          :firstSeenIn="character.firstSeenIn"
        />
      </div>
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :goToPage="goToPage"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Card from "@/components/Card.vue";
import Pagination from "@/components/Pagination.vue";
import Filters from "@/components/Filters.vue";

const url = "https://rickandmortyapi.com/api/character";

const characters = ref([]);
const totalPages = ref(0);
const currentPage = ref(1);
const filters = ref({
  name: "",
  status: "",
});

const isLoading = ref(false);
const isCharacterFound = ref(true);
const prevUrl = ref("");

const buildUrlWithParams = (pageNumber, filters) => {
  const params = new URLSearchParams({ page: pageNumber });
  Object.keys(filters).forEach((param) => {
    if (filters[param]) {
      params.append(param, filters[param]);
    }
  });
  return `${url}?${params.toString()}`;
};

const fetchEpisodes = async (episodeUrls) => {
  const episodes = await Promise.all(
    episodeUrls.map(async (url) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch episode");
      return res.json();
    }),
  );
  return episodes;
};

const fetchCharacter = async (pageNumber = 1, filters = {}) => {
  isLoading.value = true;
  isCharacterFound.value = true;

  try {
    const urlWithParams = buildUrlWithParams(pageNumber, filters);
    if (prevUrl.value === urlWithParams) {
      return;
    }

    const response = await fetch(urlWithParams);

    if (!response.ok) {
      const errorResponse = await response.json();
      if (errorResponse.error === "There is nothing here") {
        characters.value = [];
        totalPages.value = 0;
        isCharacterFound.value = false;
        prevUrl.value = "";
        return;
      }
    }

    const { results, info } = await response.json();

    const charactersTemp = [];
    const episodeUrls = [];

    results.forEach(
      ({ name, status, species, image, location, episode, id }) => {
        charactersTemp.push({
          id,
          name,
          status,
          species,
          imageSrc: image,
          imageAlt: name,
          location: location.name,
        });
        episodeUrls.push(episode[0]);
      },
    );

    const episodes = await fetchEpisodes(episodeUrls);
    characters.value = charactersTemp.map((character, index) => ({
      ...character,
      firstSeenIn: episodes[index].name,
    }));
    totalPages.value = info.pages;
    prevUrl.value = urlWithParams;
  } catch (error) {
    console.error("Failed fetch operation:", error);
  } finally {
    isLoading.value = false;
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchCharacter(page, filters.value);
    currentPage.value = page;
    scrollToTop();
  }
};

const applyFilters = () => {
  fetchCharacter(1, filters.value);
  currentPage.value = 1;
};

const resetFilters = () => {
  filters.value = {
    name: "",
    status: "",
  };
  fetchCharacter(1);
  currentPage.value = 1;
  isCharacterFound.value = true;
};

onMounted(() => fetchCharacter(1, filters.value));
</script>

<style>
p {
  display: flex;
}

main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding-bottom: 30px;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.card-wrapper {
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.loading,
.not-found {
  padding-top: 50px;
  font-size: 23px;
  align-self: center;
  min-height: calc(100vh - 50px);
}

@media (max-width: 40.625em) {
  .not-found {
    text-align: center;
    display: block;
    width: 90%;
  }
}
</style>
