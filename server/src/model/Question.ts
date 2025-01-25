import mongoose, { Schema, Document } from 'mongoose';

interface IBlock {
  text: string;
  showInOption: boolean;
  isAnswer: boolean;
}

interface IOption {
  text: string;
  isCorrectAnswer: boolean;
}

export interface IQuestion extends Document {
  type: 'ANAGRAM' | 'MCQ' | 'READ_ALONG' | 'CONTENT_ONLY'; 
  anagramType?: 'WORD' | 'SENTENCE';
  blocks?: IBlock[];
  options?: IOption[];
  siblingId?: mongoose.Types.ObjectId;
  solution?: string;
  title: string;
}

const BlockSchema = new Schema({
  text: { type: String, required: true },
  showInOption: { type: Boolean, default: true },
  isAnswer: { type: Boolean, default: true }
});

const OptionSchema = new Schema({
  text: { type: String, required: true },
  isCorrectAnswer: { type: Boolean, required: true }
});

const QuestionSchema = new Schema({
  type: { 
    type: String, 
    required: true,
    enum: ['ANAGRAM', 'MCQ', 'READ_ALONG', 'CONTENT_ONLY']  
  },
  anagramType: {
    type: String,
    enum: ['WORD', 'SENTENCE'],
    required: function(this: any) { return this.type === 'ANAGRAM'; }
  },
  blocks: [BlockSchema],
  options: [OptionSchema],
  siblingId: { type: Schema.Types.ObjectId, ref: 'Question' },
  solution: String,
  title: { type: String, required: true }
});

export default mongoose.model<IQuestion>('Question', QuestionSchema);