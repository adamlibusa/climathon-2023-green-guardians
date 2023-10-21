<script setup>
import axios from "axios";
</script>
<template>
  <section class="todo">
    <div class="container">
      <h3 class="todo__title">Úlohy</h3>
      <ul class="todo__list">
        <li
          :class="['todo__list__item']"
          v-for="(todo, index) in todoList"
          :key="index"
        >
          <button class="todo__list__checkbox" @click="checkboxClicked(index)">
            <svg
              v-if="todo.done"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6 todo__svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
          {{ todo.subject }}
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  name: "Todo",
  async mounted() {
    let res = await axios.get("http://demo.climathon.sk:8080/checklists");
    let data = res.data;

    this.todoList = data.items;
    console.log(data.items);
  },
  data() {
    return {
      todoList: [],
    };
  },
  methods: {
    checkboxClicked(index) {
      // put the tick there
      this.todoList[index].done = true;
      // update it in the data
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/abstracts.scss";

.todo {
  padding: 0 1.2rem;
  min-width: 35rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .container {
    padding: 1.8rem;
    border-radius: $border-radius-medium;
    background-color: $grey;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    &__item {
      border-radius: $border-radius-small;
      background-color: $light-grey;
      padding: 0.6rem 1.2rem 0.6rem 0.6rem;
      display: flex;
      align-items: center;
      gap: 1.2rem;

      @include urgency-classes;
    }

    &__checkbox {
      color: $white;
      height: 2.4rem;
      width: 2.4rem;
      background-color: transparent;
      outline: none;
      border-radius: $border-radius-small;
      transition: all $animation--time-short;
      padding: 0.2rem;
      border: 2px solid $text-grey;

      &:hover {
        background-color: $text-grey;
      }
    }
  }
}
</style>
