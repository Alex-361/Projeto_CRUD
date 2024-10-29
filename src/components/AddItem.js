import React, { useState } from 'react';

function AddItem({ onAdd }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Verifica se o campo não está vazio
        if (input.trim() !== '') {
            onAdd(input);
            setInput('');
        } else {
            alert('O item não pode estar vazio!');  // Exibe um alerta se o campo estiver vazio
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Adicione um novo item"
            />
            <button type="submit">Adicionar Item</button>
        </form>
    );
}

export default AddItem;
