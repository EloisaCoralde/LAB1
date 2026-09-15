const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const countLabel = document.getElementById("task-count");

function updateCount() {
  const total = list.querySelectorAll("li").length;
  countLabel.textContent = `Total tasks: ${total}`;
}

function createTaskItem(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✕";
  removeBtn.className = "remove-btn";
  removeBtn.addEventListener("click", () => {
    li.remove();
    updateCount();
  });

  li.appendChild(span);
  li.appendChild(removeBtn);
  return li;
}

// Wire up existing static list items (from the original HTML)
list.querySelectorAll("li").forEach((li) => {
  const text = li.textContent;
  li.textContent = "";
  const newLi = createTaskItem(text);
  li.replaceWith(newLi);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (value === "") return;

  const newItem = createTaskItem(value);
  list.appendChild(newItem);
  input.value = "";
  updateCount();
});

updateCount();