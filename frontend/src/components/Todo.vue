<script setup>
import axios from "axios";
import SituationEvaluation from '@/components/SituationEvaluation.vue'
import {states} from '@/stateManager.js'
import BaseDialog from '@/components/BaseDialog.vue'
import ShmuWarningsForDetail from '@/components/ShmuWarningsForDetail.vue'
import TodoForDetail from '@/components/TodoForDetail.vue'
</script>
<template>
  <section class="todo">
    <div class="container">
      <h3 class="todo__title">Úlohy</h3>
      <ul class="todo__list">
        <li
          :class="[
            'todo__list__item',
            `todo__list__item--${todo.alertColor}`,
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
          <span class="todo__until">{{ todo.until }}</span>
          <div v-if="todo.actionItems" class="todo__list__item__actions">
            <ul class="todo__list__inner__ul">
              <li
                class="todo__list__inner__check"
                v-for="(actionItem, index) in todo.actionItems"
                :key="index"
              >
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
                {{ actionItem
                }}<span>(<a class="camlink" href="#">live camera</a>)</span>
              </li>
            </ul>
          </div>

          <div v-if="todo.infoOpen" class="todo__list__item__info">
            <span>Dôvod: </span>
            <p class="todo__list__premail">{{ todo.alertName }}</p>
            <button class="email__popup" @click="emailPopUpOpen">
              Pošlite im email
            </button>
          </div>

          <BaseDialog :open="states.currentDialog2">
            <SituationEvaluation />
          </BaseDialog>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import {apiServer} from "@/apiServer.js";

export default {
  name: "Todo",
  async mounted() {
    // pretriedit
    let adress =
      this.$route.path === "/dispatch"
        ? apiServer.baseUrl + "/checklists/dispatch"
        : apiServer.baseUrl + "/checklists";
    let res = await axios.get(adress);
    let data = res.data;
    console.log(data);
    this.todoList = data.items;
    // save this to cookies
  },
  data() {
    return {
      todoList: [],
      dialogShown: false,
    };
  },
  methods: {
    checkboxClicked(index) {
      // put the tick there

      if (!this.todoList[index].done) {
        this.todoList[index].done = true;
        states.currentDialog2 = true
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
  padding: 0 1.2rem;
  min-width: 40rem;
  max-width: 40rem;
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

    &__inner__check {
      display: flex;
      gap: 1.2rem;
      align-items: center;
    }

    &__inner__ul {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      text-align: left;
      width: 100%;
      align-items: start;
    }
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
      &__actions {
        padding-left: 3.6rem;
        width: 100%;
      }

      &__normal {
        display: grid;
        text-overflow: ellipsis;
        white-space: nowrap; /* keeps the text in a single line */
        overflow: hidden;
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
}
.todo__list__premail {
  margin-bottom: 0.8rem;
}
.crossEm {
  text-decoration: line-through;
}
.camlink {
  text-decoration: underline;
  color: rgb(0, 153, 255);
}
.todo__until {
  font-size: 1.4rem;
  color: #a1a1aa;
  transform: translateY(-6px);
  line-height: 0.2;
}

.email__popup {
  background-color: transparent;
  border: none;
  outline: none;
  color: black;
  font-family: "SfPro-M", sans-serif;
  background-color: red;
  padding: 0.8rem 1.2rem;
  border-radius: $border-radius-medium;
}
</style>
