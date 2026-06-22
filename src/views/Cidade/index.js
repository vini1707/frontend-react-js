import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import './style.css';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import api from "../../services/api"

export default function Cidade() {
    const [nome, setNome] = useState("");
    const [uf, setUf] = useState("");
    const [cidades, setCidades] = useState([]);
    const [idEdicao, setIdEdicao] = useState(null);
    const navigate = useNavigate();


    function navigateHome() {
        return navigate("/");
    }

    function navigatePessoa() {
        return navigate("/pessoa");
    }

    const carregarCidades = async() => {
        try {
            const response = await api.get("/Cidade/all");
            setCidades(response.data);
        } catch(error) {
            console.error("Erro ao carregar cidades", error);
        }
    };
    
    useEffect(() => {
        carregarCidades();
    },[]);

    const salvar = async (e) => {
        try {
            const cidade = {nome, uf};
            if(idEdicao) {
                await api.put(
                    `/cidade/${idEdicao}`,
                    cidade
                );
            } else {
                await api.post("/Cidade",
                    cidade
                );
            }
            limparFormulario();
            carregarCidades();
        } catch(error) {
            console.error("Erro ao carregar cidades", error);
        }
        
    }

    const limparFormulario = () => {
        setIdEdicao(null);
        setNome("");
        setUf("");
    }

    const editar = (cidade) => {
        setIdEdicao(cidade.id);
        setNome(cidade.nome);
        setUf(cidade.uf);
    }

    const excluir = async (id) => {
        try {
            await api.delete(`/cidade/${id}`);
            carregarCidades();
        } catch(error) {
            console.error("Erro ao excluir cidade", error);
        }
    }

    return (
        <>
        <Header />
            <div className="container">
                <h1><em>Cadastro de Cidades</em></h1>
                <form onSubmit={salvar} >
                    <input 
                        type="text"
                        placeholder="Nome da Cidade"
                        value={nome}
                        onChange={(e) => 
                            setNome(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="UF"
                        maxLength={2}
                        value={uf}
                        onChange={(e) => setUf(
                            e.target.value.toUpperCase()
                        )}       
                        required 
                    />

                    <button type='submit'>
                        {idEdicao ? 'Atualizar' : 'Cadastrar'}
                    </button>

                    {idEdicao && (
                        <button
                            type="button"
                            
                        >Cancelar
                        </button>
                    )}
                </form>
                <hr />

                <table>
                    <thead>
                        <tr>
                            <th><em>ID</em></th>
                            <th><em>Nome</em></th>
                            <th><em>UF</em></th>
                            <th><em>Ações</em></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cidades.map((cidade) => (
                            <tr key={cidade.id}>
                                <td>{cidade.id}</td>
                                <td>{cidade.nome}</td>
                                <td>{cidade.uf}</td>
                                <td>
                                    
                                    <button className="btn-editar" onClick={() => editar(cidade)}>Editar</button>
                                    <button className="btn-excluir" onClick={() => excluir(cidade.id)}>Excluir</button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>

                <div className="botoes">
                    <input
                        type='submit'
                        value='Home'
                        onClick={navigateHome}
                    />
                    <input
                        type='submit'
                        value='Manutenção de Pessoas'
                        onClick={navigatePessoa}
                    />
                </div>
            </div>

        <Footer />
        </>
    );
}

