import { Provider } from "@/components/ui/provider"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "@/App"
import TaskDetailPage from "@/pages/TaskDetailPage"
import RulesCrudPage from "./pages/RulesCrudPage"
import TasksCrudPage from "./pages/TaskCrudPage"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<App />} />
          <Route path="/task/:id" element={<TaskDetailPage/>} />
          <Route path="/rules" element={<RulesCrudPage/>} />
          <Route path="/tasks" element={<TasksCrudPage/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)