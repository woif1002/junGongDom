import request from '../api';

export const activityCenter = params => {
    return request.get(`/Activity/getActiveList`, params).then(res => res.data)
};