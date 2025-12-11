import { axiosBaseQuery } from '@/app/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const lessonNoteApi = createApi({
    reducerPath: 'lessonNoteApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['LessonNote'],
    endpoints: builder => ({
        getPendingSubmissions: builder.query({
            query: params => ({
                url: '/lesson-notes/admin/pending-submissions',
                method: 'GET',
                params: { ...params },
            }),
            providesTags: ['LessonNote'],
        }),
        reviewSubmission: builder.mutation({
            query: ({ id, data }) => ({
                url: `/lesson-notes/${id}/review`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['LessonNote'],
        }),
    }),
});

export const { useGetPendingSubmissionsQuery, useReviewSubmissionMutation } = lessonNoteApi;
