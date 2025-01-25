import type { ConnectRouter } from "@connectrpc/connect";
import { QuestionService } from "../../gen/question_pb";
import Question from "./model/Question";

export default (router: ConnectRouter) =>
  router.service(QuestionService, {
    async search(req) {
      const { query, type = "ALL", page = 1, limit = 10 } = req;
      
      try {
        const searchCriteria: any = {
          title: { $regex: query, $options: 'i' }
        };

        if (type !== "ALL") {
          searchCriteria.type = type;
        }

        const questions: Array<{ _id: any, title: string, type: string, anagramType?: string, blocks?: any[], options?: any[], solution?: string }> = await Question.find(searchCriteria)
          .skip((page - 1) * limit)
          .limit(limit);

        const totalCount = await Question.countDocuments(searchCriteria);

        return {
          questions: questions.map(q => ({
            id: q._id.toString(),
            title: q.title,
            type: q.type,
            anagramType: q.anagramType,
            blocks: q.blocks?.map(block => ({
              text: block.text,
              showInOption: block.showInOption,
              isAnswer: block.isAnswer
            })),
            options: q.options?.map(option => ({
              text: option.text,
              isCorrectAnswer: option.isCorrectAnswer
            })),
            solution: q.solution
          })),
          totalCount
        };
      } catch (error) {
        console.error('Searching error:', error);
        throw error;
      }
    },
  });