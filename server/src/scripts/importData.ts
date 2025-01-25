import mongoose from 'mongoose';
import fs from 'fs';

const mongoURI = 'mongodb+srv://arpitaagrahari004:yhAFKDw31DNQymy4@cluster0.vy0mo.mongodb.net/questSearch';

const questionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: String,
  anagramType: String,
  blocks: [{
    text: String,
    showInOption: Boolean,
    isAnswer: Boolean
  }],
  options: [{
    text: String,
    isCorrectAnswer: Boolean
  }],
  siblingId: mongoose.Schema.Types.ObjectId,
  solution: String,
  title: String
});

// Create a model from the schema
const Question = mongoose.model('Question', questionSchema);

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB Connected');
    
    // Read the JSON file
    fs.readFile('./src/scripts/questions.json', 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        console.error('Error :', err);
        return;
      }

      // JSON data parsing
      const questions = JSON.parse(data);

      // Insertion of the data into database
      const formattedQuestions = questions.map((q: any) => {
        return {
          _id: q._id && q._id.$oid ? q._id.$oid : new mongoose.Types.ObjectId(),
          type: q.type,
          anagramType: q.anagramType,
          blocks: q.blocks,
          options: q.options,
          siblingId: q.siblingId && q.siblingId.$oid ? q.siblingId.$oid : undefined,
          solution: q.solution,
          title: q.title
        };
      });

      
      Question.insertMany(formattedQuestions)
        .then(() => {
          console.log('Data successfully inserted');
          mongoose.connection.close();
        })
        .catch((err: any) => {
          console.error('Error inserting data:', err);
          mongoose.connection.close();
        });
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });