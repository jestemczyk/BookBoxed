import { MainLayout } from "./pages/MainLayout";
import { Home } from "./pages/Home";
import { Books } from "./pages/Books";
import { Bookshelves } from "./pages/Bookshelves";
import { Bookshelf } from "./pages/Bookshelf";
import { Book } from "./pages/Book";
import { Registration } from "./pages/Registration";
import { SignIn } from "./pages/SignIn";
import { Route, Routes } from "react-router";

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/bookshelves" element={<Bookshelves />} />
                <Route path="/bookshelves/:shelfId" element={<Bookshelf />} />
                <Route path="/book/:bookId" element={<Book />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/sign-in" element={<SignIn />} />
            </Route>
        </Routes>
    );
}

export default App;
