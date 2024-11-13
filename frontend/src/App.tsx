import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Blog, Blogs, Signin, Signup } from "./pages";

function App() {
  return (
    <div className="font-roboto">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
