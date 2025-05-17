import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import TaskList from "../../components/TaskList.vue";
import { createVuetify } from "vuetify";
import { setActivePinia, createPinia } from "pinia";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { Task } from "~/entities/Task.entity";

const vuetify = createVuetify();

const tasks = [
  Task.fromJson({
    id: 1,
    title: "Task 1",
    is_completed: false,
    due_date: "2024-01-01",
  }),
  Task.fromJson({
    id: 2,
    title: "Task 2",
    is_completed: true,
    due_date: "2024-01-02",
  }),
];

describe("TaskList", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders a list of tasks", () => {
    const wrapper = mount(TaskList, {
      props: { tasks, loading: false },
      global: {
        plugins: [vuetify],
        stubs: {
            'v-progress-circular': true,
            'v-icon': true,
            'v-dialog': true,
            'TaskDetail': true
          }
      }
    });
    expect(wrapper.text()).toContain("Task 1");
    expect(wrapper.text()).toContain("Task 2");
  });

  it("shows loading spinner when loading", () => {
    const wrapper = mount(TaskList, {
      props: { tasks: [], loading: true },
      global: {
        plugins: [vuetify],
        stubs: {
            'v-progress-circular': true,
            'v-icon': true,
            'v-dialog': true,
            'TaskDetail': true
          }
      }
    });
    expect(wrapper.find('v-progress-circular-stub').exists()).toBe(true)
  });
});
