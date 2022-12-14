<script setup lang="ts">
import { computed } from "vue";
import lengthToTime from "@/helpers/lengthToTime";
import type { Movie } from "@/types/movie";

const props = defineProps<{
  movie: Movie;
}>();

const movieRoute = computed(() => {
  return {
    name: "SingleMoviePage",
    params: {
      id: props.movie.id,
    },
  };
});
</script>

<template>
  <RouterLink :to="movieRoute" class="movie">
    <div class="movie__title" data-spec="title">
      <p>
        {{ props.movie.title }}
      </p>
    </div>
    <p class="movie__length" data-spec="length">
      {{ lengthToTime(props.movie.length) }}
    </p>
    <img
      data-spec="poster"
      class="movie__poster"
      :src="props.movie.poster_url"
      :alt="`${movie.title} poster`"
    />
    <p class="movie__genre" data-spec="genre">{{ props.movie.genre.name }}</p>
  </RouterLink>
</template>

<style scoped lang="scss">
.movie {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
  width: 100%;
  min-width: 400px;
  height: 100%;
  background: $snow-white;
  box-shadow: $card-box-shadow;
  border-radius: 8px;

  @include sm {
    min-width: unset;
    max-width: 325px;
    margin: 0 24px;
  }

  &__title {
    @include roboto(normal, 700);
    font-size: 36px;
    line-height: 42px;
    display: block;
    color: $tuna;
    height: 84px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__poster {
    margin-top: 16px;
    margin-bottom: 28px;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  &__length {
    @include roboto(normal, 700);
    font-size: 14px;
    line-height: 16px;
    color: $jumbo;
  }

  &__genre {
    padding: 8px 16px;
    background: $wisp-pink;
    border-radius: 24px;
    @include roboto(normal, 700);
    font-size: 14px;
    line-height: 16px;
    color: $bitter-sweet;
    display: block;
  }
}
</style>
