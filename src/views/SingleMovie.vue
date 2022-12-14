<script setup lang="ts">
import { computed } from "vue";
import { useTitle } from "@vueuse/core";
import BreadCrumb from "@/components/BreadCrumb.vue";
import ScreeningsPage from "@/views/ScreeningsPage.vue";
import NoResults from "@/components/NoResults.vue";
import { useMovieStore } from "@/stores/movies";
import { useRoute } from "vue-router";
import lengthToTime from "@/helpers/lengthToTime";
const movieStore = useMovieStore();
const route = useRoute();

const selectedId = computed(() => {
  return route.params.id.toString() || "";
});
const selectedMovie = computed(() => {
  return movieStore.movieList.find(
    (movie) => movie.id.toString() === selectedId.value
  );
});
const movieDetails = computed<string>(() => {
  if (selectedMovie.value)
    return (
      selectedMovie.value.release_date.substring(0, 4) +
      "  |  " +
      lengthToTime(selectedMovie.value.length)
    );
  return "";
});
const title = computed(() => {
  return selectedMovie.value
    ? `Montecinema | ${selectedMovie.value.title}`
    : "Montecinema";
});
useTitle(title);
</script>

<template>
  <template v-if="selectedMovie">
    <div class="wrapper">
      <BreadCrumb
        first-tier="/movies"
        first-title="Movies"
        :second-title="selectedMovie.title"
      />
      <div class="single-movie">
        <div class="single-movie__description">
          <h1>{{ selectedMovie.title }}</h1>
          <div class="single-movie__subheading">
            <span class="single-movie__genre">{{
              selectedMovie.genre.name
            }}</span>
            <span class="single-movie__details">{{ movieDetails }}</span>
          </div>
          <p class="single-movie__text">{{ selectedMovie.description }}</p>
        </div>

        <div class="single-movie__image">
          <img
            :src="selectedMovie.poster_url"
            :alt="`${selectedMovie.title} poster`"
          />
        </div>
      </div>
      <div class="movie-screening">
        <ScreeningsPage :selected-movie="+selectedId" />
      </div>
    </div>
  </template>
  <NoResults v-else>Movie not found...</NoResults>
</template>

<style scoped lang="scss">
.wrapper {
  @include sm {
    padding: 0 10px;
    width: calc(100vw);
  }
}

.single-movie {
  margin-top: 20px;
  gap: 25px;
  display: grid;
  grid-template: minmax(250px, 650px) / repeat(2, 1fr);
  width: 100%;
  height: 100%;

  @include md {
    grid-template: minmax(250px, 600px) / 2fr 1fr;
  }

  @include sm {
    grid-template: 250px 1fr / 1fr;
    gap: 5px;
  }

  &__image {
    @include sm {
      order: -1;
    }

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  &__genre {
    background: $wisp-pink;
    border-radius: 24px;
    padding: 16px;
    @include roboto-mono(normal, 700);
    font-size: 14px;
    line-height: 16px;
    color: $bitter-sweet;
  }

  &__subheading {
    @include sm {
      @include flex-vcenter-hcenter;
    }
  }

  &__details {
    margin-left: 15px;
    @include roboto-mono(normal, 700);
    font-size: 14px;
    line-height: 16px;
    color: $jumbo;
  }

  &__text {
    @include roboto-mono(normal, 400);
    font-size: 22px;
    line-height: 37px;
    letter-spacing: 0.015em;
    color: $tuna;
    margin: 32px 0px;

    @include sm {
      margin: 10px 0;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
    }
  }

  h1 {
    @include eczar(normal, 600);
    font-size: 80px;
    line-height: 82px;
    letter-spacing: -0.01em;
    color: $tuna;
    margin: 32px 0px;

    @include sm {
      font-size: 48px;
      line-height: 1.25;
      text-align: center;
      margin: 10px 0;
    }
  }
}
</style>
