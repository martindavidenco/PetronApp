import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Ingredientes.css';

const Ingredientes = () => {
    const [ingredients, setIngredients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState('');
    const itemsPerPage = 90;

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get(
                    'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
                );
                setIngredients(response.data.meals);
            } catch (error) {
                console.error(error);
            }
        };

        fetchIngredients();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentIngredients = ingredients.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleIngredientClick = (ingredient) => {
        if (selectedIngredients.includes(ingredient)) {
            setSelectedIngredients(selectedIngredients.filter((selected) => selected !== ingredient));
        } else {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const handleAddIngredient = () => {
        if (newIngredient.trim() !== '') {
            setSelectedIngredients([...selectedIngredients, newIngredient]);
            setNewIngredient('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Lógica para ejecutar cuando se presiona "Enter"
            console.log('Presionaste Enter');
            handleAddIngredient();
        }
    };

    return (
        <div className='ingredientesContainer'>
            <div className='selectedContainer'>
                <div>
                    <h3>Ingredientes seleccionados:</h3>
                    <ul className="selectedIngredients">
                        {selectedIngredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <button className="buttonReceta"> Ver las recetas de PetronApp</button>
            </div>
            <div className='listContainer'>
                <h3>Escribe y/o selecciona los ingredientes que querés usar:</h3>
                <div className="inputContainerIng">
                    <input
                        className="input"
                        type="text"
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleAddIngredient}>Agregar</button>
                </div>
                <ul className="ingredientList">
                    {currentIngredients.map((ingredient) => (
                        <li
                            className={`ingrediente ${selectedIngredients.includes(ingredient.strIngredient) ? 'selected' : ''}`}
                            key={ingredient.strIngredient}
                            onClick={() => handleIngredientClick(ingredient.strIngredient)}
                        >
                            {ingredient.strIngredient}
                        </li>
                    ))}
                </ul>
                <div className="pagination">
                    {Array.from({ length: Math.ceil(ingredients.length / itemsPerPage) }).map((_, index) => (
                        <button
                            key={index}
                            className={currentPage === index + 1 ? 'active' : ''}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Ingredientes;
