"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./figmaTypes"));
const axios_1 = __importDefault(require("axios"));
exports.Client = (opts) => {
    const headers = opts.accessToken
        ? {
            Authorization: `Bearer ${opts.accessToken}`
        }
        : {
            'X-Figma-Token': opts.personalAccessToken
        };
    const client = axios_1.default.create({
        baseURL: `https://${opts.apiRoot || 'api.figma.com'}/v1/`,
        headers
    });
    return {
        file: (fileId, params) => client.get(`files/${fileId}`, { params }),
        fileImages: (fileId, params) => client.get(`images/${fileId}`, {
            params: Object.assign({}, params, { ids: params.ids.join(',') })
        }),
        comments: fileId => client.get(`files/${fileId}/comments`),
        postComment: (fileId, params) => client.post(`files/${fileId}/comments`, params),
        teamProjects: teamId => client.get(`teams/${teamId}/projects`),
        projectFiles: projectId => client.get(`projects/${projectId}/files`)
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQSxrQ0FBNkI7QUFDN0Isa0RBQTRDO0FBcUcvQixRQUFBLE1BQU0sR0FBRyxDQUFDLElBQW1CLEVBQW1CLEVBQUU7SUFDN0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVc7UUFDOUIsQ0FBQyxDQUFDO1lBQ0UsYUFBYSxFQUFFLFVBQVUsSUFBSSxDQUFDLFdBQVcsRUFBRTtTQUM1QztRQUNILENBQUMsQ0FBQztZQUNFLGVBQWUsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1NBQzFDLENBQUM7SUFFTixNQUFNLE1BQU0sR0FBRyxlQUFLLENBQUMsTUFBTSxDQUFDO1FBQzFCLE9BQU8sRUFBRSxXQUFXLElBQUksQ0FBQyxPQUFPLElBQUksZUFBZSxNQUFNO1FBQ3pELE9BQU87S0FDUixDQUFDLENBQUM7SUFFSCxPQUFPO1FBQ0wsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFFO1FBRTVDLFVBQVUsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsTUFBTSxFQUFFLEVBQUU7WUFDN0IsTUFBTSxvQkFDRCxNQUFNLElBQ1QsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUMxQjtTQUNGLENBQUM7UUFFSixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsTUFBTSxXQUFXLENBQUM7UUFFMUQsV0FBVyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxNQUFNLFdBQVcsRUFBRSxNQUFNLENBQUM7UUFFakQsWUFBWSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLE1BQU0sV0FBVyxDQUFDO1FBRTlELFlBQVksRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxTQUFTLFFBQVEsQ0FBQztLQUNyRSxDQUFDO0FBQ0osQ0FBQyxDQUFDIn0=