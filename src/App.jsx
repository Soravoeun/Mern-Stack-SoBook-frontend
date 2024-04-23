import React, { createContext, useContext, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

import ShowBook from "./pages/ShowBook";
import CreateBooks from "./pages/CreateBooks";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import HomeAdmin from "./pages/HomeAdmin";
import BooksUser from "./pages/BooksUser";
import Cart from "./pages/Cart";
import BookDescription from "./components/HomeUser/BookDescription";
import HomeUser from "./pages/HomeUser";
import BooksAdminCard from "./components/homeAdmin/BooksAdminCard";
import UserPage from "./pages/UserPage";
import CreateUser from "./pages/CreateUser";
import CardBook from "./components/HomeUser/CardBook";
import DeleteUser from "./pages/DeleteUser";
import ErrorPage from "./pages/ErrorPage";
import BooksUserCard from "./components/homeAdmin/BookUserCard";
import BooksAdminList from "./components/homeAdmin/BooksAdminList";
import Favoris from "./pages/Favoris";
import Reservation from "./pages/Reservation";

export const LoginContext = createContext(null);

function Template() {
  return (
    <>
      <NavBar />
      <div className="mt-32">
        <Outlet />
      </div>
    </>
  );
}

export default function App() {
  const [currentLogin, setCurrentLogin] = useState({
    isAdmin: localStorage.getItem("isAdmin") === "true",
    isConnected:
      localStorage.getItem("jwt") !== null &&
      localStorage.getItem("jwt") !== "",
  });
  console.log(currentLogin);

  return (
    <LoginContext.Provider value={{ currentLogin, setCurrentLogin }}>
      <Routes>
        {currentLogin.isAdmin ? (
          <>
            <Route element={<Template />}>
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/" element={<HomeUser />} />
              <Route path="/books/all" element={<BooksUser />} />
              <Route path="/books/operations" element={<BooksAdminList />} />
              {/* <Route path="/books/adminCard" element={<BooksAdminCard />} /> */}
              <Route path="/books/detail/:id" element={<ShowBook />} />
              <Route path="/books/create" element={<CreateBooks />} />
              <Route path="/books/edit/:id" element={<EditBook />} />
              <Route path="/books/delete/:id" element={<DeleteBook />} />
              <Route path="/users" element={<UserPage />} />
              <Route path="/users/create" element={<CreateUser />} />
              <Route path="/user/delete/:id" element={<DeleteUser />} />
              <Route path="/connexion" element={<Login />} />
              <Route path="/inscription" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favoris" element={<Favoris />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route
                path="/books/description/:id"
                element={<BookDescription />}
              />
            </Route>
          </>
        ) : (
          <>
            <Route element={<Template />}>
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/" element={<HomeUser />} />
              <Route path="/books/all" element={<BooksUser />} />
              <Route
                path="/books/description/:id"
                element={<BookDescription />}
              />
              <Route path="/books/detail/:id" element={<ShowBook />} />
              <Route path="/connexion" element={<Login />} />
              <Route path="/inscription" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/cardBook" element={<CardBook />} />
              <Route path="/favoris" element={<Favoris />} />
              <Route path="/reservation" element={<Reservation />} />
            </Route>
          </>
        )}
      </Routes>
    </LoginContext.Provider>
  );
}
