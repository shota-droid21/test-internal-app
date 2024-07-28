import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { initializeIcons } from "@fluentui/react";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";

import Layout from "./pages/layout/Layout";
import NoPage from "./pages/NoPage";
import Chat from "./pages/chat/Chat";
import DocSearch from "./pages/docsearch/DocSearch";
import History from "./pages/history/History";

initializeIcons();

export default function App() {
    return (
        <ChakraProvider>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Chat />} />
                        <Route path="docsearch" element={<DocSearch />} />
                        <Route path="history" element={<History />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </HashRouter>
        </ChakraProvider>
    );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
