import { MainLayout } from "./pages/MainLayout";
import { Home } from "./pages/Home";
import { Books } from "./pages/Books";
import { Bookshelves } from "./pages/Bookshelves";
import { Bookshelf } from "./pages/Bookshelf";
import { Book } from "./pages/Book";
import { Route, Routes } from "react-router";
import { PrivateLayout } from "./components/PrivateLayout";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:bookId" element={<Book />} />
        <Route element={<PrivateLayout />}>
          <Route path="/bookshelves" element={<Bookshelves />} />
          <Route path="/bookshelves/:shelfId" element={<Bookshelf />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
