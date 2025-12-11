import {axiosBaseQuery} from '@/app/axiosBaseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';

export const enrollmentApi = createApi({
  reducerPath: 'enrollmentApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Enrollments'],
  endpoints: (builder) => ({
    getEnrollments: builder.query({
      query: (query) => ({
        url: '/enrollments',
        method: 'GET',
        params: {...query},
      }),
      providesTags: ['Enrollments'],
    }),

    getEnrollment: builder.query({
      query: (id) => ({
        url: `/enrollments/${id}`,
        method: 'GET',
      }),
      providesTags: ['Enrollments'],
    }),

    updateEnrollments: builder.mutation({
      query: ({id, data}) => ({
        url: `/enrollments/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['Enrollments'],
    }),

    deleteEnrollments: builder.mutation({
      query: (id) => ({
        url: `/enrollments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Enrollments'],
    }),

    // createEnrollments: builder.mutation({
    //   query: (data) => ({
    //     url: '/enrollments',
    //     method: 'POST',
    //     data,
    //   }),
    //   invalidatesTags: ['Enrollments'],
    // }),
  }),
});

export const {
  useGetEnrollmentsQuery,
  useGetEnrollmentQuery,
  useUpdateEnrollmentsMutation,
  useDeleteEnrollmentsMutation,
} = enrollmentApi;
