// Recipe Creator Application
class RecipeCreator {
    constructor() {
        this.recipes = this.loadRecipes();
        this.init();
    }

    init() {
        const form = document.getElementById('recipeForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.displayRecipes();
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const recipe = {
            id: Date.now(),
            name: document.getElementById('recipeName').value,
            ingredients: document.getElementById('ingredients').value.split('\n').filter(i => i.trim()),
            instructions: document.getElementById('instructions').value,
            prepTime: document.getElementById('prepTime').value || 'N/A',
            servings: document.getElementById('servings').value
        };

        this.recipes.push(recipe);
        this.saveRecipes();
        this.displayRecipes();
        e.target.reset();
    }

    displayRecipes() {
        const container = document.getElementById('recipesList');
        
        if (this.recipes.length === 0) {
            container.innerHTML = '<p class="no-recipes">No recipes yet. Create your first recipe above!</p>';
            return;
        }

        container.innerHTML = this.recipes.map(recipe => `
            <div class="recipe-card">
                <div class="recipe-header">
                    <h3>${recipe.name}</h3>
                    <button class="btn btn-delete" onclick="app.deleteRecipe(${recipe.id})">Delete</button>
                </div>
                <div class="recipe-meta">
                    <span>⏱️ Prep Time: ${recipe.prepTime} min</span>
                    <span>🍽️ Servings: ${recipe.servings}</span>
                </div>
                <div class="recipe-section">
                    <h4>Ingredients:</h4>
                    <ul>
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
                <div class="recipe-section">
                    <h4>Instructions:</h4>
                    <p>${recipe.instructions}</p>
                </div>
            </div>
        `).join('');
    }

    deleteRecipe(id) {
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
        this.saveRecipes();
        this.displayRecipes();
    }

    saveRecipes() {
        localStorage.setItem('recipes', JSON.stringify(this.recipes));
    }

    loadRecipes() {
        const stored = localStorage.getItem('recipes');
        return stored ? JSON.parse(stored) : [];
    }
}

// Initialize the app when the DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new RecipeCreator();
});
