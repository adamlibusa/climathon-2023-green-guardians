<script setup>
import axios from "axios";
</script>
<template>
  <section class="todo">
    <div class="container">
      <h3 class="todo__title">Vyhodnotenie situácie</h3>
      <ul class="todo__list">
        <li
          :class="[
            'todo__list__item',
          ]"
          v-for="(todo, index) in todoList"
          :key="index"
        >
          <div class="todo__list__item__normal">
            <button
              class="todo__list__checkbox"
              @click="checkboxClicked(index)"
            >
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
            <span :class="todo.done ? 'crossEm' : ''">{{ todo.subject }}</span>
            <button class="todo__list__info" @click="infoRequested(index)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </button>
          </div>

          <div v-if="todo.infoOpen" class="todo__list__item__info">
            <span>Dôvod: </span>
            <span>{{ todo.alertName }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  name: "Todo",
  data() {
    return {
      todoList: [
        {subject: 'Situácia je pod kontrolou', alertName: '', alertId: 1, alertColor: 'red', actionItems: []},
        {
          subject: 'Potrebné ďalšie monitorovanie - zatiaľ nejasné',
          alertName: '',
          alertId: 2,
          alertColor: 'red',
          actionItems: []
        },
        {subject: 'Situácia vyžaduje reakciu', alertName: '', alertId: 3, alertColor: 'red', actionItems: []},
      ]
    };
  },
  methods: {
    checkboxClicked(index) {
      // put the tick there
      if (!this.todoList[index].done) {
        this.todoList[index].done = true;
      } else {
        this.todoList[index].done = !this.todoList[index].done;
      }
      // update it in the data
    },

    infoRequested(index) {
      this.todoList[index].infoOpen = !this.todoList[index].infoOpen;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/abstracts.scss";

.todo {
  margin-inline-start: 200px;

  //padding: 0 1.2rem;
  min-width: 38rem;
  //max-width: 38rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .container {
    //padding: 1.8rem;
    border-radius: $border-radius-medium;
    background-color: $grey;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 0 1.2rem 1.2rem;

    &__item {
      border-radius: $border-radius-small;
      background-color: $light-grey;
      padding: 0.6rem 1.2rem 0.6rem 1rem;
      display: flex;
      align-items: center;
      gap: 1.2rem;
      display: flex;
      flex-direction: column;
      @include urgency-classes;

      &__normal {
        display: grid;
        grid-template-columns: auto 1fr auto;
        text-align: left;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        gap: 1.2rem;
        font-family: "SfPro-M", sans-serif;
        // padding-bottom: 0.4rem;
      }
      &__info {
        width: 100%;
        text-align: left;
        padding-left: 3.6rem;
        border-top: 1px solid $text-grey;
        padding-top: 0.4rem;
      }
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

    &__info {
      color: #fff;
      height: 2.4rem;
      width: 2.4rem;
      background-color: transparent;
      border: none;
      outline: none;
      margin-left: auto;
    }
  }

  &__title {
    padding: 0.5rem 1.2rem 1rem;
    text-align: left;
    margin-block-end: 0.5rem;
  }
}

.crossEm {
  text-decoration: line-through;
}
</style>
