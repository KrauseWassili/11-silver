# **React Testing Library Cheatsheet**

| **Category**              | **Method / Usage**                               | **Example**                             |
| ------------------------- | ------------------------------------------------ | --------------------------------------- |
| **Render Component**      | `render(<Component />)`                          | `render(<MyComponent />)`               |
| **Destructure utilities** | `{ container, rerender, unmount } = render(...)` | `const { container } = render(<App />)` |

---

## **Queries (screen)**

| **Query Type** | **Synchronous**        | **Nullable**             | **Async**               | **Example**                                 |
| -------------- | ---------------------- | ------------------------ | ----------------------- | ------------------------------------------- |
| By text        | `getByText`            | `queryByText`            | `findByText`            | `screen.getByText("Hello")`                 |
| By role        | `getByRole`            | `queryByRole`            | `findByRole`            | `screen.getByRole("button")`                |
| By label       | `getByLabelText`       | `queryByLabelText`       | `findByLabelText`       | `screen.getByLabelText("Username")`         |
| By placeholder | `getByPlaceholderText` | `queryByPlaceholderText` | `findByPlaceholderText` | `screen.getByPlaceholderText("Enter name")` |
| By alt text    | `getByAltText`         | `queryByAltText`         | `findByAltText`         | `screen.getByAltText("Profile Pic")`        |
| By title       | `getByTitle`           | `queryByTitle`           | `findByTitle`           | `screen.getByTitle("Close")`                |

> ⚡ **Tip:** Use `findBy*` for async content (like after fetch).

---

## **Events (`fireEvent`)**

| **Event**    | **Usage Example**                                                                    |
| ------------ | ------------------------------------------------------------------------------------ |
| Click        | `fireEvent.click(screen.getByText("Submit"))`                                        |
| Input change | `fireEvent.change(screen.getByLabelText("Username"), { target: { value: "John" } })` |
| Focus / Blur | `fireEvent.focus(input)` / `fireEvent.blur(input)`                                   |
| Keyboard     | `fireEvent.keyDown(input, { key: "Enter", code: "Enter" })`                          |
| Mouse        | `fireEvent.mouseOver(element)` / `fireEvent.mouseOut(element)`                       |

> 🔹 For more realistic user events, consider `userEvent` from `@testing-library/user-event`.

---

## **Assertions (`jest-dom`)**

| **Matcher**            | **Example**                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| Element exists         | `expect(screen.getByText("Hello")).toBeInTheDocument()`          |
| Element does not exist | `expect(screen.queryByText("Loading")).not.toBeInTheDocument()`  |
| Input value            | `expect(screen.getByLabelText("Username")).toHaveValue("John")`  |
| Text content           | `expect(screen.getByRole("button")).toHaveTextContent("Submit")` |
| Visibility             | `expect(element).toBeVisible()`                                  |

---

## **Common Patterns**

```javascript
// Input interaction
const input = screen.getByLabelText("Username");
fireEvent.change(input, { target: { value: "Alice" } });
expect(input.value).toBe("Alice");

// Button click
const button = screen.getByRole("button", { name: /submit/i });
fireEvent.click(button);
expect(mockFn).toHaveBeenCalled();

// Async testing
await screen.findByText("Data loaded");
```

