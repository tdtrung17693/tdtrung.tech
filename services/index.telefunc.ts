import { getPosts as getDbPosts } from './data.service'

export function getPosts(ghName: string, ghRepo: string) {
  return getDbPosts(ghName, ghRepo)
}
