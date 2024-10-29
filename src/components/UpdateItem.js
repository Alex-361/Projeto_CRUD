import React, { useState } from 'react';

function UpdateItem({ onUpdate }) {
    const [updateValue, setUpdateValue] = useState('');

    const handleUpdate = () => {
        onUpdate(updateValue);
        setUpdateValue('');
    };

    return (
        <div>
            <input
                type="text"
                value={updateValue}
                onChange={(e) => setUpdateValue(e.target.value)}
                placeholder="Atualizar item"
            />
            <button onClick={handleUpdate}>Atualizar</button>
        </div>
    );
}

export default UpdateItem;
