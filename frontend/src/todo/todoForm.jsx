import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => {
    const keyHandler = (e) => {
        if (e.key === 'Enter') {//se o digitar ENTER salva o novo projeto
            e.shiftKey ? props.handleSearch() : props.handleAdd() 
        } else if (e.key === 'Escape') {//shift + enter faz a pesquisa
            props.handleClear()// ESC para limpar a tabela e voltar para o estado atual
        }
    }

    return (
        <div role='form' className='todoForm'>
            <Grid cols='12 9 10'>
                <input id='description' className='form-control'
                    placeholder='Adicione o projeto...'
                    onChange={props.handleChange}
                    onKeyUp={keyHandler}
                    value={props.description}>
                </input>        
            </Grid>
            
            <Grid cols='12 3 2'>
                <IconButton style='primary' icon='plus'//butão de adicionar
                    onClick={props.handleAdd}></IconButton>
                <IconButton style='info' icon='search'// butão de consultar
                    onClick={props.handleSearch}></IconButton>
                <IconButton style='default' icon='close' // butão de limpar
                    onClick={props.handleClear}></IconButton>
            </Grid>
        </div>
    )
}