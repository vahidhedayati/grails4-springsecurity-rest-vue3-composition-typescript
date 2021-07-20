<template>
  <div class="btn-group">
    <button
      type="button"
      class="btn btn-default mb-2"
      @click="onClickFirstPage"
      :disabled="isInFirstPage"
    >
      First
    </button>
    <button
      type="button"
      class="btn btn-default mb-2"
      @click="onClickPreviousPage"
      :disabled="isInFirstPage"
    >
      Previous
    </button>
    <template v-for="page in pages" :key="page.name">
      <button
        class="btn btn-default mb-2"
        type="button"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
      >
        {{ page.name }}
      </button>
    </template>
    <button
      type="button"
      class="btn btn-default mb-2"
      @click="onClickNextPage"
      :disabled="isInLastPage"
    >
      Next
    </button>
    <button
      type="button"
      class="btn btn-default mb-2"
      @click="onClickLastPage"
      :disabled="isInLastPage"
    >
      Last
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ComputedRef } from "vue";
export type PageType = {
  name: string | number;
  isDisabled: boolean | undefined;
};
export default defineComponent({
  name: "Pagination",
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const startPage: ComputedRef<number> = computed(() => {
      if (props.currentPage == 1) {
        return 1;
      }

      if (props.currentPage == props.totalPages) {
        return props.totalPages - props.maxVisibleButtons;
      }

      return props.currentPage - 1;
    });

    const pages: ComputedRef<PageType[]> = computed(() => {
      const range: PageType[] = [];
      for (
        let i = startPage.value;
        i <= Math.min(i + props.maxVisibleButtons - 1, props.totalPages);
        i += 1
      ) {
        if (i > 0) {
          range.push({
            name: i,
            isDisabled: i == props.currentPage,
          });
        }
      }

      return range;
    });

    const isInFirstPage = computed(() => {
      return props.currentPage == 1;
    });
    const isInLastPage = computed(() => {
      return props.currentPage == props.totalPages;
    });

    function onClickFirstPage() {
      context.emit("pagechanged", 1);
    }
    function onClickPreviousPage() {
      context.emit("pagechanged", props.currentPage - 1);
    }
    function onClickPage(page: number) {
      context.emit("pagechanged", page);
    }
    function onClickNextPage() {
      context.emit("pagechanged", props.currentPage + 1);
    }
    function onClickLastPage() {
      context.emit("pagechanged", props.totalPages);
    }
    function isPageActive(page: number) {
      return props.currentPage == page;
    }

    return {
      startPage,
      pages,
      isInFirstPage,
      isInLastPage,
      onClickFirstPage,
      onClickPreviousPage,
      onClickPage,
      onClickNextPage,
      onClickLastPage,
      isPageActive,
    };
  },
});
</script>

<style>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4aae9b;
  color: #ffffff;
}
</style>
