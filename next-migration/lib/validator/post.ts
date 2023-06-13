import { z } from 'zod';

export const PostSchema = z.object({
    id: z.string(),
    text: z.string(),
    likes: z.string(),
    date: z.string(),
    poster: z.string(),
    replies: z.array(z.string())
})

export const PostArraySchema = z.array(PostSchema);

export type Post = z.infer<typeof PostSchema>;

export const DeleteOnePostSchema = z.object({
    id: z.string()
})