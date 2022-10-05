import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const activityApi = createApi({
	reducerPath: 'activityApi',
	tagTypes: ['Activity', 'Item'],
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.API_ENDPOINT,
	}),
	endpoints: (build) => ({
		createActivity: build.mutation<any, any>({
			query: (body) => {
				return {
					url: `/activity-groups`,
					method: 'POST',
					body: body,
				}
			},
			invalidatesTags: ['Activity'],
		}),
		deleteActivity: build.mutation<any, any>({
			query: (id) => {
				return {
					url: `/activity-groups/${id}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: ['Activity'],
		}),
		listActivity: build.query<any, any>({
			query: ({ ...params }) => {
				params = Object.fromEntries(Object.entries(params).filter(([_, v]) => v));
				const urlParams = new URLSearchParams(params)

				return {
					url: `/activity-groups?${urlParams}`,
					method: 'GET',
				}
			},
			providesTags: (result, error, arg) =>
				result
				? [...result?.data?.map(({ id }: any) => ({ type: 'Activity' as const, id })), 'Activity']
				: ['Activity'],
		}),
		retrieveActivity: build.query<any, any>({
			query: (activityId) => {
				return {
					url: `/activity-groups/${activityId}`,
					method: 'GET',
				}
			},
		}),

		createItem: build.mutation<any, any>({
			query: (body) => {
				return {
					url: `/todo-items`,
					method: 'POST',
					body: body,
				}
			},
			invalidatesTags: ['Item'],
		}),
		updateItem: build.mutation<any, any>({
			query: ({id, ...body}) => {
				return {
					url: `/todo-items/${id}`,
					method: 'PATCH',
					body: body,
				}
			},
		}),
		deleteItem: build.mutation<any, any>({
			query: (id) => {
				return {
					url: `/todo-items/${id}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: ['Item'],
		}),
		listItems: build.query<any, any>({
			query: (params) => {
				return {
					url: `/todo-items?activity_group_id=${params.activityId}`,
					method: 'GET',
				}
			},
			providesTags: (result, error, arg) =>
				result
				? [...result?.data?.map(({ id }: any) => ({ type: 'Item' as const, id })), 'Item']
				: ['Item'],
		}),
	})
})

export const {
	useCreateActivityMutation,
	useDeleteActivityMutation,
	useListActivityQuery,

	useCreateItemMutation,
	useUpdateItemMutation,
	useDeleteItemMutation,
	useListItemsQuery,
	useRetrieveActivityQuery,
} = activityApi
