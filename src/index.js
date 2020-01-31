import {
  db,
  connect,
  connector,
  withInputSignals,
  trigger,
  handler,
  triggerImmediately,
} from "flyps";
import { mount, h } from "flyps-dom-snabbdom";

/**
 * Initialize the data store
 */
handler("initialize", () => ({
  db: {
    todos: [],
    newTodo: "",
    filter: null,
  },
}));

/**
 * Todos
 */
connector("todos", withInputSignals(() => db, db => db.todos));

connector(
  "todo-count",
  withInputSignals(() => connect("todos"), todos => todos.length),
);

connector(
  "active-todo-count",
  withInputSignals(
    () => connect("todos"),
    todos => todos.filter(todo => !todo.completed).length,
  ),
);

connector(
  "completed-todo-count",
  withInputSignals(
    () => [connect("todo-count"), connect("active-todo-count")],
    ([todoCount, activeTodoCount]) => todoCount - activeTodoCount,
  ),
);

handler("todos/add", ({ db }, _, entry) => ({
  db: { ...db, todos: [...db.todos, entry] },
}));

handler("todos/destroy", ({ db }, _, entry) => ({
  db: {
    ...db,
    todos: [...db.todos.filter(todo => todo !== entry)],
  },
}));

handler("todos/toggle", ({ db }, _, entry) => ({
  db: {
    ...db,
    todos: [
      ...db.todos.map(todo =>
        todo === entry ? { ...todo, completed: !todo.completed } : todo,
      ),
    ],
  },
}));

handler("todos/toggle-all", ({ db }, _, completed) => ({
  db: {
    ...db,
    todos: db.todos.map(todo => {
      return { ...todo, completed: completed };
    }),
  },
}));

handler("todos/clear-completed", ({ db }) => {
  return {
    db: { ...db, todos: db.todos.filter(todo => !todo.completed) },
  };
});

/**
 * Filtered todos
 */
connector("filter", withInputSignals(() => db, db => db.filter));

connector(
  "filtered-todos",
  withInputSignals(
    () => [connect("todos"), connect("filter")],
    ([todos, filter]) =>
      todos.filter(
        todo =>
          !filter ||
          (filter === "active" && !todo.completed) ||
          (filter === "completed" && todo.completed),
      ),
  ),
);

handler("filter/change", ({ db }, _, filter) => ({
  db: { ...db, filter },
}));

/**
 * New todo
 */
connector("new-todo", withInputSignals(() => db, db => db.newTodo));

handler("new-todo/clear", ({ db }) => ({
  db: { ...db, newTodo: "" },
}));

handler("new-todo/update", ({ db }, _, value) => ({
  db: { ...db, newTodo: value },
}));

handler("new-todo/save", ({ db }) => {
  if (db.newTodo) {
    return {
      db: { ...db, newTodo: "" },
      trigger: ["todos/add", { text: db.newTodo }],
    };
  }
});

/**
 * App view that gets mounted into the DOM
 */
let app = withInputSignals(
  () => connect("todo-count"),
  todoCount => {
    return h("section.todoapp", [
      header(),
      todoCount > 0 ? main() : null,
      todoCount > 0 ? footer() : null,
    ]);
  },
);

/**
 * Header view
 */
let header = withInputSignals(
  () => connect("new-todo"),
  newTodo => {
    return h("section.header", [h("h1", "todos"), todoInput(newTodo)]);
  },
);

let todoInput = newTodo => {
  return h("input.new-todo", {
    attrs: {
      type: "text",
      placeholder: "What needs to be done?",
      autofocus: true,
      value: newTodo,
    },
    hook: {
      update: (o, n) => (n.elm.value = newTodo),
    },
    on: {
      keydown: e => {
        switch (e.which) {
          case 13: // Return
            trigger("new-todo/save");
            break;
          case 27: // ESC
            trigger("new-todo/clear");
            break;
        }
      },
      input: e => trigger("new-todo/update", e.target.value),
    },
  });
};

let toggleAll = withInputSignals(
  () => connect("active-todo-count"),
  activeTodoCount => {
    return h("div", [
      h("input#toggle-all.toggle-all", {
        attrs: { type: "checkbox", checked: activeTodoCount === 0 },
        on: {
          change: e => trigger("todos/toggle-all", e.target.checked),
        },
        hook: {
          update: (o, n) => (n.elm.checked = activeTodoCount === 0),
        },
      }),
      h("label", { attrs: { for: "toggle-all" } }),
    ]);
  },
);

/**
 * Main view
 */
let main = withInputSignals(
  () => [connect("filtered-todos"), connect("active-todo-count")],
  ([filteredTodos, activeTodoCount]) => {
    return h("section.main", [
      toggleAll(activeTodoCount),
      h("ul.todo-list", filteredTodos.map(todoItem)),
    ]);
  },
);

let todoItem = todo => {
  return h(
    "li",
    {
      class: { completed: todo.completed },
    },
    [
      h("input.toggle", {
        attrs: { type: "checkbox", checked: todo.completed },
        on: {
          change: () => trigger("todos/toggle", todo),
        },
        hook: {
          update: (o, n) => (n.elm.checked = todo.completed),
        },
      }),
      h("label", todo.text),
      h("button.destroy", {
        on: {
          click: () => trigger("todos/destroy", todo),
        },
      }),
    ],
  );
};

/**
 * Footer view
 */
let footer = withInputSignals(
  () => [
    connect("active-todo-count"),
    connect("completed-todo-count"),
    connect("filter"),
  ],
  ([activeTodoCount, completedTodoCount, filter]) => {
    return h("section.footer", [
      todoCount(activeTodoCount),
      filters(filter),
      completedTodoCount > 0 ? clearCompleted() : null,
    ]);
  },
);

let todoCount = activeTodoCount => {
  return h(
    "span.todo-count",
    `${activeTodoCount} item${activeTodoCount === 1 ? "" : "s"} left`,
  );
};

let filters = filter => {
  return h("ul.filters", [
    h(
      "li",
      h(
        "a",
        {
          attrs: { href: "#" },
          class: { selected: !filter },
          on: { click: () => trigger("filter/change", null) },
        },
        "All",
      ),
    ),
    h(
      "li",
      h(
        "a",
        {
          attrs: { href: "#" },
          class: { selected: filter === "active" },
          on: { click: () => trigger("filter/change", "active") },
        },
        "Active",
      ),
    ),
    h(
      "li",
      h(
        "a",
        {
          attrs: { href: "#" },
          class: { selected: filter === "completed" },
          on: { click: () => trigger("filter/change", "completed") },
        },
        "Completed",
      ),
    ),
  ]);
};

let clearCompleted = () => {
  return h(
    "button.clear-completed",
    {
      on: {
        click: () => trigger("todos/clear-completed"),
      },
    },
    "Clear completed",
  );
};

/**
 * Main export, initialize data store and mount app into DOM
 */
export function init() {
  triggerImmediately("initialize");
  mount(document.querySelector("#app"), app);
}
