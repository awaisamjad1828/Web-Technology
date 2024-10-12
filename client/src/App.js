// src/App.js
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components//Main/index";
import Signup from "./components/Singup/index";
import Login from "./components/Login/index";
import QuizSelection from './components/Main/QuizSelection';
import QuizWindow from './components/Main/QuizWindow';

function App() {
    const user = localStorage.getItem("token");

    return ( <
        Routes > {
            user ? ( <
                >
                <
                Route path = "/"
                exact element = { < Main / > }
                /> <
                Route path = "/quiz/:subject"
                element = { < QuizSelection / > }
                /> <
                Route path = "/quiz/:subject/:quizId"
                element = { < QuizWindow / > }
                /> < /
                >
            ) : ( <
                Route path = "/"
                element = { < Navigate replace to = "/login" / > }
                />
            )
        }

        <
        Route path = "/signup"
        exact element = { < Signup / > }
        /> <
        Route path = "/login"
        exact element = { < Login / > }
        /> < /
        Routes >
    );
}

export default App;