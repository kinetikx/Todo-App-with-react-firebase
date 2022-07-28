import './App.css';
import Todo from "./Components/Todo/Todo";
import TodoContextProvider from "./Service/Firebase/firestore";

function App() {
    return (
        <TodoContextProvider>


            <div className="App">
                <Todo/>

            </div>
        </TodoContextProvider>

    );
}

export default App;
