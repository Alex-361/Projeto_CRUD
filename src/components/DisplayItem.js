import React from 'react';

function DisplayItem({ savedItem }) {
    return (
        <div>
            <h3>Item Enviado para o Banco de Dados:</h3>
            <p>{savedItem}</p>
        </div>
    );
}

export default DisplayItem;
