const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://nikatvildiani1:Niko2002@cluster0.6oouw8f.mongodb.net/movies?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Movie schema and model
const movieSchema = new mongoose.Schema({
  name: String,
  category: String
});

const Movie = mongoose.model('Movie', movieSchema);

// Routes
app.post('/addMovie', (req, res) => {
  Movie.findOne({ name: req.body.name })
    .then(existingMovie => {
      if (existingMovie) {
        return res.status(400).json('Error: Movie has already been added');
      } else {
        const newMovie = new Movie({
          name: req.body.name,
          category: req.body.category
        });

        newMovie.save()
          .then(movie => res.json(movie))
          .catch(err => res.status(400).json('Error: ' + err));
      }
    })
    .catch(err => res.status(500).json('Error: ' + err));
});

app.get('/getMovies', (req, res) => {
  Movie.find()
    .then(movies => res.json(movies))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/getCategories', (req, res) => {
  Movie.distinct('category')
    .then(categories => res.json(categories))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.delete('/deleteMovie/:id',(req,res)=>{
    Movie.findByIdAndDelete(req.params.id)
    .then(()=> res.json('Movie Deleted'))
    .catch(err=> res.status(400).json('Error'+ err))
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
