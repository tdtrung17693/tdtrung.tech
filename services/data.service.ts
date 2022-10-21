// posts.json
import fetch from "node-fetch"
export type Tag = string
export type PostId = string

export interface Post {
  id: PostId //
  title: string
  content: string
  createdAt: string
  modifiedAt?: string
  revised: string // commit number goes here
  tags: Tag[]
  path: string
}

export interface Posts {
  posts: Record<PostId, Post>
  tags: Record<Tag, PostId[]>
}

export const getPosts = async (
  ghName: string,
  ghRepo: string
): Promise<Posts> => {
  console.log(ghName, ghRepo)
  const res: Posts = await fetch(
    `https://raw.githubusercontent.com/${ghName}/${ghRepo}/release/db.json`
  ).then((res) => res.json() as Promise<Posts>)
  res.posts['2'] = { ...res.posts['1'] }
  res.posts['3'] = { ...res.posts['1'] }

  return res
}

export const getPost = async (
  ghName: string,
  ghRepo: string,
  postId: string
): Promise<Post> => {
  const res: Posts = await fetch(
    `https://raw.githubusercontent.com/${ghName}/${ghRepo}/release/db.json`
  ).then((res) => res.json() as Promise<Posts>)
  
  const file: Post = res.posts[postId]
  const fileContent = await fetch(
    `https://raw.githubusercontent.com/${ghName}/${ghRepo}/release${file.path}`
  ).then((res) => res.text())
  
  return {...file, content: fileContent}
}
