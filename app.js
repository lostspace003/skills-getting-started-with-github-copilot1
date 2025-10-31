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
        
        const prepTimeValue = document.getElementById('prepTime').value;
        const recipe = {
            id: Date.now(),
            name: document.getElementById('recipeName').value,
            ingredients: document.getElementById('ingredients').value.split('\n').filter(i => i.trim()),
            instructions: document.getElementById('instructions').value,
            prepTime: prepTimeValue !== '' ? prepTimeValue : 'N/A',
            servings: document.getElementById('servings').value
        };

        this.recipes.push(recipe);
        this.saveRecipes();
        this.displayRecipes();
        e.target.reset();
    }

    // Helper function to escape HTML to prevent XSS attacks
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
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
                    <h3>${this.escapeHtml(recipe.name)}</h3>
                    <button class="btn btn-delete" onclick="app.deleteRecipe(${recipe.id})">Delete</button>
                </div>
                <div class="recipe-meta">
                    <span>⏱️ Prep Time: ${this.escapeHtml(String(recipe.prepTime))} min</span>
                    <span>🍽️ Servings: ${this.escapeHtml(String(recipe.servings))}</span>
                </div>
                <div class="recipe-section">
                    <h4>Ingredients:</h4>
                    <ul>
                        ${recipe.ingredients.map(ing => `<li>${this.escapeHtml(ing)}</li>`).join('')}
                    </ul>
                </div>
                <div class="recipe-section">
                    <h4>Instructions:</h4>
                    <p>${this.escapeHtml(recipe.instructions)}</p>
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
        try {
            const stored = localStorage.getItem('recipes');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading recipes from localStorage:', error);
            return [];
        }
    }
}

// Initialize the app when the DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new RecipeCreator();
});
