import React, { useState } from 'react';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import { saveToDatabase, updateDatabase, removeFromDatabase } from './api'; // Importe as funções necessárias
import './App.css';

function App() {
    const [items, setItems] = useState([]);
    const [savedItems, setSavedItems] = useState([]);
    const [message, setMessage] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');

    const handleAddItem = (item) => {
        setItems([...items, item]);
        setMessage('Há itens que ainda não foram enviados ao Banco de Dados.');
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Rolagem suave para o topo
    };

    const handleUpdateItem = (index, updatedItem) => {
        const newItems = [...items];
        newItems[index] = updatedItem;
        setItems(newItems);
        updateDatabase(updatedItem);
        setMessage('Há itens que ainda não foram enviados ao Banco de Dados.');
    };

    const handleRemoveItem = (index) => {
        const itemToRemove = items[index];
        const isItemSaved = savedItems.includes(itemToRemove);

        // Se o item está salvo no banco de dados, pergunta ao usuário se ele quer remover
        if (isItemSaved) {
            const confirmRemove = window.confirm("Você quer remover este item do Banco de Dados?");
            if (confirmRemove) {
                removeFromDatabase(itemToRemove); // Remove do banco de dados
                setSavedItems(savedItems.filter(item => item !== itemToRemove)); // Remove o item da lista de itens salvos
                setUpdateMessage('Clique no botão "Enviar Itens para o Banco de Dados" para atualizar seu Banco de Dados.');
            } else {
                return; // Se não confirmar, não faz nada
            }
        }

        // Remove o item da lista de itens
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);

        // Atualiza mensagens
        if (newItems.length === 0) {
            setMessage(''); // Se não houver mais itens, não deve haver mensagem
            setUpdateMessage(''); // Remova a mensagem de atualização
        } else {
            setMessage('Há itens que ainda não foram enviados ao Banco de Dados.');
        }
    };

    const handleSendAllToDatabase = async () => {
        if (items.length === 0) {
            alert('Nenhum item para enviar ao Banco de Dados.');
            return;
        }

        for (const item of items) {
            await saveToDatabase(item);
        }
        setSavedItems(items); // Atualiza a lista de itens salvos
        alert('Os itens foram enviados ao Banco de Dados com sucesso!');
        setUpdateMessage('');
        setMessage('Todos os itens foram enviados ao Banco de Dados.');
    };

    // Logs para depuração
    console.log('Items:', items);
    console.log('Saved Items:', savedItems);
    console.log('Update Message:', updateMessage);

    return (
        <div className="container">
            <AddItem onAdd={handleAddItem} />
            <ItemList items={items} onUpdate={handleUpdateItem} onRemove={handleRemoveItem} />
            <button onClick={handleSendAllToDatabase}>Enviar Itens para o Banco de Dados</button>
            
            {items.length > 0 && <p>{message}</p>}
            {updateMessage && <p>{updateMessage}</p>}
            
            {savedItems.length > 0 && (
                <div>
                    <h3>Os itens abaixo foram enviados ao Banco de Dados:</h3>
                    <ul>
                        {savedItems.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
