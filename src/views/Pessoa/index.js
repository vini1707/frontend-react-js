import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import api from '../../services/api';

export default function Pessoa() {
    const [nome, setNome] = useState("");
    const [salario, setSalario] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [pessoas, setPessoas] = useState([]);
    const [idEdicao, setIdEdicao] = useState(null);
    const [idCidade, setIdCidade] = useState("");
    const [cidades, setCidades] = useState([]);

    const navigate = useNavigate();

    function navigateHome() {
        navigate("/");
    }

    function navigateCidade() {
        navigate("/cidade");
    }

    const carregarCidades = async () => {
        try {
            const response = await api.get("/cidade/all");
            setCidades(response.data);
        } catch (error) {
            console.error("Erro ao carregar cidades", error);
        }
    };

    const carregarPessoas = async () => {
        try {
            const response = await api.get("/pessoa/all");
            setPessoas(response.data);
        } catch (error) {
            console.error("Erro ao carregar pessoas", error);
        }
    };

    useEffect(() => {
        carregarPessoas();
        carregarCidades();
    }, []);

    const salvar = async (e) => {
        e.preventDefault();

        try {
            const pessoa = {
                nome,
                salario,
                nascimento,
                idCidade
            };

            if (idEdicao) {
                await api.put(
                    `/pessoa/${idEdicao}`,
                    pessoa
                );
            } else {
                await api.post(
                    "/pessoa",
                    pessoa
                );
            }

            limparFormulario();
            carregarPessoas();

        } catch (error) {
            console.error("Erro ao salvar pessoa", error);
        }
    };

    const limparFormulario = () => {
        setIdEdicao(null);
        setNome("");
        setSalario("");
        setNascimento("");
        setIdCidade("");
    };


    const editar = (pessoa) => {
        setIdEdicao(pessoa.id);
        setNome(pessoa.nome);
        setSalario(pessoa.salario);
        setIdCidade(pessoa.idCidade);

        const data = pessoa.nascimento
            ? pessoa.nascimento.split("T")[0]
            : "";

        setNascimento(data);
    };

    const excluir = async (id) => {
        try {
            await api.delete(`/pessoa/${id}`);
            carregarPessoas();
        } catch (error) {
            console.error("Erro ao excluir pessoa", error);
        }
    };

    return (
        <>
            <Header />

            <div className="container">
                <h1><em>Cadastro de Pessoas</em></h1>

                <form onSubmit={salvar}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) =>
                            setNome(e.target.value)
                        }
                        required
                    />

                    <input
                        type="number"
                        step="0.01"
                        placeholder="Salário"
                        value={salario}
                        onChange={(e) =>
                            setSalario(e.target.value)
                        }
                        required
                    />

                    <input
                        type="date"
                        value={nascimento}
                        onChange={(e) =>
                            setNascimento(e.target.value)
                        }
                        required
                    />

                    <select
                        value={idCidade}
                        onChange={(e) => setIdCidade(e.target.value)}
                        required
                    >
                        <option value="">
                            Selecione uma cidade
                        </option>

                        {cidades.map((cidade) => (
                            <option
                                key={cidade.id}
                                value={cidade.id}
                            >
                                {cidade.nome} - {cidade.uf}
                            </option>
                        ))}
                    </select>

                    <button type="submit">
                        {idEdicao
                            ? "Atualizar"
                            : "Cadastrar"}
                    </button>

                    {idEdicao && (
                        <button
                            type="button"
                            onClick={limparFormulario}
                        >
                            Cancelar
                        </button>
                    )}
                </form>

                <hr />

                <table>
                    <thead>
                        <tr>
                            <th><em>ID</em></th>
                            <th><em>Nome</em></th>
                            <th><em>Salário</em></th>
                            <th><em>Nascimento</em></th>
                            <th><em>Cidade</em></th>
                            <th><em>Ações</em></th>
                        </tr>
                    </thead>

                    <tbody>
                        {pessoas.map((pessoa) => (
                            <tr key={pessoa.id}>
                                <td>{pessoa.id}</td>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.salario}</td>
                                <td>
                                    {new Date(
                                        pessoa.nascimento
                                    ).toLocaleDateString(
                                        "pt-BR"
                                    )}
                                </td>
                                <td>{pessoa.idCidade}</td>
                                <td>
                                    <button className="btn-editar" onClick={() =>
                                            editar(pessoa)
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn-excluir" onClick={() => excluir(pessoa.id)
                                        }
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="botoes">
                    <input
                        type="button"
                        value="Home"
                        onClick={navigateHome}
                    />

                    <input
                        type="button"
                        value="Manutenção de Cidades"
                        onClick={navigateCidade}
                    />
                </div>
            </div>

            <Footer />
        </>
    );
}