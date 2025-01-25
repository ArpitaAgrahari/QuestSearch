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

        const questions: Array<{ _id: any, title: string, type: string, options?: any[] }> = await Question.find(searchCriteria)
          .skip((page - 1) * limit)
          .limit(limit);

        const totalCount = await Question.countDocuments(searchCriteria);

        return {
          questions: questions.map(q => ({
            id: q._id.toString(),
            title: q.title,
            type: q.type,
            options: q.options || []
          })),
          totalCount
        };
      } catch (error) {
        console.error('Searching error:', error);
        throw error;
      }
    },
  });