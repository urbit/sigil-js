var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
export * from './figmaTypes';
import axios from 'axios';
export var Client = function (opts) {
    var headers = opts.accessToken
        ? {
            Authorization: "Bearer " + opts.accessToken
        }
        : {
            'X-Figma-Token': opts.personalAccessToken
        };
    var client = axios.create({
        baseURL: "https://" + (opts.apiRoot || 'api.figma.com') + "/v1/",
        headers: headers
    });
    return {
        file: function (fileId, params) {
            return client.get("files/" + fileId, { params: params });
        },
        fileImages: function (fileId, params) {
            return client.get("images/" + fileId, {
                params: __assign({}, params, { ids: params.ids.join(',') })
            });
        },
        comments: function (fileId) { return client.get("files/" + fileId + "/comments"); },
        postComment: function (fileId, params) {
            return client.post("files/" + fileId + "/comments", params);
        },
        teamProjects: function (teamId) { return client.get("teams/" + teamId + "/projects"); },
        projectFiles: function (projectId) { return client.get("projects/" + projectId + "/files"); }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQSxjQUFjLGNBQWMsQ0FBQztBQUM3QixPQUFPLEtBQXVCLE1BQU0sT0FBTyxDQUFDO0FBcUc1QyxNQUFNLENBQUMsSUFBTSxNQUFNLEdBQUcsVUFBQyxJQUFtQjtJQUN4QyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVztRQUM5QixDQUFDLENBQUM7WUFDRSxhQUFhLEVBQUUsWUFBVSxJQUFJLENBQUMsV0FBYTtTQUM1QztRQUNILENBQUMsQ0FBQztZQUNFLGVBQWUsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1NBQzFDLENBQUM7SUFFTixJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzFCLE9BQU8sRUFBRSxjQUFXLElBQUksQ0FBQyxPQUFPLElBQUksZUFBZSxVQUFNO1FBQ3pELE9BQU8sU0FBQTtLQUNSLENBQUMsQ0FBQztJQUVILE9BQU87UUFDTCxJQUFJLEVBQUUsVUFBQyxNQUFNLEVBQUUsTUFBTTtZQUNuQixPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBUyxNQUFRLEVBQUUsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFFO1FBQTFDLENBQTBDO1FBRTVDLFVBQVUsRUFBRSxVQUFDLE1BQU0sRUFBRSxNQUFNO1lBQ3pCLE9BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFVLE1BQVEsRUFBRTtnQkFDN0IsTUFBTSxlQUNELE1BQU0sSUFDVCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQzFCO2FBQ0YsQ0FBQztRQUxGLENBS0U7UUFFSixRQUFRLEVBQUUsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVMsTUFBTSxjQUFXLENBQUMsRUFBdEMsQ0FBc0M7UUFFMUQsV0FBVyxFQUFFLFVBQUMsTUFBTSxFQUFFLE1BQU07WUFDMUIsT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVMsTUFBTSxjQUFXLEVBQUUsTUFBTSxDQUFDO1FBQS9DLENBQStDO1FBRWpELFlBQVksRUFBRSxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBUyxNQUFNLGNBQVcsQ0FBQyxFQUF0QyxDQUFzQztRQUU5RCxZQUFZLEVBQUUsVUFBQSxTQUFTLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQVksU0FBUyxXQUFRLENBQUMsRUFBekMsQ0FBeUM7S0FDckUsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9