import React, { useState, useEffect } from "react";
import './style.css';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import api from "../../services/api"

export default function Cidade() {
    const [nome, setNome] = useState("");
    const [uf, setUf] = useState("");
    const [cidades, setCidades] = useState([]);
    const [idEdicao, setIdEdicao] = useState(null);

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
                <h1>Cadastro de Cidades</h1>
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
                            <th>ID</th>
                            <th>Nome</th>
                            <th>UF</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cidades.map((cidade) => (
                            <tr key={cidade.id}>
                                <td>{cidade.id}</td>
                                <td>{cidade.nome}</td>
                                <td>{cidade.uf}</td>
                                <td>
                                    
                                    <button onClick={() => editar(cidade)}>Editar</button>
                                    <button>Excluir</button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

        <Footer />
        </>
    );
}