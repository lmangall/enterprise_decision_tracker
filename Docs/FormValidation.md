### Form Validation Rules 

Within `DecisionModal.tsx` also `validation.ts` for duplicates

1. **Title**: Required field. The form will show an error message ("Title is required") if this field is empty. The title must also be at least 5 characters long.before adding to the context validation.ts will be called to check if a Decision with an identic field exist

2. **Description**: No specific validation rules are applied. The description field is optional, so when looking for duplicates this is ommited if null

3. **Measurable Goal**: Required field. The form will show an error message ("Measurable goal is required") if this field is empty. The measurable goal must also be at least 10 characters long. before adding to the context validation.ts will be called to check if a Decision with an identic field exist

4. **Target Date**: No specific validation rules are applied, but it's displayed as a read-only field once a date is selected. It's an difficult field to manage due to the type (text, iso...) and differences between db and React.

5. **Status**: Required field. The form will show an error message ("Status is required") if this field is not selected. TODO: get rid of the error message: anyway the user has "pending" by default... (sorry, short on time). When the status is set to "completed" the user is invited (toast) to add a comment

6. **Comment**:  The comments filled is only shown when the status is set to "completed".

7. **Goal met**:  Disable the Goal Met Switch: The switch to toggle goal_met is visible only whenthe status is set to "completed." toggling it is optional.


### Explanation of React Hook

**React Hook Form** is a library designed to simplify form handling in React applications. It helps manage form state, validation, and submission in a more efficient and straightforward way.

#### 1. **Setting Up React Hook Form**

Here's the text revised to use both third and first person perspectives:

---

React Hook Form must be imported and initialized within the component. For instance, one can use `useForm` to set up the form like this:

```tsx
const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
  defaultValues: {
    title: "",
    description: "",
    measurableGoal: "",
    targetDate: null,
    status: "pending",
  },
});
```

- `control`: This object is used to connect input fields to React Hook Form.
- `handleSubmit`: This function handles form submission and takes the submission handler function (`onSubmit`) as an argument.
- `setValue`: This function is used to programmatically set the value of a field.
- `watch`: This function allows observing changes to form fields.
- `formState: { errors }`: This object contains error messages for each form field.

#### 2. **Using `Controller` to Manage Inputs**

`Controller` is a component provided by React Hook Form that integrates controlled components (like inputs) with the form state:

```tsx
<Controller
  name="title"
  control={control}
  rules={{
    required: "Title is required",
    minLength: {
      value: 4,
      message: "Title must be at least 5 characters long",
    },
  }}
  render={({ field }) => (
    <div>
      <Input
        id="title"
        placeholder="Title of the decision"
        {...field}
        className={`border ${errors.title ? "border-red-500" : "border-gray-300"}`}
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}
    </div>
  )}
/>
```

- `name`: The name of the field in the form state.
- `control`: Connects the input to the React Hook Form instance.
- `rules`: Validation rules for the field. For example, `required` and `minLength` specify that the field is required and must have at least 5 characters.
- `render`: This function returns the actual input component and receives a `field` object that includes props and methods to control the input.

#### 3. **Error Handling with `formState.errors`**

The `errors` object in `formState` contains validation errors for each field. It is used to display error messages when validation fails:

```tsx
{errors.title && (
  <p className="text-red-500 text-sm">{errors.title.message}</p>
)}
```

- `errors.title` is checked to see if there is an error associated with the "title" field.
- If there is an error, the message from `errors.title.message` is displayed to the user.

#### **Summary**

1. **Initialization**: Set up the form with `useForm`, defining default values and handling functions.

2. **Field Management**: Use `Controller` to wrap each field, ensuring that React Hook Form manages the field’s value, validation, and error messages.

3. **Validation Rules**: Define validation rules within `Controller` using the `rules` property.

4. **Error Handling**: Access and display validation errors using `formState.errors`.
