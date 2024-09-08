
### **Additional notes***

```javascript
 const { control, handleSubmit } = useForm();
 ```
 we are destructuring this object to extract two specific properties: control and handleSubmit.

control
The control property is an object that contains methods and properties to control form inputs. It is used with the Controller component to connect form inputs to the form state managed by react-hook-form. The Controller component allows you to use any input component and connect it to the form state, making it easy to manage form inputs and their validation.

handleSubmit
The handleSubmit property is a function that handles form submission. It takes a callback function as an argument, which is called when the form is submitted. This callback function receives the form data as its argument, allowing you to process the form data as needed (e.g., sending it to a server, updating the UI, etc.).





milestones:

setup and test architecture
the combination of next and python took a while to setup (I wanted to do from scratch instead of using the template) there was some useless commits i squashed before I found the solution to having the FastAPI server runnin in production

- code basic ui


__________

Server:
python3 -m venv venv
source venv/bin/activate
python3 -m uvicorn api.index:app

_________________________________________________________




feat: A new feature or functionality.
fix: A bug fix.
docs: Documentation-only changes (e.g., README updates).
style: Code style changes (e.g., formatting, missing semicolons) that don't affect functionality.
refactor: Code changes that neither fix a bug nor add a feature, but improve the code structure.
perf: Changes to improve performance.
test: Adding or updating tests.
build: Changes that affect the build system or dependencies (e.g., package manager changes).
ci: Changes to CI configuration files and scripts (e.g., GitHub Actions, CircleCI).
chore: Routine tasks or maintenance that don't modify src or test files.
revert: Reverts a previous commit.






____________


1. Frontend (React app):
   - Store goals as part of the React app's state
   - This allows for quick updates and responsive UI

2. Backend (API + Database):
   - Make API calls to the database when goals are created, updated, or deleted
   - This ensures data persistence and allows for features like user authentication

This architecture makes sense because it combines the benefits of a responsive frontend with reliable data storage. Here's a more detailed look at how this could work:

1. When a user creates a goal:
   - Update the React state immediately
   - Make an API call to create the goal in the database
   - Update the React state with the response (e.g., to get an ID assigned by the database)

2. When a user updates a goal:
   - Update the React state immediately
   - Make an API call to update the goal in the database
   - Handle any errors (e.g., if the update fails, revert the state)

3. When a user deletes a goal:
   - Remove the goal from React state
   - Make an API call to delete the goal from the database
   - Handle any errors (e.g., if the deletion fails, add the goal back to state)

4. When the app loads:
   - Fetch goals from the database via an API call
   - Populate the React state with the fetched goals

This approach gives  the best of both worlds: a responsive UI and reliable data storage. It's a common pattern in modern web development, often referred to as "optimistic UI updates" when you update the UI before the server confirms the change.







