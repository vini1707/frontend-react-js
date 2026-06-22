import React from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Home () {
    const navigate = useNavigate();

    function navigateCidade() {
        return navigate("/cidade");
    }

    function navigatePessoa() {
        return navigate("/pessoa");
    }

    return (
        <>
            <Header />
            <div className='container-Home'>
                 <a
                      onClick={navigateCidade}
                ><em>Manutenção de Cidades</em></a>
                <a onClick={navigatePessoa}><em>Manutenção de pessoas</em></a>
            </div>
            <Footer />
        </>
    )
}