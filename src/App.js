import "./App.css";
import MainComponent from "./Layouts/MainComponent";
import { Route, Routes } from "react-router-dom";
import HomeComponent from "./pages/HomeComponent";
import LoginComponent from "./Components/Authentication/LoginComponent";
import SignupComponent from "./Components/Authentication/SignupComponent";
import ProtectedRoute from "./Utils/ProtectedRoute";
import CategoryComponent from "./Components/category/CategoryComponent";
import BoardComponent from "./Components/board/BoardComponent";
import TaskFormComponent from "./Components/board/TaskFormComponent";
import DoneComponent from "./Components/status/DoneComponent";
import ReviewComponent from "./Components/status/ReviewComponent";
import NotYetComponent from "./Components/status/NotYetComponent";
import ProgressComponent from "./Components/status/ProgressComponent";
import NotFoundComponent from "./Components/NotFound404/NotFoundComponent";

function App() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<LoginComponent />} />
        <Route path="register" element={<SignupComponent />} />
        <Route path="" element={<HomeComponent />} />
        <Route path="*" element = {<NotFoundComponent />} />

        <Route path="home" element={
          <ProtectedRoute>
            <MainComponent />
          </ProtectedRoute>
        }>

          <Route path="board" element={<BoardComponent />} > </Route>
          <Route path="addNewTask" element={<TaskFormComponent />} />
          <Route path="editTask" element={<TaskFormComponent />} />
          <Route path="category" element={<CategoryComponent />} />
          <Route path="task">
            <Route path="done" element={
              <ProtectedRoute>
                <DoneComponent />
              </ProtectedRoute>
            } />
            <Route path="review" element={
              <ProtectedRoute>
                <ReviewComponent />
              </ProtectedRoute>
            } />
            <Route path="not_yet" element={
              <ProtectedRoute>
                <NotYetComponent />
              </ProtectedRoute>
            } />
            <Route path="progress" element={
              <ProtectedRoute>
                <ProgressComponent />
              </ProtectedRoute>
            } />
          </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
