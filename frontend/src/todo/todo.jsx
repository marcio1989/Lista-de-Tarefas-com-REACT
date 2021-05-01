import React, { Component } from 'react'
import axios from 'axios' // biblioteca axios 

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'
const URL = 'http://localhost:3003/api/todos'//backend rodando na porta 3003

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = { description: '',list: [] } //lista um array vázio
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this) // salvando novo projeto
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleRemove = this.handleRemove.bind(this)

        this.refresh()
    }

    refresh(description = '') {//método para pegar a lista atualizada
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`) // sort=-createDAt: ordenando de forma decrescente 
            .then(resp => this.setState({...this.state, description, list: resp.data}))
    }
    handleSearch() { // método para consultar a lista 
        this.refresh(this.state.description)
        
    }

    handleChange(e) {
        this.setState({...this.state, description: e.target.value })// método para o campo onde é digitado
    }

    handleAdd() { //método para salvar o novo projeto
        const description = this.state.description
        axios.post(URL, { description })
            .then(resp => this.refresh())//refresh: mostra a lista atualizada sempre quando for adicionado novo projeto   
    }

    handleRemove(todo) {// método para remover o projeto
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsDone(todo) {// método para marcar a tarefa conclúida ou restaurar a tarefa
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })//PUT: editando a tarefa para concluída ou não
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo) { // método chamando o PUT usando URL e id
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => this.refresh(this.state.description))
    }
    
    handleClear() {//método para limpar a lista
        this.refresh()
    }
    
    render() {
        return (
            <div>
                <PageHeader name='Mini Projeto' small='Cadastro'></PageHeader>
                <TodoForm 
                    description={this.state.description}
                    handleChange={this.handleChange} // altarando o estado atual
                    handleAdd={this.handleAdd} //método para adicionar
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear} />
                <TodoList 
                    list={this.state.list}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    handleRemove={this.handleRemove} />
            </div>
        )
    }
}