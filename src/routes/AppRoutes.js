import { Route, Routes } from 'react-router-dom';

import Cidade from '../views/Cidade/index';
import Pessoa from '../views/Pessoa/index';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" exact element={<Cidade />} />
            <Route path="/Pessoa" exact element={<Pessoa />} />
        </Routes>
    )
}