<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";

const props = withDefaults(
  defineProps<{
    variant?: "primary" | "secondary" | "tertiary" | "breadcrumb" | "account";
    size?: "small" | "regular" | "medium" | "large" | "slim";
    modifier?: "outlined" | "noborder" | "";
    to?: RouteLocationRaw;
  }>(),
  {
    variant: "primary",
    size: "regular",
    modifier: "",
    to: "",
  }
);

const buttonClasses = computed(() => {
  return [
    "button",
    `button--${props.variant}${props.modifier ? `--${props.modifier}` : ""}`,
    `button--${props.size}`,
  ];
});
</script>

<template>
  <button v-if="!to" :class="buttonClasses">
    <slot />
  </button>
  <RouterLink v-else :to="to" :class="buttonClasses">
    <slot />
  </RouterLink>
</template>

<style lang="scss" scoped>
.button {
  @include roboto-mono();
  @include flex-vcenter-hcenter;
  display: inline-flex;
  text-decoration: none;
  outline: none;
  min-width: 115px;

  &--small {
    padding: 5px 16px;
    height: 24px;
    font-size: 14px;
    border-radius: 12px;
  }

  &--regular {
    padding: 9px 24px;
    height: 32px;
    font-size: 16px;
    border-radius: 16px;
  }

  &--medium {
    padding: 12px 32px;
    height: 40px;
    font-size: 16px;
    border-radius: 20px;
  }

  &--large {
    padding: 19px 40px;
    height: 56px;
    font-size: 18px;
    border-radius: 28px;
  }

  &--slim {
    padding: 12px 32px;
    gap: 12px;
    border: 2px solid $tuna;
    border-radius: 64px;
  }

  &--breadcrumb {
    color: $snow-white;
    background-color: $tuna;

    &:hover {
      background-color: lighten($tuna, 50%);
      border-color: lighten($tuna, 50%);
    }

    &:focus {
      border-color: $athens-gray;
    }

    &--outlined {
      color: $tuna;
      background-color: transparent;
      border: 2px solid $tuna;

      &:hover {
        color: lighten($tuna, 50%);
        border-color: lighten($tuna, 50%);
      }

      &:focus {
        border-color: $athens-gray;
      }
    }

    &--noborder {
      border-color: transparent;
      background-color: transparent;
    }
  }

  &--primary {
    color: $snow-white;
    border: 2px solid $primary-bg;
    background-color: $primary-bg;

    &:hover {
      background-color: $primary-bg-hover;
      border-color: $primary-bg-hover;
    }

    &:focus {
      background-color: $primary-bg-hover;
      border-color: $primary-brd-focus;
    }
  }

  &--primary--outlined {
    color: $primary-bg;
    border: 2px solid $primary-bg;
    background-color: $snow-white;

    &:hover {
      opacity: 50%;
    }

    &:focus {
      border-color: $primary-brd-focus;
    }
  }

  &--secondary {
    color: $primary-bg;
    border: 2px solid $snow-white;
    background-color: $snow-white;

    &:hover {
      background-color: darken($snow-white, 10%);
    }

    &:focus {
      background-color: $snow-white;
      border-color: $primary-brd-focus;
    }

    &--outlined {
      border: 2px solid $primary-bg;
      background-color: $snow-white;
      color: $primary-bg;
    }
  }

  &--tertiary {
    color: $snow-white;
    border: 2px solid $tertiary-bg;
    background-color: $tertiary-bg;

    &:hover {
      opacity: 75%;
    }

    &:focus {
      border-color: $tertiary-brd-focus;
    }
  }

  &--tertiary--outlined {
    color: $tertiary-bg;
    border: 2px solid $tertiary-bg;
    background-color: $snow-white;

    &:hover {
      background-color: darken($snow-white, 10%);
    }

    &:focus {
      border-color: $tertiary-brd-focus;
    }
  }

  &--account {
    background: $light-pink;
    color: $cherry-red;

    &:hover {
      background-color: darken($light-pink, 10%);
    }

    &:focus {
      border-color: $tertiary-brd-focus;
    }
  }

  &:disabled {
    background-color: $jumbo;
    cursor: not-allowed;
    border: 2px solid $jumbo;

    &:hover {
      opacity: 90%;
    }
  }
}
</style>
