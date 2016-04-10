var mongodb = require('mongodb');

var uri = 'mongodb://localhost:27017/example';
mongodb.MongoClient.connect(uri, function(error, db) {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  var movies = [
  {
    "title": "Dawn of the Planet of the Apes",
    "image": "http://api.androidhive.info/json/movies/1.jpg",
    "ratings": {
      "site": 8.3,
      "my": 8
    },
    "releaseYear": 2014,
    "genre": ["Action", "Drama", "Sci-Fi"]
  },
  {
    "title": "District 9",
    "image": "http://api.androidhive.info/json/movies/2.jpg",
    "ratings": {
      "site": 8,
      "my": 7
    },
    "releaseYear": 2009,
    "genre": ["Action", "Sci-Fi", "Thriller"]
  },
  {
    "title": "X-Men: Days of Future Past",
    "image": "http://api.androidhive.info/json/movies/4.jpg",
    "ratings": {
      "site": 8.4,
      "my": 5
    },
    "releaseYear": 2014,
    "genre": ["Action", "Sci-Fi", "Thriller"]
  }
  ];

  db.collection('movies').insert(movies, function(error, result) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  });

  var query1 = { releaseYear: 2009};
  db.collection('movies').find(query1).toArray(function(error, docs) {
    if (error) {
      console.log(error);
      process.exit(1);
    }

    console.log('Found docs (query1):');
    docs.forEach(function(doc) {
      console.log(doc);
    });
    // process.exit(0);
  });

  var query2 = { genre: 'Action', 'ratings.my': { '$gte': 6} };
  db.collection('movies').find(query2).toArray(function(error, docs) {
    if (error) {
      console.log(error);
      process.exit(1);
    }

    console.log('Found docs (query2):');
    docs.forEach(function(doc) {
      console.log(doc);
    });

    // process.exit(0);
  });

});