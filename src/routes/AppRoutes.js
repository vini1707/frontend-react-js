import { Route, Routes } from 'react-router-dom';

import Cidade from '../views/Cidade/index';
import Pessoa from '../views/Pessoa/index';
import Home from '../views/Home/index';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/Cidade" exact element={<Cidade />} />
            <Route path="/Pessoa" exact element={<Pessoa />} />
            <Route path="/" exact element={<Home />} />
        </Routes>
    )
}