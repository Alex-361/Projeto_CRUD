import React, { useState } from 'react';

function ItemList({ items, onUpdate, onRemove }) {
    const [editIndex, setEditIndex] = useState(null);
    const [updateValue, setUpdateValue] = useState('');

    const handleEdit = (index, currentValue) => {
        setEditIndex(index);         // Define o índice do item que será editado
        setUpdateValue(currentValue); // Preenche o campo com o valor atual do item
    };

    const handleUpdate = (index) => {
        onUpdate(index, updateValue); // Atualiza o item com o novo valor
        setEditIndex(null);           // Sai do modo de edição
        setUpdateValue('');           // Limpa o campo de atualização
    };

    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            // Campo de entrada para edição do item específico
                            <>
                                <input
                                    type="text"
                                    value={updateValue}
                                    onChange={(e) => setUpdateValue(e.target.value)}
                                />
                                <button onClick={() => handleUpdate(index)}>Salvar</button>
                            </>
                        ) : (
                            // Exibe o item normalmente
                            <>
                                {item}
                                <button className="small-button" onClick={() => handleEdit(index, item)}>Atualizar</button>
                                <button className="small-button" onClick={() => onRemove(index)}>Remover</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;
