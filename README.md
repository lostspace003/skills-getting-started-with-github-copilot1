# Recipe Creator Application

A simple and intuitive web-based application for creating and managing your favorite recipes.

## Features

- ✨ Create new recipes with detailed information
- 📝 Add ingredients and step-by-step instructions
- ⏱️ Track preparation time and serving sizes
- 💾 Automatically save recipes to local storage
- 🗑️ Delete recipes you no longer need
- 📱 Responsive design that works on all devices

## Getting Started

1. Open `index.html` in your web browser
2. Fill in the recipe form with:
   - Recipe name
   - Ingredients (one per line)
   - Cooking instructions
   - Prep time (optional)
   - Number of servings
3. Click "Add Recipe" to save your recipe
4. View all your recipes in the "My Recipes" section below
5. Click "Delete" on any recipe to remove it

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage API

## Local Development

To run the application locally:

```bash
# Using Python 3
python3 -m http.server 8080

# Then open http://localhost:8080 in your browser
```

## Data Persistence

All recipes are stored in your browser's local storage, so they persist between sessions. Your data stays private and never leaves your device.
